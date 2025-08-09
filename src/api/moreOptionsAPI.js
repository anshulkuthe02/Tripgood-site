// src/api/moreOptionsAPI.js
import currenciesData from '../data/currencies.json';

export const getCurrencyRates = async (baseCurrency = 'INR') => {
  try {
    // Mock currency API - in real app, use exchangerate-api.com or similar
    const rates = currenciesData.reduce((acc, currency) => {
      acc[currency.code] = Math.random() * 100 + 1; // Mock rates
      return acc;
    }, {});

    return {
      base: baseCurrency,
      rates,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Currency API error:', error);
    throw error;
  }
};

export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  
  // Convert to base currency first, then to target currency
  const inBaseCurrency = amount / fromRate;
  const converted = inBaseCurrency * toRate;
  
  return Math.round(converted * 100) / 100;
};

export const getWeatherForecast = async (city = 'Nagpur', days = 5) => {
  try {
    // Mock weather API - in real app, use OpenWeatherMap or similar
    const weather = generateWeatherData(city, days);
    return weather;
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

export const translateText = async (text, targetLanguage = 'hi') => {
  try {
    // Mock translation API - in real app, use Google Translate API
    const translations = {
      'hi': { // Hindi
        'hello': 'नमस्ते',
        'thank you': 'धन्यवाद',
        'please': 'कृपया',
        'excuse me': 'माफ़ करें',
        'how much': 'कितना',
        'where is': 'कहाँ है',
        'help': 'मदद'
      },
      'mr': { // Marathi
        'hello': 'नमस्कार',
        'thank you': 'धन्यवाद',
        'please': 'कृपया',
        'excuse me': 'माफ करा',
        'how much': 'किती',
        'where is': 'कुठे आहे',
        'help': 'मदत'
      },
      'gu': { // Gujarati
        'hello': 'નમસ્તે',
        'thank you': 'આભાર',
        'please': 'કૃપા કરીને',
        'excuse me': 'માફ કરશો',
        'how much': 'કેટલું',
        'where is': 'ક્યાં છે',
        'help': 'મદદ'
      }
    };

    const translatedText = translations[targetLanguage]?.[text.toLowerCase()] || 
                          `[Translated: ${text}]`;

    return {
      originalText: text,
      translatedText,
      targetLanguage,
      confidence: 0.95
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const getCommonPhrases = (language = 'hi') => {
  const phrases = {
    'hi': [ // Hindi
      { phrase: 'नमस्ते', english: 'Hello', pronunciation: 'Namaste' },
      { phrase: 'धन्यवाद', english: 'Thank you', pronunciation: 'Dhanyawad' },
      { phrase: 'कितना पैसा?', english: 'How much money?', pronunciation: 'Kitna paisa?' },
      { phrase: 'मुझे मदद चाहिए', english: 'I need help', pronunciation: 'Mujhe madad chahiye' },
      { phrase: 'यह कहाँ है?', english: 'Where is this?', pronunciation: 'Yah kahan hai?' },
      { phrase: 'माफ़ करें', english: 'Excuse me', pronunciation: 'Maaf karein' }
    ],
    'mr': [ // Marathi
      { phrase: 'नमस्कार', english: 'Hello', pronunciation: 'Namaskar' },
      { phrase: 'धन्यवाद', english: 'Thank you', pronunciation: 'Dhanyawad' },
      { phrase: 'किती पैसे?', english: 'How much money?', pronunciation: 'Kiti paise?' },
      { phrase: 'मला मदत हवी', english: 'I need help', pronunciation: 'Mala madat havi' },
      { phrase: 'हे कुठे आहे?', english: 'Where is this?', pronunciation: 'He kuthe aahe?' },
      { phrase: 'माफ करा', english: 'Excuse me', pronunciation: 'Maaf kara' }
    ]
  };

  return phrases[language] || phrases['hi'];
};

export const getTravelChecklist = (tripType = 'domestic', duration = 'short') => {
  const baselist = [
    'Valid ID/Passport', 'Tickets/Booking confirmations', 'Phone charger',
    'Medicines', 'Clean clothes', 'Toiletries', 'Cash/Cards'
  ];

  const domesticItems = [
    'Voter ID/Aadhaar', 'Travel insurance', 'Local emergency contacts'
  ];

  const internationalItems = [
    'Passport', 'Visa documents', 'Travel insurance', 'Foreign currency',
    'International roaming/SIM', 'Vaccination certificates', 'Embassy contacts'
  ];

  const longTripItems = [
    'Extra shoes', 'Laundry bag', 'Entertainment (books/tablets)',
    'Snacks', 'Travel pillow', 'Umbrella'
  ];

  let checklist = [...baselist];
  
  if (tripType === 'international') {
    checklist = [...checklist, ...internationalItems];
  } else {
    checklist = [...checklist, ...domesticItems];
  }

  if (duration === 'long') {
    checklist = [...checklist, ...longTripItems];
  }

  return checklist.map((item, index) => ({
    id: index,
    item,
    checked: false,
    category: categorizeItem(item),
    priority: Math.random() > 0.3 ? 'high' : 'medium'
  }));
};

export const getLocalEvents = async (city = 'Nagpur', dateRange = 7) => {
  try {
    // Mock events API
    const events = generateLocalEvents(city, dateRange);
    return events;
  } catch (error) {
    console.error('Events API error:', error);
    throw error;
  }
};

// Helper functions
const generateWeatherData = (city, days) => {
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Thunderstorm'];
  const forecast = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      temperature: {
        max: Math.floor(Math.random() * 15) + 25, // 25-40°C
        min: Math.floor(Math.random() * 10) + 15  // 15-25°C
      },
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      precipitation: Math.floor(Math.random() * 100), // 0-100%
      uvIndex: Math.floor(Math.random() * 10) + 1 // 1-10
    });
  }

  return {
    city,
    country: 'India',
    forecast,
    lastUpdated: new Date().toISOString()
  };
};

const generateLocalEvents = (city, days) => {
  const eventTypes = [
    'Cultural Festival', 'Food Festival', 'Music Concert', 'Art Exhibition',
    'Religious Ceremony', 'Sports Event', 'Trade Fair', 'Educational Workshop'
  ];

  const venues = [
    'Chitnavis Centre', 'Dikshabhoomi', 'Zero Mile', 'Ambazari Garden',
    'Futala Lake', 'Dragon Palace Temple', 'Maharaj Bagh', 'Seminary Hills'
  ];

  const events = [];
  
  for (let i = 0; i < Math.min(days * 2, 10); i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * days));
    
    events.push({
      id: `event_${i}`,
      title: `${eventTypes[Math.floor(Math.random() * eventTypes.length)]} ${i + 1}`,
      date: date.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 6}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      venue: venues[Math.floor(Math.random() * venues.length)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ticketPrice: Math.random() > 0.3 ? Math.floor(Math.random() * 500) + 50 : 0,
      category: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      organizer: `${city} Cultural Society`,
      expectedCrowd: Math.floor(Math.random() * 5000) + 100,
      isBookingRequired: Math.random() > 0.4
    });
  }

  return events.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const categorizeItem = (item) => {
  const categories = {
    'Documents': ['ID', 'Passport', 'Visa', 'Tickets', 'insurance', 'Aadhaar'],
    'Electronics': ['charger', 'phone', 'tablet', 'camera'],
    'Clothing': ['clothes', 'shoes'],
    'Health': ['Medicines', 'Toiletries'],
    'Money': ['Cash', 'Cards', 'currency'],
    'Miscellaneous': []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => item.toLowerCase().includes(keyword.toLowerCase()))) {
      return category;
    }
  }
  
  return 'Miscellaneous';
};
