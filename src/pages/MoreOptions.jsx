// src/pages/MoreOptions.jsx
import React from "react";
import {
  ShieldAlertIcon,
  ClipboardListIcon,
  PartyPopperIcon,
  DollarSignIcon,
  CloudSunIcon,
  LanguagesIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const options = [
  {
    label: "Emergency & Safety",
    icon: <ShieldAlertIcon size={32} className="animated-icon" />, 
    description: "🚨 Nearby hospitals, police stations, women's safety services.",
    route: "/emergency",
    bgImage: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-red-500/30 to-red-700/30"
  },
  {
    label: "Travel Checklist / Essentials",
    icon: <ClipboardListIcon size={32} className="animated-icon" />, 
    description: "🧳 Smart packing suggestions or travel readiness check.",
    route: "/checklist",
    bgImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-blue-500/30 to-blue-700/30"
  },
  {
    label: "Local Events & Festivals",
    icon: <PartyPopperIcon size={32} className="animated-icon" />, 
    description: "🎉 Cultural festivals, local fairs, or events happening soon.",
    bgImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-purple-500/30 to-purple-700/30"
  },
  {
    label: "Currency Converter",
    icon: <DollarSignIcon size={32} className="animated-icon" />, 
    description: "💱 Useful for international travelers to check live rates.",
    route: "/currency",
    bgImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-green-500/30 to-green-700/30"
  },
  {
    label: "Weather Forecast",
    icon: <CloudSunIcon size={32} className="animated-icon" />, 
    description: "☀️🌧️ Real-time weather updates of your travel destination.",
    route: "/weather",
    bgImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-orange-500/30 to-yellow-700/30"
  },
  {
    label: "Translator / Language Tips",
    icon: <LanguagesIcon size={32} className="animated-icon" />, 
    description: "🈶 Quick access to common phrases in local languages.",
    route: "/translator",
    bgImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gradient: "from-indigo-500/30 to-indigo-700/30"
  }
];

const MoreOptions = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route) navigate(route);
  };

  return (
    <div className="tripgood-bg min-h-screen">
      <div className="glass-container">
        <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Long_Cang']">
          Explore More Options
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {options.map((opt, idx) => (
            <div 
              className="relative glass-card p-3 sm:p-4 md:p-6 cursor-pointer group hover:scale-[1.02] transform transition-all duration-300 hover:shadow-lg overflow-hidden min-h-[140px] sm:min-h-[160px] md:min-h-[180px]" 
              key={idx} 
              onClick={() => handleClick(opt.route)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-25 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('${opt.bgImage}')`
                }}
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} group-hover:opacity-70 transition-all duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-white mb-2 sm:mb-3 md:mb-4 group-hover:scale-[1.05] transition-transform duration-300 flex justify-center sm:justify-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {React.cloneElement(opt.icon, { 
                      size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32,
                      className: "text-white drop-shadow-lg"
                    })}
                  </div>
                </div>
                <h4 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-lg text-center sm:text-left">{opt.label}</h4>
                <p className="text-white/90 text-xs sm:text-sm md:text-sm leading-relaxed drop-shadow-md text-center sm:text-left hidden sm:block">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreOptions;
