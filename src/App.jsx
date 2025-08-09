import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { useAuth } from "./context/AuthContext";

import HeroSection from "./components/HeroSection";
import SectionCards from "./components/SectionCards";
import Footer from "./components/Footer";

export default function App() {
  const { language, changeLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="fixed top-0 w-full bg-white shadow z-50 flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            TripGood
          </h1>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded p-1"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div>
          {user ? (
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main content with extra spacing */}
      <main className="pt-20 space-y-24">
        <HeroSection />
        <SectionCards />
      </main>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
