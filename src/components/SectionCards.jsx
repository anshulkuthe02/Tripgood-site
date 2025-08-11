import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionCards = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([
    { id: 1, name: "Day 1", tasks: ["Visit beach", "Explore local market"] },
    { id: 2, name: "Day 2", tasks: ["Adventure park", "Try local snacks"] }
  ]);

  const addDay = () => {
    const newId = days.length + 1;
    setDays([...days, { id: newId, name: `Day ${newId}`, tasks: [] }]);
  };

  const addTask = (dayId, task) => {
    if (!task) return;
    setDays(days.map(day =>
      day.id === dayId ? { ...day, tasks: [...day.tasks, task] } : day
    ));
  };

  const deleteTask = (dayId, taskIndex) => {
    setDays(days.map(day =>
      day.id === dayId
        ? { ...day, tasks: day.tasks.filter((_, i) => i !== taskIndex) }
        : day
    ));
  };

  return (
    <div className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl sm:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Start with a Budget */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-28">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-glass-white text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 font-['Long_Cang']">Start with a Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            <div className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">💰</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-glass-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">Choose Budget</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light leading-relaxed">Set your total budget, number of people, and trip days.</p>
            </div>
            <div className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12">🏨</div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-glass-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">Select Stay Type</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light leading-relaxed">Pick from homestays, hostels, hotels, or luxury resorts.</p>
            </div>
            <div className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12">🌍</div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-glass-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">Explore Destinations</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light leading-relaxed">View places nearby based on distance, rating, and budget.</p>
            </div>
          </div>
        </section>

        {/* Editable Trip Scheduler */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-28">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-glass-white text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 font-['Long_Cang']">Your Trip Scheduler</h2>
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16">
            <button 
              className="glass-card px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 text-glass-white hover:bg-white/30 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
              onClick={addDay}
            >
              ➕ Add More Day
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {days.map((day) => (
              <div key={day.id} className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 group hover:scale-[1.02] transition-all duration-500">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-glass-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10">{day.name}</h3>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10">
                  {day.tasks.map((task, i) => (
                    <li key={i} className="flex items-center justify-between bg-white/10 rounded-lg p-2 sm:p-3 md:p-4 lg:p-4 xl:p-5">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light">{task}</span>
                      <button 
                        onClick={() => deleteTask(day.id, i)}
                        className="text-red-400 hover:text-red-300 ml-2 sm:ml-3 md:ml-4 lg:ml-4 xl:ml-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
                <AddTaskInput onAdd={(task) => addTask(day.id, task)} />
              </div>
            ))}
          </div>
        </section>

        {/* Travel Section */}
        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-glass-white text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 font-['Long_Cang']">How You'll Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            <div 
              onClick={() => navigate('/bike-rentals')} 
              className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-center group cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">🚲</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-glass-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">Bike Rentals</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light leading-relaxed">Local vendors with ratings & pricing.</p>
            </div>
            <div 
              onClick={() => navigate('/cab-rentals')} 
              className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-center group cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">🚖</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-glass-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">Cab Options</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-glass-light leading-relaxed">Affordable to premium rides with live estimates.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AddTaskInput = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4">
      <input
        type="text"
        className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 xl:px-5 xl:py-4 bg-white/20 border border-white/30 rounded-lg md:rounded-xl text-glass-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
        placeholder="Add a place/activity"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button 
        onClick={handleAdd}
        className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 xl:px-5 xl:py-4 glass-container text-glass-white hover:bg-white/30 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl rounded-lg md:rounded-xl"
      >
        ➕
      </button>
    </div>
  );
};

export default SectionCards;
