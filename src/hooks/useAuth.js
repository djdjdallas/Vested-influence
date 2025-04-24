"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import supabase from '@/lib/supabase/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would check Supabase session
        // const { data, error } = await supabase.auth.getUser();
        // if (error) throw error;
        // setUser(data.user);
        
        // For demo purposes, load from localStorage or use a mock user
        const storedUser = localStorage.getItem('mock-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
    
    // Set up auth state change listener
    // const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user || null);
    //   setLoading(false);
    // });
    
    // return () => subscription.unsubscribe();
  }, []);
  
  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would use Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      // if (error) throw error;
      // setUser(data.user);
      // return data.user;
      
      // For demo purposes, create a mock user
      if (email && password) {
        const mockUser = {
          id: 'mock-user-id',
          email,
          name: email.split('@')[0]
        };
        localStorage.setItem('mock-user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockUser;
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async ({ email, password, name, role }) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would use Supabase auth
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { name, role }
      //   }
      // });
      // if (error) throw error;
      // setUser(data.user);
      // return data.user;
      
      // For demo purposes, create a mock user
      if (email && password && name && role) {
        const mockUser = {
          id: 'mock-user-id',
          email,
          name,
          role
        };
        localStorage.setItem('mock-user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockUser;
      } else {
        throw new Error('All fields are required');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would use Supabase auth
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;
      
      // For demo purposes, remove from localStorage
      localStorage.removeItem('mock-user');
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
