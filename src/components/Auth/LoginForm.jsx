import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../supabase.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!isSupabaseConfigured()) {
      alert("Authentication service is not configured. Please set up Supabase credentials.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Login failed: " + error.message);
      } else {
        alert("Login successful!");
      }
    } catch (error) {
      alert("Authentication service unavailable: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full border px-4 py-2 rounded-lg"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2 rounded-lg"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
