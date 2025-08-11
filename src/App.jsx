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
      {/* Main content */}
      <main className="w-full">
        <HeroSection user={user} signOut={signOut} navigate={navigate} language={language} changeLanguage={changeLanguage} />
        <SectionCards />
      </main>
    </div>
  );
}
