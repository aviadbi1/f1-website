import React, { useState, useEffect } from 'react';
import { Radio, Clock, Flag, Zap, AlertCircle } from 'lucide-react';
import { raceSchedule } from '../data/f1Data';

const LiveTracker: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if there's a race happening now (within 3 hours of race time)
  const isRaceActive = () => {
    const now = currentTime.getTime();
    return raceSchedule.some(race => {
      const raceTime = new Date(race.date).getTime();
      const timeDiff = Math.abs(now - raceTime);
      return timeDiff <= 3 * 60 * 60 * 1000; // 3 hours
    });
  };

  const getCurrentRace = () => {
    const now = currentTime.getTime();
    return raceSchedule.find(race => {
      const raceTime = new Date(race.date).getTime();
      const timeDiff = Math.abs(now - raceTime);
      return timeDiff <= 3 * 60 * 60 * 1000; // 3 hours
    });
  };

  const raceActive = isRaceActive();
  const currentRace = getCurrentRace();

  if (!raceActive) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Radio className="w-8 h-8 text-gray-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">
                LIVE RACE TRACKER
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-12 border border-gray-700/50 text-center">
              <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No Live Race Currently</h3>
              <p className="text-gray-400 mb-6">
                The live tracker is only available during race weekends when there's an active session.
              </p>
              <div className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600/50 rounded-full px-6 py-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 font-semibold">OFFLINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Simulated live data for when race is active
  const [currentLap, setCurrentLap] = useState(42);
  const [totalLaps] = useState(71);
  const [raceTime, setRaceTime] = useState('1:23:45');

  const [livePositions] = useState([
    { position: 1, driver: 'Max Verstappen', team: 'Red Bull', gap: 'Leader', lastLap: '1:20.543', teamColor: '#1E40AF' },
    { position: 2, driver: 'Charles Leclerc', team: 'Ferrari', gap: '+3.2s', lastLap: '1:20.891', teamColor: '#DC2626' },
    { position: 3, driver: 'Lando Norris', team: 'McLaren', gap: '+8.7s', lastLap: '1:21.234', teamColor: '#EA580C' },
    { position: 4, driver: 'George Russell', team: 'Mercedes', gap: '+12.3s', lastLap: '1:21.456', teamColor: '#00D4AA' },
    { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', gap: '+15.8s', lastLap: '1:21.678', teamColor: '#DC2626' },
    { position: 6, driver: 'Lewis Hamilton', team: 'Mercedes', gap: '+18.9s', lastLap: '1:21.789', teamColor: '#00D4AA' },
    { position: 7, driver: 'Oscar Piastri', team: 'McLaren', gap: '+24.1s', lastLap: '1:22.012', teamColor: '#EA580C' },
    { position: 8, driver: 'Sergio Perez', team: 'Red Bull', gap: '+29.5s', lastLap: '1:22.345', teamColor: '#1E40AF' },
  ]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Radio className="w-8 h-8 text-red-500 animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              LIVE RACE TRACKER
            </h2>
          </div>
          
          <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/50 rounded-full px-6 py-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-semibold">LIVE - {currentRace?.name}</span>
          </div>
        </div>

        {/* Race Status Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Flag className="w-5 h-5 text-cyan-500" />
                  <span className="text-gray-400">Current Lap</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {currentLap} / {totalLaps}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-gray-400">Race Time</span>
                </div>
                <div className="text-2xl font-bold text-white">{raceTime}</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-400">Fastest Lap</span>
                </div>
                <div className="text-2xl font-bold text-white">1:20.543</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Radio className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-400">DRS Zone</span>
                </div>
                <div className="text-2xl font-bold text-green-400">ACTIVE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Positions */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">LIVE POSITIONS</h3>
          
          <div className="space-y-3">
            {livePositions.map((driver) => (
              <div
                key={driver.position}
                className="group bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                        driver.position === 1 ? 'bg-yellow-500 text-black' :
                        driver.position === 2 ? 'bg-gray-300 text-black' :
                        driver.position === 3 ? 'bg-orange-600 text-white' :
                        'bg-gray-700 text-white'
                      }`}
                    >
                      {driver.position}
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white">{driver.driver}</h4>
                      <p className="text-sm text-gray-400">{driver.team}</p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-gray-400 text-sm">Gap</span>
                      <div className="font-bold text-white">{driver.gap}</div>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 text-sm">Last Lap</span>
                      <div className="font-bold text-cyan-400">{driver.lastLap}</div>
                    </div>
                    
                    <div className="hidden md:block">
                      <span className="text-gray-400 text-sm">Status</span>
                      <div className="font-bold text-green-400">Racing</div>
                    </div>
                  </div>

                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: driver.teamColor }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Race Progress */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Race Progress</span>
              <span>{Math.round((currentLap / totalLaps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
                style={{ width: `${(currentLap / totalLaps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Lap 1</span>
              <span>Lap {totalLaps}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTracker;