// src/pages/EmergencyPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  HospitalIcon,
  PhoneCallIcon,
  MapPinIcon,
  AlertTriangleIcon
} from "lucide-react";
import { getEmergencyContacts, getNearbyHospitals, getNearbyPoliceStations, reportEmergency } from "../../api/emergencyAPI";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [nearbyPolice, setNearbyPolice] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user location and load emergency data
    getCurrentLocation();
    loadEmergencyContacts();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          loadNearbyServices(location);
        },
        (error) => {
          console.error('Location error:', error);
          // Use default location (e.g., Delhi)
          const defaultLocation = { latitude: 28.6139, longitude: 77.2090 };
          setUserLocation(defaultLocation);
          loadNearbyServices(defaultLocation);
        }
      );
    }
  };

  const loadEmergencyContacts = async () => {
    try {
      const contacts = await getEmergencyContacts();
      setEmergencyContacts(contacts);
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
    }
  };

  const loadNearbyServices = async (location) => {
    try {
      setLoading(true);
      const [hospitals, police] = await Promise.all([
        getNearbyHospitals(location.latitude, location.longitude),
        getNearbyPoliceStations(location.latitude, location.longitude)
      ]);
      setNearbyHospitals(hospitals);
      setNearbyPolice(police);
    } catch (error) {
      console.error('Error loading nearby services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleReportEmergency = async (type) => {
    if (!userLocation) {
      alert('Location access required for emergency reporting');
      return;
    }

    try {
      const report = await reportEmergency(type, userLocation.latitude, userLocation.longitude);
      alert(`Emergency reported! Reference ID: ${report.reportId}`);
    } catch (error) {
      console.error('Error reporting emergency:', error);
      alert('Failed to report emergency. Please try calling directly.');
    }
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          Emergency & Safety Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div 
            className="glass-card p-8 cursor-pointer group hover:scale-105 transform transition-all duration-300 text-center"
            onClick={() => handleCardClick("/emergency/police")}
          >
            <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
              <ShieldCheckIcon size={48} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Police Stations</h3>
            <p className="text-white/80">Locate nearby police stations with contact and address.</p>
          </div>

          <div 
            className="glass-card p-8 cursor-pointer group hover:scale-105 transform transition-all duration-300 text-center"
            onClick={() => handleCardClick("/emergency/hospitals")}
          >
            <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
              <HospitalIcon size={48} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Hospitals</h3>
            <p className="text-white/80">Find hospitals and emergency numbers in your city.</p>
          </div>

          <div 
            className="glass-card p-8 cursor-pointer group hover:scale-105 transform transition-all duration-300 text-center"
            onClick={() => handleCardClick("/emergency/womensafety")}
          >
            <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
              <PhoneCallIcon size={48} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Women Safety</h3>
            <p className="text-white/80">Quick help & SOS for women's emergency services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
