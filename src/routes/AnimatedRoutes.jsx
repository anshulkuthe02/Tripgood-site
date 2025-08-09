// src/routes/AnimatedRoutes.jsx

import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SplashScreen from '../components/SplashScreen';
import App from '../App';
import { NavigationContext } from '../context/NavigationContext';
import FlightPage from '../pages/FlightPage';
import TrainPage from '../pages/TrainPage';
import HotelPage from '../pages/HotelPage';
import TaxisPage from '../pages/TaxisPage';
import LocationPage from '../pages/LocationPage';
import BikeRentalsMap from '../components/BikeRentalsMap';
import CabMap from "../components/CabMap";
import LoginPage from "../pages/LoginPage";
import MoreOptions from '../pages/MoreOptions';
import EmergencyPage from '../pages/MoreOptions/EmergencyPage';
import PoliceMapCard from '../pages/MoreOptions/PoliceMapCard';
import HospitalMapCard from '../pages/MoreOptions/HospitalMapCard';
import WomenSafetyCard from '../pages/MoreOptions/WomenSafetyCard';
import TravelChecklistPage from '../pages/MoreOptions/TravelItems';
import CurrencyConverterPage from '../pages/MoreOptions/CurrencyConvert'; 
import WeatherPage from "../pages/MoreOptions/WeatherPage";
import TranslatorPage from "../pages/MoreOptions/TranslatorPage";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { direction } = useContext(NavigationContext);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen direction={direction} />} />
        <Route path="/home" element={<App direction={direction} />} />
        <Route path="/flights" element={<FlightPage />} />
        <Route path="/trains" element={<TrainPage />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/taxis" element={<TaxisPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/bike-rentals" element={<BikeRentalsMap />} />
        <Route path="/cab-rentals" element={<CabMap />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/more-options" element={<MoreOptions />} />
        <Route path="/checklist" element={<TravelChecklistPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/emergency/police" element={<PoliceMapCard />} />
        <Route path="/emergency/hospitals" element={<HospitalMapCard />} />
        <Route path="/emergency/womensafety" element={<WomenSafetyCard />} />
        <Route path="/currency" element={<CurrencyConverterPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
