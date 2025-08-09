// src/context/AuthContext.jsx or inside App.jsx
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../supabase"; // your configured client

export default function AppWrapper() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured, skipping authentication setup");
      return;
    }

    // Get logged in user
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    }).catch(error => {
      console.warn("Error getting session:", error.message);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Get live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(pos.coords),
        err => console.warn("Geolocation error", err)
      );
    }

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <MainApp user={user} location={location} />
  );
}
