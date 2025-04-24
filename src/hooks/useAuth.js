"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signUp, signOut, getCurrentUser } from "@/lib/supabase/client";

// Create Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load user on mount and set up auth state listener
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current session from Supabase
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
            // Don't throw an error for this case
          } else {
            console.error("Auth error:", error);
            throw error;
          }
        } else if (user) {
          setUser(user);
          // Fetch user profile data
          // In a real app, would fetch from database
          setProfile({
            id: user.id,
            name: user.user_metadata?.name || "User",
            email: user.email,
            role: user.user_metadata?.role || "startup",
            avatar: user.user_metadata?.avatar_url,
          });
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

    // Set up auth listener
    // This is where you would set up a real Supabase auth listener in production

    // For now, we'll use a simple interval to check localStorage in development
    const mockAuthListener = setInterval(() => {
      // Check for auth state changes in localStorage
      const storedUser = localStorage.getItem("mock-user");
      if (storedUser && !user) {
        try {
          setUser(JSON.parse(storedUser));
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

  // Redirect based on auth state
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

    if (!user && isProtectedRoute) {
      // Redirect to login if trying to access protected route without auth
      router.push("/auth/login");
    } else if (user && authRoutes.includes(pathname)) {
      // Optional: Redirect to dashboard if already authenticated and on an auth route
      // Commented out to allow authenticated users to browse the public pages
      // router.push('/dashboard/dashboard');
    }
  }, [user, loading, pathname, router]);

  const login = async (email, password) => {
    try {
      setError(null);
      const { data, error } = await signIn({ email, password });

      if (error) throw error;

      if (data?.user) {
        setUser(data.user);

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

      if (data?.user) {
        setUser(data.user);

        // Set up initial profile
        setProfile({
          id: data.user.id,
          name,
          email: data.user.email,
          role,
          avatar: null,
        });

        return data.user;
      }
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

  // Check if user is authenticated
  const isAuthenticated = !!user;

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

// Route guard for client components
export function withAuth(Component) {
  return function AuthProtected(props) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/auth/login");
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Role-based route guard
export function withRole(Component, allowedRoles) {
  return function RoleProtected(props) {
    const { loading, isAuthenticated, hasRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!isAuthenticated || !hasRole(allowedRoles))) {
        router.push("/dashboard/dashboard");
      }
    }, [loading, isAuthenticated, hasRole, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (!isAuthenticated || !hasRole(allowedRoles)) {
      return null;
    }

    return <Component {...props} />;
  };
}
