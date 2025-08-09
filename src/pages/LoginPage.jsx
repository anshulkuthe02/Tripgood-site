// src/pages/LoginPage.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import LoginOptions from "../components/LoginOptions";
import EmailLogin from "../components/EmailLogin";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/home");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TripGood
          </h1>
          
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-medium"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Skip</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <Routes>
        <Route path="/" element={<LoginOptionsWrapper />} />
        <Route path="/email" element={<EmailLogin />} />
        <Route path="/phone" element={<PhoneLoginPlaceholder />} />
      </Routes>
    </div>
  );
}

// Wrapper for LoginOptions to add proper centering
function LoginOptionsWrapper() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <LoginOptions />
    </div>
  );
}

// Placeholder component for phone login
function PhoneLoginPlaceholder() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">📱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Phone Login</h2>
          <p className="text-gray-600">Coming Soon!</p>
        </div>
        
        <div className="text-center text-gray-600 mb-6 space-y-2">
          <p>Phone authentication will be available soon.</p>
          <p className="text-sm">For now, please use email login to continue.</p>
        </div>
        
        <button
          onClick={() => navigate("/login/email")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg"
        >
          Use Email Login Instead
        </button>
        
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mx-auto text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to login options</span>
          </button>
        </div>
      </div>
    </div>
  );
}
