// src/pages/TrainPage.jsx
import React, { useState } from "react";
import { searchTrains, getStationSuggestions, checkPNRStatus, getLiveTrainStatus, bookTrain } from "../api/trainAPI";
import "../pages/TrainPage.css";
import TrainRouteModal from "../pages/TrainRouteModal";

const TrainPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seatClass, setSeatClass] = useState("SL");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrStatus, setPnrStatus] = useState(null);
  const [liveStatus, setLiveStatus] = useState(null);

  const handleSearch = async () => {
    if (!from || !to || !date) {
      setError("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const results = await searchTrains(from, to, date, seatClass);
      setTrains(results);
      if (results.length === 0) {
        setError("No trains found for the selected route and date");
      }
    } catch (err) {
      console.error('Train search error:', err);
      setError("Failed to search trains. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFromChange = async (value) => {
    setFrom(value);
    if (value.length > 2) {
      try {
        const suggestions = await getStationSuggestions(value);
        setFromSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting station suggestions:', error);
        setFromSuggestions([]);
      }
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = async (value) => {
    setTo(value);
    if (value.length > 2) {
      try {
        const suggestions = await getStationSuggestions(value);
        setToSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting station suggestions:', error);
        setToSuggestions([]);
      }
    } else {
      setToSuggestions([]);
    }
  };

  const handlePNRCheck = async () => {
    if (!pnrNumber) return;
    
    try {
      const status = await checkPNRStatus(pnrNumber);
      setPnrStatus(status);
    } catch (error) {
      console.error('PNR check error:', error);
      setError("Failed to check PNR status");
    }
  };

  const handleLiveStatus = async (trainNumber) => {
    try {
      const status = await getLiveTrainStatus(trainNumber);
      setLiveStatus(status);
    } catch (error) {
      console.error('Live status error:', error);
      setError("Failed to get live status");
    }
  };

  const handleBooking = async (train) => {
    try {
      const booking = await bookTrain(train.train_number, from, to, 1, seatClass, date);
      alert(`Booking successful! PNR: ${booking.pnr}`);
    } catch (error) {
      console.error('Booking error:', error);
      setError("Failed to book ticket");
    }
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return "N/A";
    
    const departure = new Date(`2023-01-01 ${departureTime}`);
    const arrival = new Date(`2023-01-01 ${arrivalTime}`);
    
    if (arrival < departure) {
      arrival.setDate(arrival.getDate() + 1);
    }
    
    const diff = arrival - departure;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h1 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          Train Search
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 relative">
            <label className="block text-white font-semibold mb-3">
              From Station
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              placeholder="Delhi, Mumbai, etc."
            />
            {fromSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full glass-card">
                {fromSuggestions.slice(0, 3).map((station, idx) => (
                  <div 
                    key={idx}
                    className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm border-b border-white/10 last:border-0"
                    onClick={() => {
                      setFrom(station.code);
                      setFromSuggestions([]);
                    }}
                  >
                    <div className="font-medium">{station.code}</div>
                    <div className="text-white/70">{station.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-6 relative">
            <label className="block text-white font-semibold mb-3">
              To Station
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              value={to}
              onChange={(e) => handleToChange(e.target.value)}
              placeholder="Bangalore, Chennai, etc."
            />
            {toSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full glass-card">
                {toSuggestions.slice(0, 3).map((station, idx) => (
                  <div 
                    key={idx}
                    className="p-3 hover:bg-white/10 cursor-pointer text-white text-sm border-b border-white/10 last:border-0"
                    onClick={() => {
                      setTo(station.code);
                      setToSuggestions([]);
                    }}
                  >
                    <div className="font-medium">{station.code}</div>
                    <div className="text-white/70">{station.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-6">
            <label className="block text-white font-semibold mb-3">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="glass-card p-6">
            <label className="block text-white font-semibold mb-3">
              Seat Category
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
            >
              <option value="SL" className="bg-gray-800">Sleeper</option>
              <option value="3A" className="bg-gray-800">AC 3 Tier</option>
              <option value="2A" className="bg-gray-800">AC 2 Tier</option>
              <option value="1A" className="bg-gray-800">AC First Class</option>
              <option value="CC" className="bg-gray-800">AC Chair Car</option>
              <option value="2S" className="bg-gray-800">Second Sitting</option>
            </select>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Searching Trains...' : 'Search Trains'}
          </button>
        </div>

        {/* PNR Status Check */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Check PNR Status</h2>
          <div className="flex gap-4">
            <input
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
              placeholder="Enter 10-digit PNR number"
              maxLength="10"
            />
            <button
              onClick={handlePNRCheck}
              className="glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Check Status
            </button>
          </div>
          {pnrStatus && (
            <div className="mt-4 p-4 glass-card">
              <h3 className="text-white font-bold mb-2">PNR Status: {pnrStatus.status}</h3>
              <div className="text-white/90">
                <p>Train: {pnrStatus.trainName} ({pnrStatus.trainNumber})</p>
                <p>From: {pnrStatus.from} To: {pnrStatus.to}</p>
                <p>Date: {pnrStatus.date}</p>
                <p>Current Status: {pnrStatus.currentStatus}</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="glass-card p-6 mb-8">
            <p className="text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {trains.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Available Trains</h2>
            {trains.map((train, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{train.trainName}</h3>
                    <p className="text-white/80">{train.trainNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80">Duration: {calculateDuration(train.departureTime, train.arrivalTime)}</p>
                    <p className="text-white/80">Distance: {train.distance} km</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="text-center">
                    <p className="text-white/80">Departure</p>
                    <p className="text-xl font-bold text-white">{train.departureTime}</p>
                    <p className="text-white/80">{train.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/80">Arrival</p>
                    <p className="text-xl font-bold text-white">{train.arrivalTime}</p>
                    <p className="text-white/80">{train.to}</p>
                  </div>
                </div>

                {train.availability && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {Object.entries(train.availability).map(([cls, seats]) => (
                      <div key={cls} className="text-center p-3 bg-white/10 rounded-lg">
                        <p className="text-white font-medium">{cls}</p>
                        <p className="text-white/80">{seats} seats</p>
                        <p className="text-green-300 font-bold">₹{train.pricing?.[cls] || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => handleBooking(train)}
                    className="glass-card bg-green-500/30 hover:bg-green-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleLiveStatus(train.trainNumber)}
                    className="glass-card bg-blue-500/30 hover:bg-blue-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                  >
                    Live Status
                  </button>
                  <button
                    onClick={() => setSelectedTrain(train)}
                    className="glass-card bg-purple-500/30 hover:bg-purple-500/40 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                  >
                    View Route
                  </button>
                </div>

                {liveStatus && liveStatus.trainNumber === train.trainNumber && (
                  <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                    <h4 className="text-white font-bold mb-2">Live Status</h4>
                    <div className="text-white/90">
                      <p>Current Location: {liveStatus.currentStation}</p>
                      <p>Status: {liveStatus.status}</p>
                      <p>Delay: {liveStatus.delay} minutes</p>
                      <p>Next Station: {liveStatus.nextStation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedTrain && (
          <TrainRouteModal
            train={selectedTrain}
            onClose={() => setSelectedTrain(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TrainPage;
