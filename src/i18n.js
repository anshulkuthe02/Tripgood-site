// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to TripGood',
        login: 'Login with Google',
        logout: 'Logout',
        language: 'Language',
        // Add more...
      },
    },
    hi: {
      translation: {
        welcome: 'ट्रिपगुड में आपका स्वागत है',
        login: 'गूगल से लॉगिन करें',
        logout: 'लॉगआउट',
        language: 'भाषा',
      },
    },
    mr: {
      translation: {
        welcome: 'ट्रिपगुड मध्ये आपले स्वागत आहे',
        login: 'गुगल सह लॉगिन करा',
        logout: 'लॉगआउट',
        language: 'भाषा',
      },
    },
    // Add fr, es, etc.
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
