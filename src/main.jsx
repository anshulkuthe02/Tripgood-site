// src/main.jsx

import React from 'react';
import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './routes/AnimatedRoutes';
import { NavigationProvider } from './context/NavigationContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import BrandHeader from "./components/BrandHeader"; // adjust the path as needed


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <LanguageProvider>
          <BrandHeader />
          <AnimatedRoutes />
        </LanguageProvider>
      </NavigationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
