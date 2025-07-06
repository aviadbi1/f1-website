import React, { useEffect, useState } from 'react';
import { Flag, Timer } from 'lucide-react';
import { raceSchedule } from '../data/f1Data';

const Hero: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Find next race
  const nextRace = raceSchedule.find(race => new Date(race.date) > currentTime);
  
  if (!nextRace) {
    return (
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008250]/20 via-transparent to-[#116dff]/20"></div>
          <div className="racing-lines"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center py-20">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Flag className="w-12 h-12 text-[#008250] animate-bounce" />
                <div className="h-12 w-1 bg-gradient-to-b from-[#008250] to-transparent"></div>
                <Flag className="w-12 h-12 text-[#116dff] animate-bounce delay-200" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[#008250] via-[#116dff] to-[#008250] bg-clip-text text-transparent animate-gradient">
              FORMULA 1
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto">
              Experience the ultimate racing championship with real-time standings,
              live race tracking, and immersive F1 coverage.
            </p>
            
            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-[#008250]/30">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2025 Season Underway</h3>
              <p className="text-gray-300">Follow the championship battle as it unfolds!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const timeUntilRace = new Date(nextRace.date).getTime() - currentTime.getTime();
  const daysUntil = Math.floor(timeUntilRace / (1000 * 60 * 60 * 24));
  const hoursUntil = Math.floor((timeUntilRace % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeUntilRace % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#008250]/20 via-transparent to-[#116dff]/20"></div>
        <div className="racing-lines"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center py-20">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flag className="w-12 h-12 text-[#008250] animate-bounce" />
              <div className="h-12 w-1 bg-gradient-to-b from-[#008250] to-transparent"></div>
              <Flag className="w-12 h-12 text-[#116dff] animate-bounce delay-200" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[#008250] via-[#116dff] to-[#008250] bg-clip-text text-transparent animate-gradient">
            FORMULA 1
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto">
            Experience the ultimate racing championship with real-time standings,
            live race tracking, and immersive F1 coverage.
          </p>
          
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-[#008250]/30">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Timer className="w-6 h-6 text-[#008250]" />
              <h3 className="text-2xl font-bold text-red-400">NEXT RACE</h3>
            </div>
            
            <h4 className="text-xl font-semibold mb-6 text-gray-900">{nextRace.name}</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#008250]/20 rounded-lg p-4 border border-[#008250]/30">
                <div className="text-3xl font-bold text-[#008250]">{daysUntil}</div>
                <div className="text-sm text-gray-600">DAYS</div>
              </div>
              <div className="bg-[#116dff]/20 rounded-lg p-4 border border-[#116dff]/30">
                <div className="text-3xl font-bold text-[#116dff]">{hoursUntil}</div>
                <div className="text-sm text-gray-600">HOURS</div>
              </div>
              <div className="bg-cyan-500/20 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-600">{minutesUntil}</div>
                <div className="text-sm text-gray-600">MINUTES</div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-400 text-center">
            Data powered by <a href="https://api.jolpi.ca/ergast" className="underline">Jolpi Ergast API</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;