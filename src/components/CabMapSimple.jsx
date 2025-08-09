import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cabData from "../data/cabDriversData.json";
import "./CabMap.css";

const CabMapOnly = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.warn("Unable to retrieve location.")
    );
  }, []);

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          🚕 Cab Services & Drivers
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
          {/* Map Container */}
          <div className="lg:col-span-2 glass-card p-4 h-full">
            <MapContainer center={[21.1458, 79.0882]} zoom={13} style={{ height: "100%", width: "100%", borderRadius: "12px" }}>
              <TileLayer
                attribution='© OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User live location in red */}
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

              {/* Cab driver markers in blue */}
              {cabData.map((driver, idx) => (
                <Marker
                  key={idx}
                  position={[driver.lat, driver.lon]}
                  icon={L.icon({
                    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    iconSize: [32, 32],
                  })}
                  eventHandlers={{
                    click: () => setSelectedDriver(driver)
                  }}
                >
                  <Popup>
                    <div className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white min-w-[280px] shadow-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🚕</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{driver.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">⭐ {driver.rating}</span>
                            <span className="text-green-400">• ₹{driver.rate_per_km}/km</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">📞</span>
                          <span className="text-white/90">{driver.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300">📍</span>
                          <span className="text-white/90">{driver.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-300">🚗</span>
                          <span className="text-white/90">Available Now</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                          Call Now
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                          Book Ride
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
            {selectedDriver && (
              <div className="glass-card p-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>👨‍✈️</span>
                  Driver Details
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-3">
                    <h4 className="text-white font-semibold mb-2">{selectedDriver.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white">{selectedDriver.rating} Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">💰</span>
                        <span className="text-white">₹{selectedDriver.rate_per_km}/km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-300">📍</span>
                        <span className="text-white/90">{selectedDriver.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-300">📞</span>
                        <span className="text-white/90">{selectedDriver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-300">🚗</span>
                        <span className="text-green-400">Available Now</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                        Call Driver
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-card p-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>💡</span>
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">{cabData.length}</div>
                  <div className="text-sm text-white/80">Available Drivers</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    ₹{Math.min(...cabData.map(d => d.rate_per_km))}
                  </div>
                  <div className="text-sm text-white/80">Starting Rate/km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabMapOnly;
