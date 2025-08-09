import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import bikeVendors from '../data/bikeRentalsDataMapReady.json';
import './BikeRentals.css';

// Setup default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const BikeRentalsMap = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const center = [21.1458, 79.0882]; // Nagpur center

  useEffect(() => {
    setVendors(bikeVendors);
  }, []);

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          🚲 Bike Rental Locations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
          {/* Map Container */}
          <div className="lg:col-span-2 glass-card p-4 h-full">
            <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%", borderRadius: "12px" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
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

          {/* Info Panel */}
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
        </div>
      </div>
    </div>
  );
};

export default BikeRentalsMap;
