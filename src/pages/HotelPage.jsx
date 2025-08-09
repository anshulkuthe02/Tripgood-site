import React, { useState } from 'react';
import { searchHotels, getLocationSuggestions, bookHotel, getHotelDetails } from '../api/hotelAPI';

const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [priceRange, setPriceRange] = useState('');
  const [starRating, setStarRating] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSearch = async () => {
    if (!destination || !checkIn || !checkOut) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const filters = {
        priceRange: priceRange || 'all',
        starRating: starRating ? parseInt(starRating) : null,
        amenities: amenities.length > 0 ? amenities : null
      };

      const results = await searchHotels(destination, checkIn, checkOut, guests, rooms, filters);
      setHotels(results);
      
      if (results.length === 0) {
        setError('No hotels found for your search criteria');
      }
    } catch (err) {
      console.error('Hotel search error:', err);
      setError('Failed to search hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationChange = async (value) => {
    setDestination(value);
    if (value.length > 2) {
      try {
        const suggestions = await getLocationSuggestions(value);
        setLocationSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting location suggestions:', error);
        setLocationSuggestions([]);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleHotelBooking = async (hotel) => {
    try {
      const booking = await bookHotel(hotel.id, checkIn, checkOut, rooms, guests);
      alert(`Booking confirmed! Confirmation ID: ${booking.confirmationId}`);
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to book hotel');
    }
  };

  const handleViewDetails = async (hotelId) => {
    try {
      const details = await getHotelDetails(hotelId);
      setSelectedHotel(details);
    } catch (error) {
      console.error('Error getting hotel details:', error);
      setError('Failed to load hotel details');
    }
  };

  const toggleAmenity = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h1 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          Browse Hotels
        </h1>

        {/* Search Form */}
        <div className="glass-card p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <label className="block text-white font-semibold mb-3">Destination</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Delhi, Mumbai, Goa..."
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
              />
              {locationSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full glass-card">
                  {locationSuggestions.slice(0, 3).map((location, idx) => (
                    <div 
                      key={idx}
                      className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm border-b border-white/10 last:border-0"
                      onClick={() => {
                        setDestination(location.name);
                        setLocationSuggestions([]);
                      }}
                    >
                      <div className="font-medium">{location.name}</div>
                      <div className="text-white/70">{location.state}, {location.country}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Check-in Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Check-out Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-3">Guests</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Rooms</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={rooms}
                onChange={(e) => setRooms(parseInt(e.target.value))}
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Price Range</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="" className="bg-gray-800">Any Price</option>
                <option value="budget" className="bg-gray-800">Budget (₹1,000-3,000)</option>
                <option value="mid-range" className="bg-gray-800">Mid-range (₹3,000-7,000)</option>
                <option value="luxury" className="bg-gray-800">Luxury (₹7,000+)</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Star Rating</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
              >
                <option value="" className="bg-gray-800">Any Rating</option>
                <option value="3" className="bg-gray-800">3+ Stars</option>
                <option value="4" className="bg-gray-800">4+ Stars</option>
                <option value="5" className="bg-gray-800">5 Stars</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Amenities</label>
            <div className="flex flex-wrap gap-3">
              {['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking', 'Pet Friendly', 'Business Center'].map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    amenities.includes(amenity)
                      ? 'bg-blue-500/50 text-white border-2 border-blue-400'
                      : 'bg-white/20 text-white/80 border-2 border-white/30 hover:bg-white/30'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Searching Hotels...' : 'Search Hotels'}
            </button>
          </div>
        </div>

        {error && (
          <div className="glass-card p-6 mb-8">
            <p className="text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {hotels.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Found {hotels.length} hotels • {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
            </h2>
            {hotels.map((hotel, index) => (
              <div className="glass-card p-6" key={index}>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Hotel Image */}
                  <div className="md:col-span-1">
                    <img
                      src={hotel.image || `https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&crop=center`}
                      alt={hotel.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Hotel Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{hotel.name}</h3>
                        <p className="text-white/80">{hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-yellow-400 text-xl">
                            {'★'.repeat(Math.floor(hotel.rating || 4))}
                            {'☆'.repeat(5 - Math.floor(hotel.rating || 4))}
                          </span>
                          <span className="text-white/80">({hotel.rating || 4.0})</span>
                        </div>
                        <div className="text-white">
                          <span className="text-2xl font-bold">₹{hotel.pricePerNight || 3500}</span>
                          <span className="text-white/80">/night</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/90">{hotel.description}</p>

                    {hotel.amenities && (
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 6).map((amenity, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/80">
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 6 && (
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/80">
                            +{hotel.amenities.length - 6} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={() => handleViewDetails(hotel.id)}
                        className="glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleHotelBooking(hotel)}
                        className="glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hotel Details Modal */}
        {selectedHotel && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedHotel.name}</h2>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="text-white/80 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <img
                  src={selectedHotel.image || `https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop&crop=center`}
                  alt={selectedHotel.name}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Hotel Information</h3>
                    <div className="space-y-2 text-white/90">
                      <p><strong>Location:</strong> {selectedHotel.location}</p>
                      <p><strong>Rating:</strong> {selectedHotel.rating}/5</p>
                      <p><strong>Price:</strong> ₹{selectedHotel.pricePerNight}/night</p>
                      <p><strong>Check-in:</strong> {selectedHotel.checkInTime || '3:00 PM'}</p>
                      <p><strong>Check-out:</strong> {selectedHotel.checkOutTime || '12:00 PM'}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotel.amenities?.map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/80">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                  <p className="text-white/90">{selectedHotel.description}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      handleHotelBooking(selectedHotel);
                      setSelectedHotel(null);
                    }}
                    className="w-full glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Book This Hotel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;
