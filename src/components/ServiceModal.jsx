import React from 'react';
import { X, PlaneIcon, TrainFrontIcon, HotelIcon, CarIcon, HomeIcon, MapPinIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceModal = ({ isOpen, onClose, service }) => {
  const navigate = useNavigate();
  
  if (!isOpen || !service) return null;

  const serviceContent = {
    flights: {
      title: 'Flight Booking',
      description: 'Book domestic and international flights with the best deals',
      features: [
        'Compare prices from multiple airlines',
        'Flexible date search',
        'Real-time flight status',
        'Mobile boarding passes',
        'Seat selection',
        '24/7 customer support'
      ],
      icon: PlaneIcon,
      color: 'from-blue-400 to-blue-600'
    },
    trains: {
      title: 'Train Reservations',
      description: 'Easy train booking with live schedules and seat availability',
      features: [
        'Real-time seat availability',
        'Route planning',
        'Digital tickets',
        'Platform information',
        'Meal preferences',
        'Cancellation & refunds'
      ],
      icon: TrainFrontIcon,
      color: 'from-green-400 to-green-600'
    },
    hotels: {
      title: 'Hotel Bookings',
      description: 'Discover and book the perfect accommodation for your stay',
      features: [
        'Verified reviews & ratings',
        'Photo galleries',
        'Amenities filter',
        'Free cancellation',
        'Best price guarantee',
        'Loyalty rewards'
      ],
      icon: HotelIcon,
      color: 'from-purple-400 to-purple-600'
    },
    taxis: {
      title: 'Taxi & Cab Services',
      description: 'Reliable transportation with professional drivers',
      features: [
        'Real-time GPS tracking',
        'Multiple vehicle options',
        'Upfront pricing',
        'Safety features',
        'Cashless payments',
        'Driver ratings'
      ],
      icon: CarIcon,
      color: 'from-yellow-400 to-yellow-600'
    },
    homestays: {
      title: 'Homestay Experiences',
      description: 'Authentic local experiences with verified hosts',
      features: [
        'Local host interactions',
        'Authentic experiences',
        'Home-cooked meals',
        'Cultural immersion',
        'Verified hosts',
        'Personalized recommendations'
      ],
      icon: HomeIcon,
      color: 'from-red-400 to-red-600'
    },
    location: {
      title: 'Location Services',
      description: 'Explore destinations with our comprehensive location guide',
      features: [
        'Interactive maps',
        'Popular attractions',
        'Local recommendations',
        'Weather updates',
        'Transportation info',
        'Cultural insights'
      ],
      icon: MapPinIcon,
      color: 'from-indigo-400 to-indigo-600'
    }
  };

  const currentService = serviceContent[service];
  const IconComponent = currentService.icon;

  const handleBookNow = () => {
    onClose();
    const routeMap = {
      flights: '/flights',
      trains: '/trains',
      hotels: '/hotels',
      taxis: '/taxis',
      homestays: '/hotels', // Use hotels page for homestays
      location: '/location'
    };
    navigate(routeMap[service] || '/');
  };

  const handleLearnMore = () => {
    handleBookNow(); // For now, both buttons do the same thing
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 glass-container p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 glass-card hover:bg-white/20 transition-colors duration-200 rounded-full"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r ${currentService.color} shadow-2xl`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 font-['Long_Cang']">
            {currentService.title}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {currentService.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Key Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentService.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 glass-card p-3 rounded-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex-shrink-0" />
                <span className="text-white/90 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleLearnMore}
            className="glass-card px-6 py-3 text-white font-semibold hover:bg-white/20 transition-colors duration-200 rounded-lg"
          >
            Learn More
          </button>
          <button 
            onClick={handleBookNow}
            className={`px-6 py-3 bg-gradient-to-r ${currentService.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
