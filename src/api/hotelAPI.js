// src/api/hotelAPI.js
import hotelData from '../data/hotels.json';

export const searchHotels = async (location, checkIn, checkOut, guests = 1, filters = {}) => {
  try {
    let filteredHotels = hotelData;

    // Filter by location
    if (location) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location.toLowerCase()) ||
        hotel.name.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price <= filters.maxPrice);
    }

    // Filter by rating
    if (filters.minRating) {
      filteredHotels = filteredHotels.filter(hotel => hotel.rating >= filters.minRating);
    }

    // Calculate nights and total price
    const nights = checkIn && checkOut ? 
      Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 1;

    const enhancedHotels = filteredHotels.map(hotel => ({
      ...hotel,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice: hotel.price * nights * guests,
      availability: Math.random() > 0.1, // 90% availability
      amenities: generateAmenities(hotel.type),
      roomsAvailable: Math.floor(Math.random() * 10) + 1
    }));

    // Sort by rating by default
    return enhancedHotels.sort((a, b) => b.rating - a.rating);

  } catch (error) {
    console.error('Hotel search error:', error);
    throw error;
  }
};

export const getHotelsByLocation = (location) => {
  return hotelData.filter(hotel =>
    hotel.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getUniqueLocations = () => {
  return [...new Set(hotelData.map(h => h.location))];
};

export const getUniqueTypes = () => {
  return [...new Set(hotelData.map(h => h.type))];
};

export const getHotelDetails = (hotelId) => {
  return hotelData.find(hotel => hotel.id === hotelId);
};

const generateAmenities = (hotelType) => {
  const allAmenities = [
    'Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 
    'Room Service', 'Air Conditioning', 'Parking', 'Breakfast', 
    'Bar', 'Conference Room', 'Laundry', 'Concierge', 'Airport Shuttle'
  ];

  const amenityCount = hotelType === 'Resort' ? 8 : 
                      hotelType === 'Boutique' ? 6 : 
                      hotelType === 'Business' ? 7 : 5;

  return allAmenities
    .sort(() => 0.5 - Math.random())
    .slice(0, amenityCount);
};

export const bookHotel = async (hotelId, bookingDetails) => {
  // Simulate booking API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bookingId: `TG${Date.now()}`,
        status: 'confirmed',
        ...bookingDetails
      });
    }, 1000);
  });
};

export const getLocationSuggestions = async (query) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockLocations = [
      { name: 'Mumbai', state: 'Maharashtra', country: 'India' },
      { name: 'Delhi', state: 'Delhi', country: 'India' },
      { name: 'Bangalore', state: 'Karnataka', country: 'India' },
      { name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
      { name: 'Hyderabad', state: 'Telangana', country: 'India' },
      { name: 'Pune', state: 'Maharashtra', country: 'India' },
      { name: 'Kolkata', state: 'West Bengal', country: 'India' },
      { name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
      { name: 'Jaipur', state: 'Rajasthan', country: 'India' },
      { name: 'Goa', state: 'Goa', country: 'India' }
    ];
    
    return mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.state.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Location suggestions error:', error);
    throw new Error('Failed to get location suggestions');
  }
};
