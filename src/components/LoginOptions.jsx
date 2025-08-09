// src/components/LoginOptions.jsx
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User, Lock, Shield, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LoginOptions() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="tripgood-bg min-h-screen relative overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto relative z-10 py-16 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="glass-container w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-6xl">🌴</span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl">🌴</span>
            <h1 className="text-6xl md:text-7xl font-bold text-glass-white" style={{ fontFamily: 'Long Cang, cursive' }}>
              TripGood
            </h1>
          </div>
          <h2 className="text-3xl font-semibold text-glass-white mb-6">{t('loginToAccount')}</h2>
          <p className="text-xl text-glass-light max-w-3xl mx-auto leading-relaxed">
            {t('chooseMethod')}
          </p>
        </div>

        {/* Login Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Email Login Option */}
          <div
            onClick={() => navigate("/login/email")}
            className="group cursor-pointer glass-card p-12 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail size={50} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-glass-white">{t('continueWithEmail')}</h3>
              <p className="text-glass-light text-center mb-8 leading-relaxed text-lg">
                Sign in with your email address and password. Quick, secure, and reliable authentication for your TripGood account.
              </p>
              <div className="flex items-center gap-4 text-blue-300 font-semibold text-lg mb-3">
                <User size={22} />
                <span>Personal Account</span>
              </div>
              <div className="flex items-center gap-3 text-base text-glass-medium">
                <Shield size={16} />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Google Login Option */}
          <div
            onClick={() => navigate("/login/google")}
            className="group cursor-pointer glass-card p-12 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-glass-white">{t('continueWithGoogle')}</h3>
              <p className="text-glass-light text-center mb-8 leading-relaxed text-lg">
                Sign in quickly with your Google account. One-click access with your existing Google credentials.
              </p>
              <div className="flex items-center gap-4 text-red-300 font-semibold text-lg mb-3">
                <Lock size={22} />
                <span>OAuth 2.0</span>
              </div>
              <div className="flex items-center gap-3 text-base text-glass-medium">
                <Zap size={16} />
                <span>One-Click Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 glass-container text-glass-white hover:bg-white/30 transition-all duration-300 font-medium text-lg"
          >
            {t('skipLogin')}
          </button>
        </div>

        {/* Additional Features */}
        <div className="text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-8 text-base text-glass-medium">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-green-400" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-blue-400" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-purple-400" />
              <span>Lightning Fast</span>
            </div>
          </div>
          
          <p className="text-lg text-glass-medium max-w-lg mx-auto">
            New to TripGood? No worries! You can create an account during the login process.
          </p>
        </div>
      </div>
    </div>
  );
}
