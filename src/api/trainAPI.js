// src/api/trainAPI.js
import combinedTrainData from '../data/combined_train_schedule.json';
import trainData from '../data/trains.json';

export const searchTrains = async (from, to, date, classType = 'GN') => {
  try {
    if (!from || !to) {
      throw new Error('From and To stations are required');
    }

    // Search in combined schedule data
    const results = combinedTrainData.filter((train) => {
      const stationCodes = train.schedule.map((s) => s.station_code);
      const fromIndex = stationCodes.indexOf(from.toUpperCase());
      const toIndex = stationCodes.indexOf(to.toUpperCase());
      return fromIndex > -1 && toIndex > fromIndex;
    });

    // Enhance results with additional data
    const enhancedResults = results.map(train => {
      const fromStation = train.schedule.find(s => s.station_code === from.toUpperCase());
      const toStation = train.schedule.find(s => s.station_code === to.toUpperCase());
      
      const duration = calculateDuration(fromStation.departure_time, toStation.arrival_time);
      const distance = calculateDistance(fromStation, toStation);
      const fare = calculateFare(distance, classType);

      return {
        ...train,
        searchDate: date,
        classType,
        fromStation,
        toStation,
        duration,
        distance,
        fare,
        availability: generateSeatAvailability(classType),
        features: getTrainFeatures(train.train_type || 'EXPRESS'),
        status: 'ON TIME' // Mock status
      };
    });

    return enhancedResults;

  } catch (error) {
    console.error('Train search error:', error);
    throw error;
  }
};

export const getTrainDetails = (trainNumber) => {
  const train = combinedTrainData.find(t => t.train_number === trainNumber);
  if (!train) return null;

  return {
    ...train,
    coaches: generateCoachLayout(),
    amenities: getTrainAmenities(),
    pantryAvailable: Math.random() > 0.3,
    wifiAvailable: Math.random() > 0.5
  };
};

export const bookTrain = async (trainNumber, from, to, passengers, classType, date) => {
  // Simulate booking API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const pnr = `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
      resolve({
        pnr,
        trainNumber,
        from,
        to,
        passengers,
        classType,
        date,
        status: 'CONFIRMED',
        seatNumbers: generateSeatNumbers(passengers.length, classType),
        totalFare: calculateTotalFare(from, to, passengers.length, classType),
        bookingTime: new Date().toISOString()
      });
    }, 2000);
  });
};

export const checkPNRStatus = async (pnr) => {
  // Simulate PNR status check
  return new Promise((resolve) => {
    setTimeout(() => {
      const statuses = ['CONFIRMED', 'RAC', 'WAITING', 'CHART PREPARED'];
      resolve({
        pnr,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        currentStatus: 'ON TIME',
        passengers: generatePassengerStatus(),
        expectedArrival: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
      });
    }, 1000);
  });
};

export const getStationSuggestions = (query) => {
  const stations = combinedTrainData.reduce((acc, train) => {
    train.schedule.forEach(station => {
      if (!acc.find(s => s.code === station.station_code)) {
        acc.push({
          code: station.station_code,
          name: station.station_name || station.station_code
        });
      }
    });
    return acc;
  }, []);

  return stations.filter(station =>
    station.code.toLowerCase().includes(query.toLowerCase()) ||
    station.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);
};

export const getLiveTrainStatus = async (trainNumber) => {
  // Simulate live tracking
  return new Promise((resolve) => {
    setTimeout(() => {
      const delays = [0, 5, 10, 15, 20, 30, 45, 60];
      const delay = delays[Math.floor(Math.random() * delays.length)];
      
      resolve({
        trainNumber,
        currentStation: 'JBP', // Mock current station
        nextStation: 'ET',
        delay: delay,
        speed: Math.floor(Math.random() * 60) + 40, // 40-100 km/h
        lastUpdated: new Date().toISOString(),
        expectedArrival: new Date(Date.now() + delay * 60 * 1000).toISOString()
      });
    }, 800);
  });
};

// Helper functions
const calculateDuration = (depTime, arrTime) => {
  if (!depTime || !arrTime) return 'N/A';
  
  const [dh, dm] = depTime.split(":").map(Number);
  const [ah, am] = arrTime.split(":").map(Number);
  let depMin = dh * 60 + dm;
  let arrMin = ah * 60 + am;
  if (arrMin < depMin) arrMin += 1440; // Next day
  const dur = arrMin - depMin;
  return `${Math.floor(dur / 60)}h ${dur % 60}m`;
};

const calculateDistance = (fromStation, toStation) => {
  // Mock distance calculation
  return Math.floor(Math.random() * 800) + 100; // 100-900 km
};

const calculateFare = (distance, classType) => {
  const baseRates = {
    'GN': 0.5,   // General
    'SL': 0.8,   // Sleeper
    '3A': 2.0,   // 3AC
    '2A': 3.0,   // 2AC
    '1A': 5.0    // 1AC
  };
  
  const rate = baseRates[classType] || baseRates['GN'];
  return Math.ceil(distance * rate);
};

const calculateTotalFare = (from, to, passengerCount, classType) => {
  const distance = 500; // Mock distance
  const fare = calculateFare(distance, classType);
  return fare * passengerCount;
};

const generateSeatAvailability = (classType) => {
  const maxSeats = {
    'GN': 100,
    'SL': 72,
    '3A': 64,
    '2A': 48,
    '1A': 24
  };
  
  const total = maxSeats[classType] || 72;
  const available = Math.floor(Math.random() * total);
  
  return {
    available,
    total,
    waitingList: Math.max(0, Math.floor(Math.random() * 20) - 10)
  };
};

const generateCoachLayout = () => {
  return ['S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'A1', 'A2'];
};

const getTrainFeatures = (trainType) => {
  const features = {
    'EXPRESS': ['Pantry Car', 'Reserved Seating', 'WiFi'],
    'SUPERFAST': ['Pantry Car', 'Reserved Seating', 'WiFi', 'Power Outlets'],
    'RAJDHANI': ['Pantry Car', 'AC Coaches', 'WiFi', 'Power Outlets', 'Catering'],
    'SHATABDI': ['Pantry Car', 'AC Coaches', 'WiFi', 'Power Outlets', 'Executive Class']
  };
  
  return features[trainType] || features['EXPRESS'];
};

const getTrainAmenities = () => {
  return [
    'Waiting Room', 'Food Court', 'ATM', 'Medical Facility',
    'Parking', 'WiFi Zone', 'Restrooms', 'Enquiry Counter'
  ];
};

const generateSeatNumbers = (count, classType) => {
  const seats = [];
  for (let i = 0; i < count; i++) {
    const coach = `S${Math.floor(Math.random() * 5) + 1}`;
    const seatNum = Math.floor(Math.random() * 70) + 1;
    seats.push(`${coach}/${seatNum}`);
  }
  return seats;
};

const generatePassengerStatus = () => {
  return [
    { name: 'Passenger 1', status: 'CONFIRMED', seatNo: 'S1/23' },
    { name: 'Passenger 2', status: 'CONFIRMED', seatNo: 'S1/24' }
  ];
};
