// src/api/locationAPI.js
import bikeRentalsData from '../data/bikeRentalsDataMapReady.json';

export const getNearbyPlaces = async (lat, lng, type = 'tourist_attraction') => {
  try {
    // Simulate API call to places service (Google Places, etc.)
    const nearbyPlaces = generateMockPlaces(lat, lng, type);
    return nearbyPlaces;
  } catch (error) {
    console.error('Places API Error:', error);
    return [];
  }
};

export const getBikeRentals = (area = '') => {
  if (!area) return bikeRentalsData;
  
  return bikeRentalsData.filter(rental =>
    rental.address?.toLowerCase().includes(area.toLowerCase()) ||
    rental.name.toLowerCase().includes(area.toLowerCase())
  );
};

export const bookBikeRental = async (bikeId, bookingDetails) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const bookingId = `BR${Date.now()}`;
    const booking = {
      bookingId,
      bikeId,
      status: 'confirmed',
      pickupTime: bookingDetails.pickupTime,
      returnTime: bookingDetails.returnTime,
      totalCost: bookingDetails.totalCost || Math.floor(Math.random() * 500) + 100,
      customerDetails: bookingDetails.customerDetails,
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      booking,
      message: 'Bike rental booked successfully!'
    };
  } catch (error) {
    console.error('Bike rental booking error:', error);
    throw new Error('Failed to book bike rental');
  }
};

export const searchLocationByName = async (query) => {
  try {
    // Mock location search - in real app, use Google Geocoding API
    const mockResults = [
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882, country: 'India' },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India' },
      { name: 'Delhi', lat: 28.7041, lng: 77.1025, country: 'India' },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946, country: 'India' },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707, country: 'India' }
    ].filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase())
    );

    return mockResults;
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const reverseGeocode = async (lat, lng) => {
  try {
    // Mock reverse geocoding - in real app, use Google Geocoding API
    const mockAddress = `Near ${generateRandomLandmark()}, Nagpur, Maharashtra, India`;
    return mockAddress;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Unknown location';
  }
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

const toRad = (deg) => deg * (Math.PI / 180);

const generateMockPlaces = (lat, lng, type) => {
  const placeTypes = {
    tourist_attraction: [
      'Historical Monument', 'Museum', 'Temple', 'Fort', 'Garden',
      'Lake', 'Viewpoint', 'Cultural Center', 'Art Gallery'
    ],
    restaurant: [
      'Indian Restaurant', 'Fast Food', 'Cafe', 'Pizza Place', 
      'Chinese Restaurant', 'South Indian', 'Street Food'
    ],
    hospital: [
      'Multi-specialty Hospital', 'Emergency Care', 'Clinic',
      'Diagnostic Center', 'Pharmacy', 'Medical Center'
    ],
    atm: [
      'SBI ATM', 'HDFC ATM', 'ICICI ATM', 'Axis Bank ATM', 'PNB ATM'
    ]
  };

  const places = placeTypes[type] || placeTypes.tourist_attraction;
  const mockPlaces = [];

  for (let i = 0; i < 10; i++) {
    const distance = Math.random() * 5; // Within 5km
    const bearing = Math.random() * 360; // Random direction
    
    // Calculate random nearby coordinates
    const newLat = lat + (distance / 111) * Math.cos(bearing * Math.PI / 180);
    const newLng = lng + (distance / (111 * Math.cos(lat * Math.PI / 180))) * Math.sin(bearing * Math.PI / 180);

    mockPlaces.push({
      id: `place_${i}`,
      name: places[i % places.length],
      lat: newLat,
      lng: newLng,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
      type: type,
      distance: Math.round(distance * 100) / 100,
      address: `Street ${i + 1}, Area ${Math.ceil((i + 1) / 3)}, Nagpur`,
      phone: `+91 9${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 90000000) + 10000000}`,
      isOpen: Math.random() > 0.2, // 80% are open
      priceLevel: Math.floor(Math.random() * 4) + 1 // 1-4 price level
    });
  }

  return mockPlaces.sort((a, b) => a.distance - b.distance);
};

const generateRandomLandmark = () => {
  const landmarks = [
    'Zero Mile Stone', 'Deekshabhoomi', 'Sitabardi Fort', 'Ambazari Lake',
    'Dragon Palace Temple', 'Maharaj Bagh Zoo', 'Futala Lake', 'Seminary Hills',
    'Raman Science Centre', 'Nagpur Railway Station', 'Dr. Babasaheb Ambedkar Airport'
  ];
  return landmarks[Math.floor(Math.random() * landmarks.length)];
};

export const addToFavorites = (place) => {
  const favorites = JSON.parse(localStorage.getItem('tripgood_favorites')) || [];
  if (!favorites.find(fav => fav.id === place.id)) {
    favorites.push(place);
    localStorage.setItem('tripgood_favorites', JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFromFavorites = (placeId) => {
  const favorites = JSON.parse(localStorage.getItem('tripgood_favorites')) || [];
  const updated = favorites.filter(fav => fav.id !== placeId);
  localStorage.setItem('tripgood_favorites', JSON.stringify(updated));
  return updated;
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('tripgood_favorites')) || [];
};

export const searchPlaces = async (query, userPosition = null) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockPlaces = [
      {
        id: 1,
        name: 'Deekshabhoomi',
        type: 'landmark',
        lat: 21.1099,
        lng: 79.0787,
        address: 'Nagpur, Maharashtra',
        rating: 4.5,
        description: 'Buddhist monument and pilgrimage site'
      },
      {
        id: 2,
        name: 'Ambazari Lake',
        type: 'park',
        lat: 21.1276,
        lng: 79.0421,
        address: 'Ambazari, Nagpur',
        rating: 4.2,
        description: 'Beautiful lake with boating facilities'
      },
      {
        id: 3,
        name: 'Sitabuldi Fort',
        type: 'historical',
        lat: 21.1498,
        lng: 79.0806,
        address: 'Sitabuldi, Nagpur',
        rating: 4.0,
        description: 'Historic fort with panoramic city views'
      },
      {
        id: 4,
        name: 'Raman Science Centre',
        type: 'museum',
        lat: 21.1307,
        lng: 79.0629,
        address: 'Civil Lines, Nagpur',
        rating: 4.3,
        description: 'Interactive science museum'
      }
    ];
    
    // Filter based on query
    const filteredPlaces = mockPlaces.filter(place =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.type.toLowerCase().includes(query.toLowerCase()) ||
      place.address.toLowerCase().includes(query.toLowerCase())
    );
    
    // Add distance if user position provided
    if (userPosition) {
      filteredPlaces.forEach(place => {
        place.distance = calculateDistance(
          userPosition[0], userPosition[1],
          place.lat, place.lng
        );
      });
      filteredPlaces.sort((a, b) => a.distance - b.distance);
    }
    
    return filteredPlaces;
  } catch (error) {
    console.error('Search places error:', error);
    throw new Error('Failed to search places');
  }
};

export const getNearbyServices = async (lat, lng, serviceType = 'restaurant') => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const serviceData = {
      restaurant: [
        {
          id: 1,
          name: 'Haldiram\'s',
          type: 'restaurant',
          lat: lat + 0.01,
          lng: lng + 0.01,
          address: 'Sitabuldi, Nagpur',
          rating: 4.2,
          cuisine: 'Indian, Sweets'
        },
        {
          id: 2,
          name: 'KFC',
          type: 'restaurant',
          lat: lat - 0.01,
          lng: lng - 0.01,
          address: 'Dharampeth, Nagpur',
          rating: 4.0,
          cuisine: 'Fast Food'
        }
      ],
      hospital: [
        {
          id: 1,
          name: 'Orange City Hospital',
          type: 'hospital',
          lat: lat + 0.02,
          lng: lng + 0.02,
          address: 'Medical Square, Nagpur',
          rating: 4.5,
          services: '24/7 Emergency'
        },
        {
          id: 2,
          name: 'Kingsway Hospital',
          type: 'hospital',
          lat: lat - 0.02,
          lng: lng - 0.02,
          address: 'Civil Lines, Nagpur',
          rating: 4.3,
          services: 'Multi-specialty'
        }
      ],
      gas_station: [
        {
          id: 1,
          name: 'Indian Oil Petrol Pump',
          type: 'gas_station',
          lat: lat + 0.015,
          lng: lng + 0.015,
          address: 'Ring Road, Nagpur',
          rating: 4.0,
          services: 'Fuel, ATM'
        },
        {
          id: 2,
          name: 'HP Petrol Pump',
          type: 'gas_station',
          lat: lat - 0.015,
          lng: lng - 0.015,
          address: 'Wardha Road, Nagpur',
          rating: 3.8,
          services: 'Fuel, Car Wash'
        }
      ]
    };
    
    const services = serviceData[serviceType] || [];
    
    // Add distance calculation
    services.forEach(service => {
      service.distance = calculateDistance(lat, lng, service.lat, service.lng);
    });
    
    return services.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Get nearby services error:', error);
    throw new Error('Failed to get nearby services');
  }
};
