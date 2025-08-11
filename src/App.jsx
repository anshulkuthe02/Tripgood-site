import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { useAuth } from "./context/AuthContext";

import HeroSection from "./components/HeroSection";
import SectionCards from "./components/SectionCards";

export default function App() {
  const { language, changeLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="tripgood-bg min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 w-full bg-transparent backdrop-blur-md z-50 flex justify-end items-center p-4">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border-0 rounded-lg p-2 bg-white/20 backdrop-blur-sm text-white font-medium shadow-lg hover:bg-white/30 transition-all duration-200"
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <option value="en" className="text-gray-800">English</option>
            <option value="fr" className="text-gray-800">Français</option>
            <option value="es" className="text-gray-800">Español</option>
          </select>
          {user ? (
            <button
              onClick={signOut}
              className="bg-red-500/80 hover:bg-red-600/90 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500/80 hover:bg-blue-600/90 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main content with extra spacing */}
      <main className="pt-32 space-y-24">
        <HeroSection />
        <SectionCards />
      </main>
    </div>
  );
}
