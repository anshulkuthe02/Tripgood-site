// src/api/emergencyAPI.js
import hospitalsData from '../data/hospitals.json';
import policeStationsData from '../data/PoliceStations.json';

export const getEmergencyServices = async (lat, lng, type = 'all') => {
  try {
    const services = {
      hospitals: hospitalsData,
      police: policeStationsData,
      all: [...hospitalsData, ...policeStationsData]
    };

    let emergencyServices = services[type] || services.all;

    // Add distance calculation and sort by proximity
    emergencyServices = emergencyServices.map(service => ({
      ...service,
      distance: calculateDistance(lat, lng, service.lat || 21.1458, service.lng || 79.0882),
      estimatedTime: Math.floor(Math.random() * 20) + 5, // 5-25 minutes
      isAvailable24x7: Math.random() > 0.2, // 80% are 24x7
      emergencyContact: service.phone || generateEmergencyNumber(),
      serviceType: service.name ? 'hospital' : 'police'
    }));

    return emergencyServices
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20); // Return top 20 nearest

  } catch (error) {
    console.error('Emergency services error:', error);
    throw error;
  }
};

export const getHospitals = (area = '') => {
  let hospitals = hospitalsData;
  
  if (area) {
    hospitals = hospitals.filter(hospital =>
      hospital.address?.toLowerCase().includes(area.toLowerCase()) ||
      hospital.name?.toLowerCase().includes(area.toLowerCase())
    );
  }

  return hospitals.map(hospital => ({
    ...hospital,
    specialties: generateSpecialties(),
    emergencyServices: generateEmergencyServices(),
    hasAmbulance: Math.random() > 0.3,
    insurance: generateInsuranceList(),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10
  }));
};

export const getPoliceStations = (area = '') => {
  let stations = policeStationsData;
  
  if (area) {
    stations = stations.filter(station =>
      station.address?.toLowerCase().includes(area.toLowerCase()) ||
      station.name?.toLowerCase().includes(area.toLowerCase())
    );
  }

  return stations.map(station => ({
    ...station,
    jurisdiction: generateJurisdiction(),
    hasWomenCell: Math.random() > 0.4,
    hasCyberCell: Math.random() > 0.6,
    officerInCharge: generateOfficerName(),
    emergencyResponse: Math.random() > 0.8
  }));
};

export const reportEmergency = async (emergencyType, location, description, userContact) => {
  // Simulate emergency reporting
  return new Promise((resolve) => {
    setTimeout(() => {
      const emergencyId = `EMG${Date.now()}`;
      resolve({
        emergencyId,
        status: 'reported',
        estimatedResponseTime: '10-15 minutes',
        assignedUnit: emergencyType === 'medical' ? 'Ambulance 108' : 'Police Patrol Unit',
        emergencyNumber: emergencyType === 'medical' ? '108' : '100',
        location,
        description,
        userContact,
        reportedAt: new Date().toISOString()
      });
    }, 1000);
  });
};

export const getWomenSafetyServices = () => {
  return {
    emergencyContacts: [
      { name: 'Women Helpline', number: '1091', available: '24x7' },
      { name: 'Police', number: '100', available: '24x7' },
      { name: 'Women Safety App', number: '112', available: '24x7' }
    ],
    nearbyPoliceStations: getPoliceStations().filter(station => station.hasWomenCell),
    safetyTips: [
      'Share your location with trusted contacts',
      'Keep emergency numbers handy',
      'Stay in well-lit areas',
      'Trust your instincts',
      'Use official transportation'
    ],
    safeZones: generateSafeZones()
  };
};

export const trackEmergencyResponse = async (emergencyId) => {
  // Simulate real-time tracking of emergency response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        emergencyId,
        status: 'en_route',
        estimatedArrival: Math.floor(Math.random() * 10) + 5,
        currentLocation: 'Moving towards incident location',
        contactNumber: '+91-9876543210',
        instructions: 'Stay calm and stay at the reported location'
      });
    }, 500);
  });
};

// Utility functions
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 100) / 100;
};

const generateEmergencyNumber = () => {
  return `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

const generateSpecialties = () => {
  const specialties = [
    'Emergency Medicine', 'Cardiology', 'Neurology', 'Orthopedics',
    'Pediatrics', 'Gynecology', 'General Surgery', 'Internal Medicine'
  ];
  return specialties
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 2);
};

const generateEmergencyServices = () => {
  return [
    'Emergency Room', 'Ambulance Service', 'Blood Bank', 
    'ICU', 'Trauma Center', 'Pharmacy'
  ].filter(() => Math.random() > 0.3);
};

const generateInsuranceList = () => {
  const insurance = [
    'CGHS', 'ESIC', 'Ayushman Bharat', 'Star Health',
    'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz'
  ];
  return insurance
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 2);
};

const generateJurisdiction = () => {
  const areas = [
    'Central Nagpur', 'East Nagpur', 'West Nagpur', 'South Nagpur',
    'Dharampeth', 'Sitabuldi', 'Sadar', 'Hingna Road'
  ];
  return areas[Math.floor(Math.random() * areas.length)];
};

const generateOfficerName = () => {
  const names = [
    'Inspector R.K. Sharma', 'Sub-Inspector A.K. Patil', 
    'Inspector M.S. Joshi', 'Sub-Inspector V.R. Desai',
    'Inspector S.P. Singh', 'Sub-Inspector N.K. Gupta'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateSafeZones = () => {
  return [
    { name: 'Police Station', distance: '0.5 km', type: 'security' },
    { name: 'Hospital', distance: '1.2 km', type: 'medical' },
    { name: 'Fire Station', distance: '2.1 km', type: 'emergency' },
    { name: 'Women Cell', distance: '0.8 km', type: 'women_safety' }
  ];
};

export const getEmergencyContacts = () => {
  return [
    {
      id: 1,
      name: 'Police',
      number: '100',
      type: 'police',
      description: '24/7 Police Emergency',
      icon: '🚓'
    },
    {
      id: 2,
      name: 'Fire Brigade',
      number: '101',
      type: 'fire',
      description: 'Fire Emergency Services',
      icon: '🚒'
    },
    {
      id: 3,
      name: 'Ambulance',
      number: '102',
      type: 'medical',
      description: 'Medical Emergency',
      icon: '🚑'
    },
    {
      id: 4,
      name: 'Women Helpline',
      number: '1091',
      type: 'women_safety',
      description: 'Women Safety Helpline',
      icon: '👮‍♀️'
    },
    {
      id: 5,
      name: 'Child Helpline',
      number: '1098',
      type: 'child_safety',
      description: 'Child Safety & Support',
      icon: '👶'
    },
    {
      id: 6,
      name: 'Tourist Helpline',
      number: '1363',
      type: 'tourism',
      description: 'Tourist Emergency Support',
      icon: '🧳'
    }
  ];
};

export const getNearbyHospitals = async (lat, lng, radius = 10) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockHospitals = [
      {
        id: 1,
        name: 'Orange City Hospital',
        address: 'Medical Square, Nagpur',
        phone: '+91-712-2664444',
        lat: lat + 0.02,
        lng: lng + 0.02,
        distance: 2.5,
        type: 'Multi-specialty',
        services: ['Emergency', 'ICU', 'Cardiac', 'Trauma'],
        rating: 4.5,
        available24x7: true
      },
      {
        id: 2,
        name: 'Kingsway Hospital',
        address: 'Civil Lines, Nagpur',
        phone: '+91-712-2561234',
        lat: lat - 0.015,
        lng: lng - 0.015,
        distance: 1.8,
        type: 'General Hospital',
        services: ['Emergency', 'Surgery', 'Pediatrics'],
        rating: 4.2,
        available24x7: true
      },
      {
        id: 3,
        name: 'NKP Salve Hospital',
        address: 'Hingna Road, Nagpur',
        phone: '+91-712-2812345',
        lat: lat + 0.03,
        lng: lng - 0.02,
        distance: 3.2,
        type: 'Government Hospital',
        services: ['Emergency', 'General Medicine', 'Orthopedics'],
        rating: 3.8,
        available24x7: true
      }
    ];
    
    // Calculate actual distances and filter by radius
    const hospitalsWithDistance = mockHospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(lat, lng, hospital.lat, hospital.lng)
    })).filter(hospital => hospital.distance <= radius);
    
    return hospitalsWithDistance.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Get nearby hospitals error:', error);
    throw new Error('Failed to get nearby hospitals');
  }
};

export const getNearbyPoliceStations = async (lat, lng, radius = 10) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockPoliceStations = [
      {
        id: 1,
        name: 'Sitabuldi Police Station',
        address: 'Sitabuldi, Nagpur',
        phone: '+91-712-2721234',
        lat: lat + 0.01,
        lng: lng + 0.01,
        distance: 1.2,
        type: 'City Police',
        services: ['Emergency Response', 'Crime Investigation', 'Traffic'],
        incharge: 'Inspector Sharma',
        available24x7: true
      },
      {
        id: 2,
        name: 'Civil Lines Police Station',
        address: 'Civil Lines, Nagpur',
        phone: '+91-712-2561122',
        lat: lat - 0.02,
        lng: lng - 0.01,
        distance: 2.1,
        type: 'Metropolitan Police',
        services: ['Emergency Response', 'Women Safety', 'Cyber Crime'],
        incharge: 'Inspector Verma',
        available24x7: true
      },
      {
        id: 3,
        name: 'Dharampeth Police Station',
        address: 'Dharampeth, Nagpur',
        phone: '+91-712-2771234',
        lat: lat + 0.025,
        lng: lng - 0.02,
        distance: 2.8,
        type: 'Local Police',
        services: ['Patrol', 'Community Safety', 'Traffic Control'],
        incharge: 'Inspector Patel',
        available24x7: true
      }
    ];
    
    // Calculate actual distances and filter by radius
    const stationsWithDistance = mockPoliceStations.map(station => ({
      ...station,
      distance: calculateDistance(lat, lng, station.lat, station.lng)
    })).filter(station => station.distance <= radius);
    
    return stationsWithDistance.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Get nearby police stations error:', error);
    throw new Error('Failed to get nearby police stations');
  }
};
