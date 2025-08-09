import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import bikeVendors from '../data/bikeRentalsDataMapReady.json';
import './BikeRentals.css';

//
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DEFAULT_CENTER = [21.1458, 79.0882]; // Nagpur center

const BikeRentalsMap = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    setVendors(bikeVendors);
    
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        console.warn("Unable to retrieve location:", error);
        // Fallback to default location if geolocation fails
        setUserLocation(DEFAULT_CENTER);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'tripgood-bg min-h-screen'}`}>
      <div className={`${isFullscreen ? 'h-full w-full p-0' : 'glass-container'}`}>
        <div className={`flex justify-between items-center ${isFullscreen ? 'absolute top-4 left-4 right-4 z-10' : 'mb-8'}`}>
          <h2 className={`text-3xl font-bold text-white text-center flex-1 font-['Long_Cang'] ${isFullscreen ? 'text-center' : ''}`}>
            🚲 Bike Rental Locations
          </h2>
          <div className="flex gap-3">
            <button
              onClick={toggleFullscreen}
              className="glass-card px-4 py-2 text-white hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center gap-2"
            >
              <span>{isFullscreen ? '📱' : '🔍'}</span>
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
        
        <div className={`${isFullscreen ? 'h-full w-full' : 'grid gap-6 h-[80vh] grid-cols-1 lg:grid-cols-3'}`}>
          {/* Map Container */}
          <div className={`${isFullscreen ? 'h-full w-full' : 'glass-card p-4 h-full relative lg:col-span-2'}`}>
            <MapContainer 
              center={userLocation || DEFAULT_CENTER} 
              zoom={13} 
              style={{ 
                height: "100%", 
                width: "100%", 
                borderRadius: isFullscreen ? "0px" : "12px"
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              
              {/* User Current Location Marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={L.icon({
                    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    iconSize: [32, 32],
                  })}
                >
                  <Popup>
                    <div className="bg-gradient-to-br from-red-900/90 to-pink-900/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white shadow-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-lg">📍</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Your Location</h3>
                          <p className="text-sm text-white/80">You are here</p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )}
              
              {/* Bike Vendor Markers */}
              {vendors.map((vendor, index) => (
                <Marker 
                  key={index} 
                  position={[vendor.lat, vendor.lon]}
                  eventHandlers={{
                    click: () => setSelectedVendor(vendor)
                  }}
                >
                  <Popup>
                    <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white min-w-[280px] shadow-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🚲</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm text-yellow-400">{vendor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300">📍</span>
                          <span className="text-white/90">{vendor.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">📞</span>
                          <span className="text-white/90">{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-300">🏍️</span>
                          <span className="text-white/90">{vendor.services.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-300">🚲</span>
                          <span className="text-white/90">Available: {vendor.availableBikes} bikes</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105">
                        Book Now
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Info Panel - Hidden in fullscreen */}
          {!isFullscreen && (
            <div className="lg:col-span-1 space-y-4 overflow-y-auto">
              {selectedVendor && (
                <div className="glass-card p-4">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📋</span>
                    Rental Details
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">{selectedVendor.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-white">{selectedVendor.rating} Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300">📍</span>
                          <span className="text-white/90">{selectedVendor.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">📞</span>
                          <span className="text-white/90">{selectedVendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-300">🚲</span>
                          <span className="text-white/90">{selectedVendor.availableBikes} bikes available</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200">
                        Contact & Book
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeRentalsMap;
