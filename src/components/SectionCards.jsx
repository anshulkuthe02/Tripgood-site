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
    <div className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Start with a Budget */}
        <section className="mb-16 sm:mb-24 md:mb-32 lg:mb-48 xl:mb-64">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-glass-white text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24 xl:mb-40 font-['Long_Cang']">Start with a Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-16 xl:gap-24">
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-20">💰</div>
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-glass-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-16">Choose Budget</h3>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-glass-light leading-relaxed">Set your total budget, number of people, and trip days.</p>
            </div>
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-20">🏨</div>
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-glass-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-16">Select Stay Type</h3>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-glass-light leading-relaxed">Pick from homestays, hostels, hotels, or luxury resorts.</p>
            </div>
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 text-center group hover:scale-[1.02] transition-all duration-500">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-20">🌍</div>
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-glass-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-16">Explore Destinations</h3>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-glass-light leading-relaxed">View places nearby based on distance, rating, and budget.</p>
            </div>
          </div>
        </section>

        {/* Editable Trip Scheduler */}
        <section className="mb-64">
          <h2 className="text-4xl font-bold text-glass-white text-center mb-32 font-['Long_Cang']">Your Trip Scheduler</h2>
          <div className="text-center mb-32">
            <button 
              className="glass-card px-12 py-6 text-glass-white hover:bg-white/30 transition-all duration-300 font-medium text-lg"
              onClick={addDay}
            >
              ➕ Add More Day
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-32">
            {days.map((day) => (
              <div key={day.id} className="glass-card p-20 group hover:scale-[1.02] transition-all duration-500">
                <h3 className="text-2xl font-bold text-glass-white mb-20">{day.name}</h3>
                <ul className="space-y-8 mb-20">
                  {day.tasks.map((task, i) => (
                    <li key={i} className="flex items-center justify-between bg-white/10 rounded-lg p-6">
                      <span className="text-lg text-glass-light">{task}</span>
                      <button 
                        onClick={() => deleteTask(day.id, i)}
                        className="text-red-400 hover:text-red-300 ml-6 text-lg"
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
          <h2 className="text-4xl font-bold text-glass-white text-center mb-40 font-['Long_Cang']">How You'll Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
            <div 
              onClick={() => navigate('/bike-rentals')} 
              className="glass-card p-24 text-center group cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <div className="text-6xl mb-20">🚲</div>
              <h3 className="text-2xl font-bold text-glass-white mb-16">Bike Rentals</h3>
              <p className="text-lg text-glass-light leading-relaxed">Local vendors with ratings & pricing.</p>
            </div>
            <div 
              onClick={() => navigate('/cab-rentals')} 
              className="glass-card p-24 text-center group cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <div className="text-6xl mb-20">🚖</div>
              <h3 className="text-2xl font-bold text-glass-white mb-16">Cab Options</h3>
              <p className="text-lg text-glass-light leading-relaxed">Affordable to premium rides with live estimates.</p>
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
    <div className="flex gap-4">
      <input
        type="text"
        className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-glass-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
        placeholder="Add a place/activity"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button 
        onClick={handleAdd}
        className="px-6 py-4 glass-container text-glass-white hover:bg-white/30 transition-all duration-300 text-xl rounded-xl"
      >
        ➕
      </button>
    </div>
  );
};

export default SectionCards;
