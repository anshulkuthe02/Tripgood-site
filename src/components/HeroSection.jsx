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
import ServiceModal from "./ServiceModal";

const HeroSection = ({ user, signOut, navigate, language, changeLanguage }) => {
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
    <section id="hero-section" className="relative py-8 xs:py-10 sm:py-16 md:py-28 lg:py-36 xl:py-48 px-2 xs:px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      {/* Top Controls - mobile friendly */}
      <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-6 sm:right-6 z-50 flex items-center space-x-1 xs:space-x-2 sm:space-x-4 top-controls-mobile">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border-0 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm text-white font-medium shadow-lg hover:bg-white/30 transition-all duration-200 text-xs xs:text-sm sm:text-base language-select-mobile"
          style={{
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <option value="en" className="text-gray-800">English</option>
          <option value="fr" className="text-gray-800">Français</option>
          <option value="es" className="text-gray-800">Español</option>
        </select>
        {user ? (
          <button
            onClick={signOut}
            className="bg-red-500/80 hover:bg-red-600/90 text-white px-1 py-1 xs:px-2 xs:py-1.5 sm:px-4 sm:py-2 rounded-md xs:rounded-lg transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20 text-xs xs:text-sm sm:text-base auth-button-mobile"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-500/80 hover:bg-blue-600/90 text-white px-1 py-1 xs:px-2 xs:py-1.5 sm:px-4 sm:py-2 rounded-md xs:rounded-lg transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20 text-xs xs:text-sm sm:text-base auth-button-mobile"
          >
            Login
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-28 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 hero-title-container">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 px-2 sm:px-4 py-2 sm:py-4 hero-title-flex">
            <Palmtree className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 text-green-400 drop-shadow-2xl filter brightness-110 palm-icon-mobile" style={{
              filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5)) brightness(1.2) contrast(1.1)',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.8)'
            }} />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-blue-200 via-white to-green-200 bg-clip-text text-transparent drop-shadow-2xl tripgood-title-mobile" 
                style={{ 
                  fontFamily: 'Long Cang, cursive',
                  textShadow: '0 4px 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
                  filter: 'drop-shadow(0 2px 10px rgba(255, 255, 255, 0.3))'
                }}>
              TripGood
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-glass-light max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-3 sm:px-4 drop-shadow-lg hero-subtitle-mobile">
            Your ultimate travel companion for seamless journeys around the world
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-4 max-w-5xl sm:max-w-6xl xl:max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 px-2 service-grid-mobile">
          <div className="relative glass-card p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center group cursor-pointer hover:scale-[1.05] transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px] service-card-mobile" onClick={handleFlightClick}>
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
              <div className="glass-container w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-blue-400/40 to-blue-600/40 service-icon-container-mobile">
                <PlaneIcon className="text-white w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 drop-shadow-lg service-icon-mobile" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl block mb-1 drop-shadow-lg service-label-mobile">Flights</span>
              <p className="text-white/90 text-xs md:text-sm opacity-90 drop-shadow-md hidden md:block service-description-mobile">Book flights</p>
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
