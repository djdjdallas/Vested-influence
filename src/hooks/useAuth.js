"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  getSession,
} from "@/lib/supabase/client";

// Create Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailVerified, setEmailVerified] = useState(true); // Assume verified by default
  const router = useRouter();
  const pathname = usePathname();

  // Load user on mount and set up auth state listener
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check if we have a session
        const { session, error: sessionError } = await getSession();

        if (sessionError) {
          console.log("Session error:", sessionError);
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        // If we have a session but user is not confirmed
        if (session?.user && !session.user.email_confirmed_at) {
          setEmailVerified(false);
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        // Get current user from Supabase
        const { user, error } = await getCurrentUser();

        if (error) {
          // Handle the "Auth session missing" error gracefully
          if (
            error.message === "Auth session missing!" ||
            error.name === "AuthSessionMissingError"
          ) {
            console.log("No active session found");
            setUser(null);
            setProfile(null);
          } else {
            console.error("Auth error:", error);
            throw error;
          }
        } else if (user) {
          // Check if email is verified in a real app
          // For this example, we'll use the user.email_confirmed_at
          if (user.email_confirmed_at || true) {
            // For now, assume always verified for development
            setEmailVerified(true);
            setUser(user);

            // Fetch user profile data
            setProfile({
              id: user.id,
              name: user.user_metadata?.name || "User",
              email: user.email,
              role: user.user_metadata?.role || "startup",
              avatar: user.user_metadata?.avatar_url,
            });
          } else {
            // Email not verified
            setEmailVerified(false);
            setUser(null);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Session check error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth listener for development
    const mockAuthListener = setInterval(() => {
      // Check for auth state changes in localStorage
      const storedUser = localStorage.getItem("mock-user");
      if (storedUser && !user) {
        try {
          const parsedUser = JSON.parse(storedUser);

          // Check if email is verified (for development)
          if (parsedUser.email_confirmed_at) {
            setUser(parsedUser);
          }
        } catch (err) {
          console.error("Error parsing stored user:", err);
        }
      } else if (!storedUser && user) {
        setUser(null);
        setProfile(null);
      }
    }, 2000);

    return () => clearInterval(mockAuthListener);
  }, []);

  // Redirect based on auth state - this is the critical part that's fixed
  useEffect(() => {
    // Skip if still loading
    if (loading) return;

    // Auth routes that don't require authentication
    const authRoutes = [
      "/auth/login",
      "/auth/signup",
      "/auth/forgot-password",
      "/",
    ];

    // Dashboard routes that require authentication
    const isProtectedRoute = pathname?.startsWith("/dashboard");

    // Only redirect if not loading
    if (!loading) {
      // If not authenticated and on a protected route
      if (!user && isProtectedRoute) {
        console.log(
          "Not authenticated and trying to access protected route. Redirecting to login..."
        );
        router.push("/auth/login");
      }

      // If not verified and on a protected route
      if (!emailVerified && isProtectedRoute) {
        console.log("Email not verified. Redirecting to login...");
        router.push("/auth/login");
      }
    }
  }, [user, loading, pathname, router, emailVerified]);

  const login = async (email, password) => {
    try {
      setError(null);
      const { data, error } = await signIn({ email, password });

      if (error) throw error;

      if (data?.user) {
        // Check if email is verified in a real app
        // For this example, we'll create a verification check
        if (!data.user.email_confirmed_at) {
          throw new Error("Please verify your email before logging in");
        }

        setUser(data.user);
        setEmailVerified(true);

        // Set up profile
        setProfile({
          id: data.user.id,
          name: data.user.user_metadata?.name || "User",
          email: data.user.email,
          role: data.user.user_metadata?.role || "startup",
          avatar: data.user.user_metadata?.avatar_url,
        });

        return data.user;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async ({ email, password, name, role }) => {
    try {
      setError(null);
      const { data, error } = await signUp({
        email,
        password,
        metadata: { name, role },
      });

      if (error) throw error;

      // After signup, don't set the user since email verification is required
      setEmailVerified(false);

      return data?.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { error } = await signOut();

      if (error) throw error;

      setUser(null);
      setProfile(null);

      // Redirect to home page
      router.push("/");
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check if user is authenticated and email is verified
  const isAuthenticated = !!user && emailVerified;

  // Check if user has a specific role
  const hasRole = (roles) => {
    if (!profile) return false;

    if (Array.isArray(roles)) {
      return roles.includes(profile.role);
    }

    return profile.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole,
        emailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Updated route guard to check email verification
export function withAuth(Component) {
  return function AuthProtected(props) {
    const { isAuthenticated, loading, emailVerified } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!isAuthenticated || !emailVerified)) {
        console.log(
          "withAuth redirect: Not authenticated or email not verified"
        );
        router.push("/auth/login");
      }
    }, [loading, isAuthenticated, emailVerified, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (!isAuthenticated || !emailVerified) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Role-based route guard
export function withRole(Component, allowedRoles) {
  return function RoleProtected(props) {
    const { loading, isAuthenticated, hasRole, emailVerified } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (
        !loading &&
        (!isAuthenticated || !hasRole(allowedRoles) || !emailVerified)
      ) {
        router.push("/dashboard/dashboard");
      }
    }, [loading, isAuthenticated, hasRole, router, emailVerified]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (!isAuthenticated || !hasRole(allowedRoles) || !emailVerified) {
      return null;
    }

    return <Component {...props} />;
  };
}
