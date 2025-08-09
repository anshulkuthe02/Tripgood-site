import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../supabase.js';

const OTPVerification = ({ onVerified }) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const sendOTP = async () => {
    if (!isSupabaseConfigured()) {
      alert("Authentication service is not configured. Please set up Supabase credentials.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        alert("Error sending OTP: " + error.message);
      } else {
        setOtpSent(true);
        alert("OTP sent to your phone.");
      }
    } catch (error) {
      alert("Authentication service unavailable: " + error.message);
    }
  };

  const verifyOTP = async () => {
    if (!isSupabaseConfigured()) {
      alert("Authentication service is not configured. Please set up Supabase credentials.");
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });

      if (error) {
        alert("OTP verification failed: " + error.message);
      } else {
        onVerified(phone);  // Pass phone to parent (SignupForm)
      }
    } catch (error) {
      alert("Authentication service unavailable: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      {!otpSent ? (
        <>
          <input
            type="tel"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Phone number (+91xxxxxxxxxx)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOTP} className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP} className="w-full bg-green-500 text-white py-2 rounded-lg">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
