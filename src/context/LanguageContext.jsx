import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// Translation data
const translations = {
  en: {
    // Header
    tripgood: "TripGood",
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    loginSubtitle: "Sign in to continue your TripGood adventure",
    signupSubtitle: "Join TripGood and start your amazing journey with us",
    
    // Form Labels
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    
    // Placeholders
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email address",
    enterPassword: "Enter your password",
    confirmPasswordPlaceholder: "Confirm your password",
    
    // Buttons
    signIn: "Sign In",
    createAccountBtn: "Create Account",
    signingIn: "Signing In...",
    creatingAccount: "Creating Account...",
    
    // Toggle
    alreadyHaveAccount: "Already have an account? Sign In",
    dontHaveAccount: "Don't have an account? Create Account",
    backToOptions: "Back to login options",
    
    // Messages
    fillAllFields: "Please fill in all fields.",
    validEmail: "Please enter a valid email address.",
    passwordLength: "Password must be at least 6 characters long.",
    passwordsNotMatch: "Passwords do not match.",
    authNotConfigured: "Authentication service is not configured. Please set up Supabase credentials.",
    loginSuccess: "Login successful! Redirecting...",
    accountCreated: "Account created successfully! Please check your email for verification.",
    authUnavailable: "Authentication service unavailable: ",
    
    // Footer
    termsText: "By continuing, you agree to TripGood's Terms of Service and Privacy Policy",
    
    // Language
    language: "Language",
    
    // App Navigation
    login: "Login",
    logout: "Logout",
    welcome: "Welcome",
    backToWelcome: "Back to Welcome",
    
    // Home Page Sections
    exploreServices: "Explore Our Services",
    servicesDescription: "Discover amazing travel experiences with our comprehensive suite of booking and planning tools designed to make your journey unforgettable.",
    whyChooseUs: "Why Choose TripGood?",
    reliable: "Reliable",
    reliableDescription: "Trust our verified partners and secure booking system for peace of mind.",
    fast: "Fast & Easy",
    fastDescription: "Book your perfect trip in minutes with our intuitive interface.",
    affordable: "Affordable",
    affordableDescription: "Get the best deals and compare prices across multiple providers.",
    travelTips: "Travel Tips & Insights",
    packingSmart: "Pack Smart",
    packingDescription: "Learn the art of efficient packing to travel light and prepared for any adventure.",
    localExperience: "Local Experience",
    localDescription: "Discover hidden gems and authentic experiences recommended by locals.",
    safetyFirst: "Safety First",
    safetyDescription: "Stay informed about safety guidelines and emergency contacts wherever you go.",
    stayConnected: "Stay Connected",
    connectDescription: "Tips for staying connected with family and accessing important information while traveling.",
    ourNumbers: "Our Impact",
    happyTravelers: "Happy Travelers",
    destinations: "Destinations",
    support: "Support",
    rating: "Average Rating",
    readyToStart: "Ready to Start Your Journey?",
    startDescription: "Join thousands of satisfied travelers who have discovered amazing destinations with TripGood.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    footerText: "Making travel dreams come true, one journey at a time.",
    privacy: "Privacy Policy",
    terms: "Terms of Service"
  },
  es: {
    // Header
    tripgood: "TripGood",
    welcomeBack: "Bienvenido de Nuevo",
    createAccount: "Crear Cuenta",
    loginSubtitle: "Inicia sesión para continuar tu aventura con TripGood",
    signupSubtitle: "Únete a TripGood y comienza tu increíble viaje con nosotros",
    
    // Form Labels
    fullName: "Nombre Completo",
    emailAddress: "Dirección de Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    
    // Placeholders
    enterFullName: "Ingresa tu nombre completo",
    enterEmail: "Ingresa tu dirección de correo",
    enterPassword: "Ingresa tu contraseña",
    confirmPasswordPlaceholder: "Confirma tu contraseña",
    
    // Buttons
    signIn: "Iniciar Sesión",
    createAccountBtn: "Crear Cuenta",
    signingIn: "Iniciando Sesión...",
    creatingAccount: "Creando Cuenta...",
    
    // Toggle
    alreadyHaveAccount: "¿Ya tienes una cuenta? Iniciar Sesión",
    dontHaveAccount: "¿No tienes una cuenta? Crear Cuenta",
    backToOptions: "Volver a opciones de inicio",
    
    // Messages
    fillAllFields: "Por favor completa todos los campos.",
    validEmail: "Por favor ingresa una dirección de correo válida.",
    passwordLength: "La contraseña debe tener al menos 6 caracteres.",
    passwordsNotMatch: "Las contraseñas no coinciden.",
    authNotConfigured: "El servicio de autenticación no está configurado. Por favor configura las credenciales de Supabase.",
    loginSuccess: "¡Inicio de sesión exitoso! Redirigiendo...",
    accountCreated: "¡Cuenta creada exitosamente! Por favor revisa tu correo para verificación.",
    authUnavailable: "Servicio de autenticación no disponible: ",
    
    // Footer
    termsText: "Al continuar, aceptas los Términos de Servicio y Política de Privacidad de TripGood",
    
    // Language
    language: "Idioma",
    
    // App Navigation
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    welcome: "Bienvenido",
    backToWelcome: "Volver a Bienvenida",
    
    // Home Page Sections
    exploreServices: "Explora Nuestros Servicios",
    servicesDescription: "Descubre experiencias de viaje increíbles con nuestro conjunto completo de herramientas de reserva y planificación diseñadas para hacer tu viaje inolvidable.",
    whyChooseUs: "¿Por Qué Elegir TripGood?",
    reliable: "Confiable",
    reliableDescription: "Confía en nuestros socios verificados y sistema de reservas seguro para tu tranquilidad.",
    fast: "Rápido y Fácil",
    fastDescription: "Reserva tu viaje perfecto en minutos con nuestra interfaz intuitiva.",
    affordable: "Asequible",
    affordableDescription: "Obtén las mejores ofertas y compara precios en múltiples proveedores.",
    travelTips: "Consejos e Información de Viaje",
    packingSmart: "Empaca Inteligentemente",
    packingDescription: "Aprende el arte del empaque eficiente para viajar ligero y preparado para cualquier aventura.",
    localExperience: "Experiencia Local",
    localDescription: "Descubre gemas ocultas y experiencias auténticas recomendadas por locales.",
    safetyFirst: "Seguridad Primero",
    safetyDescription: "Mantente informado sobre pautas de seguridad y contactos de emergencia dondequiera que vayas.",
    stayConnected: "Mantente Conectado",
    connectDescription: "Consejos para mantenerte conectado con la familia y acceder a información importante mientras viajas.",
    ourNumbers: "Nuestro Impacto",
    happyTravelers: "Viajeros Felices",
    destinations: "Destinos",
    support: "Soporte",
    rating: "Calificación Promedio",
    readyToStart: "¿Listo para Comenzar tu Viaje?",
    startDescription: "Únete a miles de viajeros satisfechos que han descubierto destinos increíbles con TripGood.",
    getStarted: "Comenzar",
    learnMore: "Saber Más",
    footerText: "Haciendo realidad los sueños de viaje, un viaje a la vez.",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio"
  },
  fr: {
    // Header
    tripgood: "TripGood",
    welcomeBack: "Bon Retour",
    createAccount: "Créer un Compte",
    loginSubtitle: "Connectez-vous pour continuer votre aventure TripGood",
    signupSubtitle: "Rejoignez TripGood et commencez votre incroyable voyage avec nous",
    
    // Form Labels
    fullName: "Nom Complet",
    emailAddress: "Adresse E-mail",
    password: "Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
    
    // Placeholders
    enterFullName: "Entrez votre nom complet",
    enterEmail: "Entrez votre adresse e-mail",
    enterPassword: "Entrez votre mot de passe",
    confirmPasswordPlaceholder: "Confirmez votre mot de passe",
    
    // Buttons
    signIn: "Se Connecter",
    createAccountBtn: "Créer un Compte",
    signingIn: "Connexion...",
    creatingAccount: "Création du Compte...",
    
    // Toggle
    alreadyHaveAccount: "Vous avez déjà un compte? Se Connecter",
    dontHaveAccount: "Vous n'avez pas de compte? Créer un Compte",
    backToOptions: "Retour aux options de connexion",
    
    // Messages
    fillAllFields: "Veuillez remplir tous les champs.",
    validEmail: "Veuillez entrer une adresse e-mail valide.",
    passwordLength: "Le mot de passe doit contenir au moins 6 caractères.",
    passwordsNotMatch: "Les mots de passe ne correspondent pas.",
    authNotConfigured: "Le service d'authentification n'est pas configuré. Veuillez configurer les identifiants Supabase.",
    loginSuccess: "Connexion réussie! Redirection...",
    accountCreated: "Compte créé avec succès! Veuillez vérifier votre e-mail pour la vérification.",
    authUnavailable: "Service d'authentification indisponible: ",
    
    // Footer
    termsText: "En continuant, vous acceptez les Conditions de Service et la Politique de Confidentialité de TripGood",
    
    // Language
    language: "Langue",
    
    // App Navigation
    login: "Se Connecter",
    logout: "Se Déconnecter",
    welcome: "Bienvenue",
    backToWelcome: "Retour à l'Accueil",
    
    // Home Page Sections
    exploreServices: "Explorez Nos Services",
    servicesDescription: "Découvrez des expériences de voyage incroyables avec notre suite complète d'outils de réservation et de planification conçus pour rendre votre voyage inoubliable.",
    whyChooseUs: "Pourquoi Choisir TripGood?",
    reliable: "Fiable",
    reliableDescription: "Faites confiance à nos partenaires vérifiés et système de réservation sécurisé pour votre tranquillité d'esprit.",
    fast: "Rapide et Facile",
    fastDescription: "Réservez votre voyage parfait en quelques minutes avec notre interface intuitive.",
    affordable: "Abordable",
    affordableDescription: "Obtenez les meilleures offres et comparez les prix de plusieurs fournisseurs.",
    travelTips: "Conseils et Insights de Voyage",
    packingSmart: "Emballer Intelligemment",
    packingDescription: "Apprenez l'art de l'emballage efficace pour voyager léger et préparé pour toute aventure.",
    localExperience: "Expérience Locale",
    localDescription: "Découvrez des joyaux cachés et des expériences authentiques recommandées par les habitants.",
    safetyFirst: "Sécurité d'Abord",
    safetyDescription: "Restez informé des consignes de sécurité et des contacts d'urgence partout où vous allez.",
    stayConnected: "Restez Connecté",
    connectDescription: "Conseils pour rester connecté avec la famille et accéder aux informations importantes pendant le voyage.",
    ourNumbers: "Notre Impact",
    happyTravelers: "Voyageurs Heureux",
    destinations: "Destinations",
    support: "Support",
    rating: "Note Moyenne",
    readyToStart: "Prêt à Commencer Votre Voyage?",
    startDescription: "Rejoignez des milliers de voyageurs satisfaits qui ont découvert des destinations incroyables avec TripGood.",
    getStarted: "Commencer",
    learnMore: "En Savoir Plus",
    footerText: "Réaliser les rêves de voyage, un voyage à la fois.",
    privacy: "Politique de Confidentialité",
    terms: "Conditions de Service"
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
