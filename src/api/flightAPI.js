// src/api/flightAPI.js
import axios from 'axios';

// Flight API configuration
const FLIGHT_API_KEY = import.meta.env.VITE_FLIGHT_API_KEY || '636f82c769484dca86f4dd6ff35ae9dc';

export const searchFlights = async (from, to, date, passengers = 1) => {
  try {
    // Real API call
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${FLIGHT_API_KEY}&dep_iata=${from}&arr_iata=${to}&limit=50`
    );

    if (response.data?.data) {
      return response.data.data.map(flight => ({
        ...flight,
        searchDate: date,
        passengers: passengers
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Flight API Error:', error);
    
    // Fallback mock data for development
    return generateMockFlights(from, to, date, passengers);
  }
};

export const getAirportSuggestions = async (query) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/airports?access_key=${FLIGHT_API_KEY}&search=${query}&limit=10`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Airport API Error:', error);
    return mockAirports.filter(airport => 
      airport.name.toLowerCase().includes(query.toLowerCase()) ||
      airport.iata_code.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Mock data for development/fallback
const generateMockFlights = (from, to, date, passengers) => {
  const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoAir'];
  const mockFlights = [];

  for (let i = 0; i < 10; i++) {
    const departureTime = new Date();
    departureTime.setHours(6 + Math.floor(Math.random() * 18));
    departureTime.setMinutes(Math.floor(Math.random() * 60));

    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + 1 + Math.floor(Math.random() * 4));

    mockFlights.push({
      flight: {
        number: `${airlines[i % airlines.length].slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
        iata: `${airlines[i % airlines.length].slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`
      },
      airline: {
        name: airlines[i % airlines.length]
      },
      departure: {
        airport: from,
        iata: from,
        scheduled: departureTime.toISOString()
      },
      arrival: {
        airport: to,
        iata: to,
        scheduled: arrivalTime.toISOString()
      },
      price: Math.floor(Math.random() * 15000) + 3000,
      searchDate: date,
      passengers: passengers,
      duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 59)}m`,
      stops: Math.random() > 0.7 ? 1 : 0
    });
  }

  return mockFlights;
};

const mockAirports = [
  { name: 'Indira Gandhi International Airport', iata_code: 'DEL', city: 'Delhi' },
  { name: 'Chhatrapati Shivaji International Airport', iata_code: 'BOM', city: 'Mumbai' },
  { name: 'Kempegowda International Airport', iata_code: 'BLR', city: 'Bangalore' },
  { name: 'Chennai International Airport', iata_code: 'MAA', city: 'Chennai' },
  { name: 'Netaji Subhash Chandra Bose International Airport', iata_code: 'CCU', city: 'Kolkata' },
  { name: 'Rajiv Gandhi International Airport', iata_code: 'HYD', city: 'Hyderabad' },
  { name: 'Cochin International Airport', iata_code: 'COK', city: 'Kochi' },
  { name: 'Pune Airport', iata_code: 'PNQ', city: 'Pune' },
  { name: 'Sardar Vallabhbhai Patel International Airport', iata_code: 'AMD', city: 'Ahmedabad' },
  { name: 'Goa International Airport', iata_code: 'GOI', city: 'Goa' }
];

export { mockAirports };
