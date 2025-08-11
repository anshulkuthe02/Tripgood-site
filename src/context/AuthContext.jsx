// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get initial session
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data?.session?.user || null);
        setLoading(false);
      }).catch(error => {
        console.warn("Error getting session:", error.message);
        setLoading(false);
      });

      // Listen to auth changes
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => {
        listener?.subscription?.unsubscribe();
      };
    } else {
      console.warn("Supabase is not configured, skipping authentication setup");
      setLoading(false);
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(pos.coords),
        err => console.warn("Geolocation error", err)
      );
    }
  }, []);

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    }
  };

  const value = {
    user,
    loading,
    location,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
