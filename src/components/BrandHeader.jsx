import { TreePalm } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../App.css'; // You must create this

const BrandHeader = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const shouldShow = rect.bottom <= 0;
        
        if (shouldShow !== showBanner) {
          setIsAnimating(true);
          // Delay state change slightly for smoother animation
          setTimeout(() => {
            setShowBanner(shouldShow);
            setTimeout(() => setIsAnimating(false), 800); // Animation duration
          }, 50);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [showBanner]);

  // Create brand content component for reuse
  const BrandContent = () => (
    <div className="flex items-center mx-8 sm:mx-12 md:mx-16 lg:mx-20 xl:mx-24 whitespace-nowrap hardware-accelerated">
      <TreePalm className="text-green-600 mr-4 sm:mr-6 md:mr-8 lg:mr-12 drop-shadow-lg transition-all duration-300 ease-out" 
               size={20}
               style={{
                 filter: 'drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3))',
                 color: '#059669',
                 transform: showBanner ? 'scale(1)' : 'scale(0.9)'
               }} />
      <span className="text-gray-800 font-bold text-lg sm:text-xl md:text-xl lg:text-2xl mr-6 sm:mr-10 md:mr-14 lg:mr-20 drop-shadow-sm transition-all duration-500 ease-out" 
            style={{ 
              fontFamily: 'Long Cang, cursive',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: showBanner ? 'translateY(0)' : 'translateY(-2px)',
              opacity: showBanner ? 1 : 0.9
            }}>
        TripGood
      </span>
    </div>
  );

  // Generate infinite content using recursion concept
  const generateInfiniteContent = () => {
    const baseArray = Array(100).fill(null); // Base array of 100 items
    return baseArray.map((_, index) => <BrandContent key={`brand-${index}`} />);
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b-2 border-gray-300 shadow-2xl brand-header-transition hardware-accelerated ${
        showBanner 
          ? 'transform translate-y-0 opacity-100 scale-y-100 visible' 
          : 'transform -translate-y-full opacity-0 scale-y-95 invisible'
      }`}
      style={{ 
        borderRadius: 0,
        backdropFilter: showBanner ? 'blur(10px)' : 'blur(5px)',
        boxShadow: showBanner 
          ? '0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
          : '0 2px 10px rgba(0, 0, 0, 0.05)',
        transform: showBanner 
          ? 'translateY(0) scale(1)' 
          : 'translateY(-100%) scale(0.98)',
        transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.6s ease-in-out, visibility 0.6s ease-in-out, backdrop-filter 0.4s ease-out',
        willChange: 'transform, opacity, backdrop-filter'
      }}
    >
      <div className={`relative py-2 sm:py-3 md:py-4 lg:py-5 overflow-hidden transition-all duration-700 ease-out ${
        showBanner ? 'animate-fade-in-up' : 'animate-fade-out-down'
      }`}>
        <div className={`flex items-center animate-scroll-mobile sm:animate-scroll-tablet md:animate-scroll-laptop lg:animate-scroll-desktop transition-all duration-500 hardware-accelerated ${
          isAnimating ? 'blur-[1px]' : 'blur-0'
        }`}>
          {/* First set of infinite content */}
          {generateInfiniteContent()}
          {/* Duplicate set for seamless loop */}
          {generateInfiniteContent()}
        </div>
      </div>
    </div>
  );
};

export default BrandHeader;
