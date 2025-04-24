import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
// In a real app, you would set these in your .env.local file
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://inhevdydtalavcejmtzv.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaGV2ZHlkdGFsYXZjZWptdHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjY0MzYsImV4cCI6MjA2MTEwMjQzNn0.v0GglhQXh1jeyaR-WrIXYTvlA2xaaFVE-jFsd8ZkHLw";

// Create a singleton instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence
    autoRefreshToken: true, // Enable automatic token refresh
    detectSessionInUrl: true, // Enable detection of OAuth redirects
  },
});

// Auth helper functions with error handling
export const signUp = async ({ email, password, metadata }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    return { data, error };
  } catch (err) {
    console.error("Supabase signup error:", err);
    return { data: null, error: err };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  } catch (err) {
    console.error("Supabase signin error:", err);
    return { data: null, error: err };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("Supabase signout error:", err);
    return { error: err };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user, error };
  } catch (err) {
    console.error("Supabase get current user error:", err);
    return { user: null, error: err };
  }
};

// Helper for getting the session - useful for debugging
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data?.session, error };
  } catch (err) {
    console.error("Supabase get session error:", err);
    return { session: null, error: err };
  }
};

// Mock implementations for development when Supabase is not set up
export const mockSignUp = async ({ email, password, metadata }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a mock user
      const mockUser = {
        id: "mock-" + Math.random().toString(36).substring(2, 15),
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString(),
      };

      // Store in localStorage for mock persistence
      localStorage.setItem("mock-user", JSON.stringify(mockUser));

      resolve({
        data: { user: mockUser, session: { access_token: "mock-token" } },
        error: null,
      });
    }, 800); // Simulate network delay
  });
};

export const mockSignIn = async ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if user exists (very basic mock)
      const storedUser = localStorage.getItem("mock-user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.email === email) {
          resolve({
            data: { user, session: { access_token: "mock-token" } },
            error: null,
          });
          return;
        }
      }

      // If no matching user, create one for demo purposes
      const mockUser = {
        id: "mock-" + Math.random().toString(36).substring(2, 15),
        email,
        user_metadata: {
          name: email.split("@")[0],
          role: "startup",
        },
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("mock-user", JSON.stringify(mockUser));

      resolve({
        data: { user: mockUser, session: { access_token: "mock-token" } },
        error: null,
      });
    }, 800); // Simulate network delay
  });
};

export const mockSignOut = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("mock-user");
      resolve({ error: null });
    }, 500); // Simulate network delay
  });
};

export const mockGetCurrentUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedUser = localStorage.getItem("mock-user");

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          resolve({ user, error: null });
        } catch (err) {
          resolve({ user: null, error: err });
        }
      } else {
        resolve({
          user: null,
          error: {
            message: "Auth session missing!",
            name: "AuthSessionMissingError",
          },
        });
      }
    }, 300); // Simulate network delay
  });
};

// Use the mock functions if in development mode or if Supabase isn't configured
// This makes development easier when you don't have Supabase set up yet
const isDevelopment = process.env.NODE_ENV === "development";
const isSupabaseConfigured =
  supabaseUrl !== "https://your-project-url.supabase.co";

// Export the right functions based on environment
export default supabase;

// Override exports with mock functions if needed
if (isDevelopment && !isSupabaseConfigured) {
  // Override the real functions with mock ones
  // This is done after the default export to maintain the correct exports structure
  exports.signUp = mockSignUp;
  exports.signIn = mockSignIn;
  exports.signOut = mockSignOut;
  exports.getCurrentUser = mockGetCurrentUser;
}

// Database helper functions for agreements
export const getAgreements = async (userId) => {
  const { data, error } = await supabase
    .from("agreements")
    .select("*")
    .eq("creator_id", userId);

  return { data, error };
};

export const getAgreementById = async (id) => {
  const { data, error } = await supabase
    .from("agreements")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const createAgreement = async (agreement) => {
  const { data, error } = await supabase
    .from("agreements")
    .insert([agreement])
    .select();

  return { data, error };
};

export const updateAgreement = async (id, updates) => {
  const { data, error } = await supabase
    .from("agreements")
    .update(updates)
    .eq("id", id)
    .select();

  return { data, error };
};

// Database helper functions for metrics
export const getMetrics = async (agreementId) => {
  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .eq("agreement_id", agreementId);

  return { data, error };
};

export const createMetricRecord = async (metric) => {
  const { data, error } = await supabase
    .from("metrics")
    .insert([metric])
    .select();

  return { data, error };
};
