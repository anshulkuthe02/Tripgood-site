import React, { useState } from 'react';
import { searchTaxis, bookTaxi, trackTaxi, cancelBooking, getDriverProfile } from '../api/taxiAPI';

const TaxisPage = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [taxis, setTaxis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [booking, setBooking] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [driverProfile, setDriverProfile] = useState(null);

  const handleSearch = async () => {
    if (!pickup || !destination) {
      setError('Please enter both pickup and destination locations');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await searchTaxis(pickup, destination);
      setTaxis(results);
      
      if (results.length === 0) {
        setError('No taxis available for this route at the moment');
      }
    } catch (err) {
      console.error('Taxi search error:', err);
      setError('Failed to search taxis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTaxi = async (taxi) => {
    try {
      const bookingDetails = await bookTaxi(taxi.id, pickup, destination);
      setBooking(bookingDetails);
      setSelectedTaxi(taxi);
      alert(`Taxi booked successfully! Booking ID: ${bookingDetails.bookingId}`);
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to book taxi');
    }
  };

  const handleTrackTaxi = async (bookingId) => {
    try {
      const trackingInfo = await trackTaxi(bookingId);
      setTracking(trackingInfo);
    } catch (error) {
      console.error('Tracking error:', error);
      setError('Failed to track taxi');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBooking(null);
      setTracking(null);
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Cancel error:', error);
      setError('Failed to cancel booking');
    }
  };

  const handleViewDriver = async (driverId) => {
    try {
      const profile = await getDriverProfile(driverId);
      setDriverProfile(profile);
    } catch (error) {
      console.error('Driver profile error:', error);
      setError('Failed to load driver profile');
    }
  };

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h1 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          Book a Taxi
        </h1>
        
        {/* Search Form */}
        <div className="glass-card p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-3">Pickup Location</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Enter pickup location..."
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Destination</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Enter destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Searching Taxis...' : 'Search Taxis'}
            </button>
          </div>
        </div>

        {error && (
          <div className="glass-card p-6 mb-8">
            <p className="text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Active Booking Display */}
        {booking && (
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Active Booking</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-white/90">
                <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                <p><strong>Driver:</strong> {booking.driverName}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
                <p><strong>Pickup:</strong> {booking.pickup}</p>
                <p><strong>Destination:</strong> {booking.destination}</p>
                <p><strong>Fare:</strong> ₹{booking.estimatedFare}</p>
                <p><strong>Status:</strong> <span className="text-green-300">{booking.status}</span></p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleTrackTaxi(booking.bookingId)}
                  className="w-full glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
                >
                  Track Taxi
                </button>
                <button
                  onClick={() => handleViewDriver(booking.driverId)}
                  className="w-full glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
                >
                  View Driver Profile
                </button>
                <button
                  onClick={() => handleCancelBooking(booking.bookingId)}
                  className="w-full glass-card bg-red-500/30 hover:bg-red-500/40 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
                >
                  Cancel Booking
                </button>
              </div>
            </div>

            {tracking && (
              <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
                <h3 className="text-white font-bold mb-2">Live Tracking</h3>
                <div className="text-white/90">
                  <p>Driver Location: {tracking.currentLocation}</p>
                  <p>ETA: {tracking.eta} minutes</p>
                  <p>Distance: {tracking.distance} km</p>
                  <p>Status: {tracking.status}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Available Taxis */}
        {taxis.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Available Taxis</h2>
            {taxis.map((taxi, index) => (
              <div className="glass-card p-6" key={index}>
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={taxi.image || `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center`}
                      alt={taxi.type} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-2xl font-bold text-white">{taxi.company || taxi.type}</h3>
                      <span className="glass-card px-3 py-1 text-sm text-white bg-blue-500/30">
                        {taxi.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-white/90">
                      <span>⭐ {taxi.rating || 4.5}</span>
                      <span>👥 Capacity: {taxi.capacity || 4}</span>
                      <span className="text-green-300 font-semibold">₹{taxi.pricePerKm || taxi.price_per_km}/km</span>
                    </div>
                    
                    <p className="text-white/90">🕒 ETA: {taxi.eta || '5-10 mins'}</p>
                    <p className="text-white/80">{taxi.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-white/90">
                        📍 <strong>{taxi.currentLocation || taxi.location}</strong>
                      </p>
                      <div className="text-white text-right">
                        <p className="text-xl font-bold">₹{taxi.estimatedFare}</p>
                        <p className="text-white/80 text-sm">Estimated fare</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleBookTaxi(taxi)}
                      className="w-full glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => handleViewDriver(taxi.driverId)}
                      className="w-full glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                    >
                      View Driver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Driver Profile Modal */}
        {driverProfile && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Driver Profile</h2>
                <button
                  onClick={() => setDriverProfile(null)}
                  className="text-white/80 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={driverProfile.photo || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                    alt={driverProfile.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-white">{driverProfile.name}</h3>
                  <p className="text-white/80">{driverProfile.vehicleType} • {driverProfile.vehicleNumber}</p>
                </div>

                <div className="space-y-2 text-white/90">
                  <p><strong>Rating:</strong> ⭐ {driverProfile.rating}/5 ({driverProfile.totalRides} rides)</p>
                  <p><strong>Experience:</strong> {driverProfile.experience} years</p>
                  <p><strong>Languages:</strong> {driverProfile.languages?.join(', ')}</p>
                  <p><strong>License:</strong> {driverProfile.licenseNumber}</p>
                </div>

                {driverProfile.recentReviews && (
                  <div>
                    <h4 className="text-white font-bold mb-2">Recent Reviews</h4>
                    <div className="space-y-2">
                      {driverProfile.recentReviews.slice(0, 2).map((review, idx) => (
                        <div key={idx} className="p-3 bg-white/10 rounded-lg text-white/90 text-sm">
                          <p>"{review.comment}"</p>
                          <p className="text-white/70 mt-1">- {review.passenger} • ⭐ {review.rating}/5</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
                
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-2xl font-bold text-white">{taxi.company}</h3>
                    <span className="glass-card px-3 py-1 text-sm text-white bg-blue-500/30">
                      {taxi.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <span>⭐ {taxi.rating}</span>
                    <span>👥 Capacity: {taxi.capacity}</span>
                    <span className="text-green-300 font-semibold">₹{taxi.price_per_km}/km</span>
                  </div>
                  
                  <p className="text-white/90">🕒 Availability: {taxi.availability}</p>
                  <p className="text-white/80">{taxi.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">
                      📍 <strong>{taxi.location}</strong>
                    </p>
                    <button
                      className="glass-card px-4 py-2 text-sm text-white bg-purple-500/30 hover:bg-purple-500/40 transition-all duration-300"
                      onClick={() => setActiveMapIndex(activeMapIndex === index ? null : index)}
                    >
                      {activeMapIndex === index ? 'Hide Map' : 'View on Map'}
                    </button>
                  </div>
                  
                  {activeMapIndex === index && (
                    <div className="glass-card p-4 mt-4">
                      <iframe
                        title={`Map for ${taxi.location}`}
                        width="100%"
                        height="200"
                        className="rounded-xl"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(taxi.location)}&output=embed`}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-white/90">
                      <p>👨‍✈️ Driver: {taxi.driver_name}</p>
                      <p>📞 {taxi.driver_phone}</p>
                    </div>
                    <button className="glass-card px-6 py-3 bg-gradient-to-r from-green-500/30 to-blue-500/30 text-white font-semibold rounded-xl hover:from-green-500/40 hover:to-blue-500/40 transform hover:scale-105 transition-all duration-300">
                      Book Ride
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxisPage;