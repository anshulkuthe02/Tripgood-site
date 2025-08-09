// src/components/EmailLogin.jsx
import { useState } from "react";
import { supabase, isSupabaseConfigured } from "../supabase";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, User, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./Login.css";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    // Clear previous messages
    setMsg("");

    // Validation
    if (!email || !password) {
      setMsg(t('fillAllFields'));
      return;
    }

    if (!validateEmail(email)) {
      setMsg(t('validEmail'));
      return;
    }

    if (!isSupabaseConfigured()) {
      setMsg(t('authNotConfigured'));
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMsg(error.message);
      } else {
        setMsg(t('loginSuccess'));
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      setMsg(t('authUnavailable') + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    // Clear previous messages
    setMsg("");

    // Validation
    if (!email || !password || !confirmPassword || !fullName) {
      setMsg(t('fillAllFields'));
      return;
    }

    if (!validateEmail(email)) {
      setMsg(t('validEmail'));
      return;
    }

    if (!validatePassword(password)) {
      setMsg(t('passwordLength'));
      return;
    }

    if (password !== confirmPassword) {
      setMsg(t('passwordsNotMatch'));
      return;
    }

    if (!isSupabaseConfigured()) {
      setMsg(t('authNotConfigured'));
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        setMsg(error.message);
      } else {
        setMsg(t('accountCreated'));
      }
    } catch (error) {
      setMsg(t('authUnavailable') + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setMsg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <div className="tripgood-bg min-h-screen relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="glass-card p-12 relative overflow-hidden">
            {/* Language Selector */}
            <div className="absolute top-6 right-6 z-20">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-4 py-2 glass-container hover:bg-white/30 transition-all duration-200 text-glass-white"
                >
                  <Globe size={18} className="text-white" />
                  <span className="text-sm font-medium">{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
                  <span className="text-sm font-medium">{t('language')}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 overflow-hidden z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-black/10 transition-colors ${
                          currentLanguage === language.code ? 'bg-blue-500/20 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                        {currentLanguage === language.code && (
                          <CheckCircle size={16} className="ml-auto text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Container with relative positioning */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                  <Mail size={40} className="text-white" />
                </div>
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="text-4xl">🌴</span>
                  <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Long Cang, cursive' }}>
                    {t('tripgood')}
                  </h1>
                  <span className="text-4xl">🌴</span>
                </div>
                <h2 className="text-2xl font-semibold text-white/90 mb-3">
                  {isSignUp ? t('createAccount') : t('welcomeBack')}
                </h2>
                <p className="text-white/80 text-lg max-w-sm mx-auto leading-relaxed">
                  {isSignUp ? t('signupSubtitle') : t('loginSubtitle')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Input (Sign Up only) */}
                {isSignUp && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <User size={18} className="text-white" />
                      </div>
                      <label className="text-sm font-semibold text-white/90">{t('fullName')}</label>
                    </div>
                    <input
                      type="text"
                      placeholder={t('enterFullName')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-4 text-base border-2 border-white/30 rounded-xl focus:ring-3 focus:ring-white/30 focus:border-white/50 outline-none transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 placeholder-white/60 text-white"
                      required={isSignUp}
                    />
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Mail size={18} className="text-white" />
                    </div>
                    <label className="text-sm font-semibold text-white/90">{t('emailAddress')}</label>
                  </div>
                  <input
                    type="email"
                    placeholder={t('enterEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 text-base border-2 border-white/30 rounded-xl focus:ring-3 focus:ring-white/30 focus:border-white/50 outline-none transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 placeholder-white/60 text-white"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Lock size={18} className="text-white" />
                    </div>
                    <label className="text-sm font-semibold text-white/90">{t('password')}</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t('enterPassword')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 pr-12 text-base border-2 border-white/30 rounded-xl focus:ring-3 focus:ring-white/30 focus:border-white/50 outline-none transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 placeholder-white/60 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-white/20 rounded-r-xl transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-white/70 hover:text-white" />
                      ) : (
                        <Eye size={20} className="text-white/70 hover:text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input (Sign Up only) */}
                {isSignUp && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Lock size={18} className="text-white" />
                      </div>
                      <label className="text-sm font-semibold text-white/90">{t('confirmPassword')}</label>
                    </div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t('confirmPasswordPlaceholder')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-4 pr-12 text-base border-2 border-white/30 rounded-xl focus:ring-3 focus:ring-white/30 focus:border-white/50 outline-none transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 placeholder-white/60 text-white"
                        required={isSignUp}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-white/20 rounded-r-xl transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} className="text-white/70 hover:text-white" />
                        ) : (
                          <Eye size={20} className="text-white/70 hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-xl hover:bg-white/30 focus:ring-4 focus:ring-white/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] mt-8 border border-white/30"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isSignUp ? t('creatingAccount') : t('signingIn')}</span>
                    </div>
                  ) : (
                    isSignUp ? t('createAccountBtn') : t('signIn')
                  )}
                </button>
              </form>

              {/* Message Display */}
              {msg && (
                <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm border ${
                  msg.includes("successful") || msg.includes("Redirecting") || msg.includes(t('loginSuccess')) || msg.includes(t('accountCreated'))
                    ? "bg-green-500/20 text-green-100 border-green-400/30" 
                    : "bg-red-500/20 text-red-100 border-red-400/30"
                }`}>
                  {msg.includes("successful") || msg.includes("Redirecting") || msg.includes(t('loginSuccess')) || msg.includes(t('accountCreated')) ? (
                    <CheckCircle size={18} className="flex-shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{msg}</span>
                </div>
              )}

              {/* Toggle between Login/SignUp */}
              <div className="text-center mt-8">
                <button
                  onClick={toggleMode}
                  className="text-white/90 hover:text-white font-medium transition-colors text-sm underline underline-offset-2 hover:underline-offset-4"
                >
                  {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
                </button>
              </div>

              {/* Back to Options */}
              <div className="text-center mt-6 pt-6 border-t border-white/20">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mx-auto text-sm"
                >
                  <ArrowLeft size={16} />
                  <span>{t('backToOptions')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-sm text-white/70">
              {t('termsText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
