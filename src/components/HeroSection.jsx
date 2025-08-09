import React, { useState } from "react";
import {
  CarIcon,
  EllipsisIcon,
  HomeIcon,
  HotelIcon,
  MapPinIcon,
  PlaneIcon,
  TrainFrontIcon,
  Palmtree,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceModal from "./ServiceModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [modalService, setModalService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service) => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalService(null);
  };

  const handleFlightClick = () => handleServiceClick('flights');
  const handleTrainClick = () => handleServiceClick('trains');
  const handleHotelClick = () => handleServiceClick('hotels');
  const handleCarClick = () => handleServiceClick('taxis');
  const handleHomestayClick = () => handleServiceClick('homestays');
  const handleLocationClick = () => handleServiceClick('location');
  const handleMoreClick = () => navigate('/more-options');

  return (
    <section id="hero-section" className="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-56 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-16 sm:mb-24 md:mb-32 lg:mb-40 xl:mb-48">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
            <Palmtree className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 text-green-400 drop-shadow-2xl filter brightness-110" style={{
              filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5)) brightness(1.2) contrast(1.1)',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.8)'
            }} />
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-blue-200 via-white to-green-200 bg-clip-text text-transparent drop-shadow-2xl" 
                style={{ 
                  fontFamily: 'Long Cang, cursive',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
                  filter: 'drop-shadow(0 2px 10px rgba(255, 255, 255, 0.3))'
                }}>
              TripGood
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-glass-light max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-lg">
            Your ultimate travel companion for seamless journeys around the world
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-4 max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleFlightClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30 group-hover:from-blue-400/40 group-hover:to-blue-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-blue-400/40 to-blue-600/40">
                <PlaneIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Flights</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Book flights</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleTrainClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-green-600/30 group-hover:from-green-400/40 group-hover:to-green-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-green-400/40 to-green-600/40">
                <TrainFrontIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Trains</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Railway</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleHotelClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-purple-600/30 group-hover:from-purple-400/40 group-hover:to-purple-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-purple-400/40 to-purple-600/40">
                <HotelIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Hotels</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Stay</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleCarClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 group-hover:from-yellow-400/40 group-hover:to-yellow-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-yellow-400/40 to-yellow-600/40">
                <CarIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Taxis</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Transport</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleHomestayClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 to-red-600/30 group-hover:from-red-400/40 group-hover:to-red-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-red-400/40 to-red-600/40">
                <HomeIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Homestays</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Local</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleLocationClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-indigo-600/30 group-hover:from-indigo-400/40 group-hover:to-indigo-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-indigo-400/40 to-indigo-600/40">
                <MapPinIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">Location</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Explore</p>
            </div>
          </div>

          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]" onClick={handleMoreClick}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/30 to-gray-600/30 group-hover:from-gray-400/40 group-hover:to-gray-600/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="glass-container w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-gray-400/40 to-gray-600/40">
                <EllipsisIcon className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 drop-shadow-lg" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg">More</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block">Services</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <button className="glass-container px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-glass-white font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02] mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          Start Planning
        </button>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        service={modalService} 
      />
    </section>
  );
};

export default HeroSection;
