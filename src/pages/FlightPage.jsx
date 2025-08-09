import React, { useState } from 'react';
import { searchFlights, getAirportSuggestions, mockAirports } from '../api/flightAPI';

const FlightPage = () => {
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('BOM');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert('Please fill all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const flightResults = await searchFlights(from, to, date, passengers);
      setFlights(flightResults);
      
      if (flightResults.length === 0) {
        setError('No flights found for the selected route and date.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flight data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFromChange = async (value) => {
    setFrom(value);
    if (value.length > 2) {
      try {
        const suggestions = await getAirportSuggestions(value);
        setFromSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting suggestions:', error);
        setFromSuggestions(mockAirports.filter(airport => 
          airport.iata_code.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5));
      }
    }
  };

  const handleToChange = async (value) => {
    setTo(value);
    if (value.length > 2) {
      try {
        const suggestions = await getAirportSuggestions(value);
        setToSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting suggestions:', error);
        setToSuggestions(mockAirports.filter(airport => 
          airport.iata_code.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5));
      }
    }
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="tripgood-bg min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-4xl font-bold text-glass-white text-center mb-8">Search Flights</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="relative">
              <label className="block text-glass-white font-medium mb-2">From:</label>
              <input 
                type="text" 
                value={from} 
                onChange={(e) => handleFromChange(e.target.value)}
                placeholder="Delhi, Mumbai, etc."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-glass-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {fromSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full glass-card">
                  {fromSuggestions.slice(0, 3).map((airport, idx) => (
                    <div 
                      key={idx}
                      className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm border-b border-white/10 last:border-0"
                      onClick={() => {
                        setFrom(airport.iata_code || airport.code);
                        setFromSuggestions([]);
                      }}
                    >
                      <div className="font-medium">{airport.iata_code || airport.code}</div>
                      <div className="text-white/70">{airport.city || airport.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-glass-white font-medium mb-2">To:</label>
              <input 
                type="text" 
                value={to} 
                onChange={(e) => handleToChange(e.target.value)}
                placeholder="Bangalore, Kolkata, etc."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-glass-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {toSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full glass-card">
                  {toSuggestions.slice(0, 3).map((airport, idx) => (
                    <div 
                      key={idx}
                      className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm border-b border-white/10 last:border-0"
                      onClick={() => {
                        setTo(airport.iata_code || airport.code);
                        setToSuggestions([]);
                      }}
                    >
                      <div className="font-medium">{airport.iata_code || airport.code}</div>
                      <div className="text-white/70">{airport.city || airport.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-glass-white font-medium mb-2">Date:</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-glass-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label className="block text-glass-white font-medium mb-2">Passengers:</label>
              <select 
                value={passengers} 
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-glass-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num} Passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={handleSearch}
              className="glass-container px-8 py-4 text-glass-white hover:bg-white/30 transition-all duration-300 font-bold text-lg"
            >
              Search Flights
            </button>
          </div>
        </div>

        {error && (
          <div className="glass-card p-6 mb-8">
            <p className="text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {flights.length > 0 && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-glass-white mb-6">Available Flights</h2>
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-glass-white font-semibold mb-2">Flight Information</h3>
                      <p className="text-glass-light">Flight: {flight?.flight?.iata || 'N/A'}</p>
                      <p className="text-glass-light">Aircraft: {flight?.aircraft?.registration || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-glass-white font-semibold mb-2">Departure</h3>
                      <p className="text-glass-light">Airport: {flight?.departure?.iata || 'N/A'}</p>
                      <p className="text-glass-light">Time: {flight?.departure?.scheduled || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-glass-white font-semibold mb-2">Arrival</h3>
                      <p className="text-glass-light">Airport: {flight?.arrival?.iata || 'N/A'}</p>
                      <p className="text-glass-light">Time: {flight?.arrival?.scheduled || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPage;



