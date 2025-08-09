import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../supabase.js';
import OTPVerification from './OTPVerification';

const SignupForm = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    if (!isSupabaseConfigured()) {
      alert("Authentication service is not configured. Please set up Supabase credentials.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        email,
        password,
        data: { username, phone: phoneVerified },
      });

      if (error) {
        alert("Signup failed: " + error.message);
      } else {
        alert("Signup successful! You're logged in.");
      }
    } catch (error) {
      alert("Authentication service unavailable: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      {!otpVerified ? (
        <OTPVerification onVerified={(phone) => {
          setOtpVerified(true);
          setPhoneVerified(phone);
        }} />
      ) : (
        <>
          <input
            className="w-full border px-4 py-2 rounded-lg"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            onClick={handleSignup}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Complete Signup
          </button>
        </>
      )}
    </div>
  );
};

export default SignupForm;
