// src/api/taxiAPI.js
import taxiData from '../data/taxis.json';
import cabDriversData from '../data/cabDriversData.json';

export const searchTaxis = async (location, vehicleType = '', sortBy = 'price') => {
  try {
    let availableTaxis = taxiData;

    // Filter by location if provided
    if (location) {
      availableTaxis = availableTaxis.filter(taxi =>
        taxi.location?.toLowerCase().includes(location.toLowerCase()) ||
        taxi.company.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by vehicle type
    if (vehicleType) {
      availableTaxis = availableTaxis.filter(taxi =>
        taxi.type.toLowerCase() === vehicleType.toLowerCase()
      );
    }

    // Enhanced taxi data with real-time info
    const enhancedTaxis = availableTaxis.map(taxi => ({
      ...taxi,
      estimatedArrival: Math.floor(Math.random() * 15) + 2, // 2-17 minutes
      distance: (Math.random() * 5 + 0.5).toFixed(1), // 0.5-5.5 km
      isAvailable: Math.random() > 0.1, // 90% availability
      currentLocation: generateNearbyLocation(),
      features: generateTaxiFeatures(taxi.type),
      bookingId: null
    }));

    // Sort based on preference
    switch (sortBy) {
      case 'price':
        return enhancedTaxis.sort((a, b) => a.price_per_km - b.price_per_km);
      case 'rating':
        return enhancedTaxis.sort((a, b) => b.rating - a.rating);
      case 'distance':
        return enhancedTaxis.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      case 'time':
        return enhancedTaxis.sort((a, b) => a.estimatedArrival - b.estimatedArrival);
      default:
        return enhancedTaxis;
    }

  } catch (error) {
    console.error('Taxi search error:', error);
    throw error;
  }
};

export const getCabDrivers = (area = '') => {
  if (!area) return cabDriversData;
  
  return cabDriversData.filter(driver =>
    driver.area?.toLowerCase().includes(area.toLowerCase()) ||
    driver.name.toLowerCase().includes(area.toLowerCase())
  );
};

export const bookTaxi = async (taxiId, pickupLocation, dropLocation, scheduledTime) => {
  // Simulate booking API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookingId = `TX${Date.now()}`;
      resolve({
        bookingId,
        status: 'confirmed',
        taxiId,
        pickupLocation,
        dropLocation,
        scheduledTime: scheduledTime || 'Now',
        estimatedFare: Math.floor(Math.random() * 500) + 100,
        driverInfo: {
          name: taxiData.find(t => t.id === taxiId)?.driver_name || 'Driver Name',
          phone: taxiData.find(t => t.id === taxiId)?.driver_phone || '+91-98765-43210',
          vehicleNumber: `MH ${Math.floor(Math.random() * 99) + 1} A ${Math.floor(Math.random() * 9999) + 1000}`
        }
      });
    }, 1500);
  });
};

export const trackTaxi = async (bookingId) => {
  // Simulate real-time tracking
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bookingId,
        status: 'en_route',
        driverLocation: {
          lat: 21.1458 + (Math.random() - 0.5) * 0.01,
          lng: 79.0882 + (Math.random() - 0.5) * 0.01
        },
        estimatedArrival: Math.floor(Math.random() * 10) + 3,
        distance: (Math.random() * 3 + 0.2).toFixed(1)
      });
    }, 500);
  });
};

export const getTaxiTypes = () => {
  return [...new Set(taxiData.map(taxi => taxi.type))];
};

export const getNearbyTaxis = (lat, lng, radius = 5) => {
  // Filter taxis within radius (mock implementation)
  return taxiData.filter(() => Math.random() > 0.3); // 70% of taxis are nearby
};

const generateNearbyLocation = () => {
  const locations = [
    'Near Railway Station', 'City Center', 'Airport Road', 
    'Mall Parking', 'Bus Stand', 'Metro Station', 'Hospital Area'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const generateTaxiFeatures = (type) => {
  const allFeatures = [
    'AC', 'GPS Tracking', 'Music System', 'Phone Charger', 
    'Water Bottle', 'Tissue Box', 'Hand Sanitizer', 'WiFi',
    'Leather Seats', 'Sunroof', 'Child Seat Available'
  ];

  const featureCount = type === 'Premium' ? 6 : 
                      type === 'Economy' ? 3 : 4;

  return allFeatures
    .sort(() => 0.5 - Math.random())
    .slice(0, featureCount);
};

export const cancelBooking = async (bookingId) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      bookingId,
      status: 'CANCELLED',
      refundAmount: Math.floor(Math.random() * 500) + 100,
      refundStatus: 'INITIATED',
      message: 'Booking cancelled successfully. Refund will be processed within 3-5 business days.'
    };
  } catch (error) {
    console.error('Cancel booking error:', error);
    throw new Error('Failed to cancel booking');
  }
};

export const getDriverProfile = async (driverId) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProfiles = [
      {
        id: driverId,
        name: 'Rajesh Kumar',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        totalRides: 1250,
        experience: 5,
        vehicleType: 'Sedan',
        vehicleNumber: 'DL-01-AB-1234',
        licenseNumber: 'DL/12345678',
        languages: ['Hindi', 'English'],
        specialties: ['Airport Trips', 'Long Distance'],
        recentReviews: [
          {
            passenger: 'Priya S.',
            rating: 5,
            comment: 'Very professional and courteous driver. Clean car and safe driving.'
          },
          {
            passenger: 'Amit R.',
            rating: 4,
            comment: 'Good service, reached on time. Recommended!'
          }
        ]
      }
    ];
    
    return mockProfiles[0];
  } catch (error) {
    console.error('Get driver profile error:', error);
    throw new Error('Failed to get driver profile');
  }
};
