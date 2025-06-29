import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { fetchDriverStandings, DriverStanding } from '../api/ergast';

const DriversStandings: React.FC = () => {
  const [sortBy, setSortBy] = useState<'points' | 'wins' | 'podiums'>('points');
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDriverStandings(2025);
        setDrivers(data);
      } catch (err) {
        console.error('Ergast driver standings fetch failed', err);
      }
    };
    fetchData();
  }, []);

  const sortedDrivers = [...drivers].sort((a, b) => {
    switch (sortBy) {
      case 'wins':
        return b.wins - a.wins;
      case 'podiums':
        return b.podiums - a.podiums;
      default:
        return b.points - a.points;
    }
  });

  const getPositionChange = (driver: DriverStanding) => {
    const change = driver.previousPosition - driver.position;
    if (change > 0) return { icon: TrendingUp, color: 'text-green-400', value: `+${change}` };
    if (change < 0) return { icon: TrendingDown, color: 'text-red-400', value: change };
    return { icon: Minus, color: 'text-gray-400', value: '0' };
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
              DRIVERS CHAMPIONSHIP
            </h2>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            {[
              { key: 'points', label: 'Points' },
              { key: 'wins', label: 'Wins' },
              { key: 'podiums', label: 'Podiums' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key as 'points' | 'wins' | 'podiums')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  sortBy === key
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {sortedDrivers.map((driver, index) => {
            const change = getPositionChange(driver);
            const ChangeIcon = change.icon;
            
            return (
              <div
                key={driver.id}
                className="group bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-300 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-600 bg-gray-800 flex items-center justify-center">
                      <div className="text-2xl font-bold text-gray-400">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                        <p className="text-sm" style={{ color: driver.teamColor }}>
                          {driver.team}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ChangeIcon className={`w-4 h-4 ${change.color}`} />
                        <span className={`text-sm ${change.color}`}>{change.value}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Points</span>
                        <div className="text-2xl font-bold text-white">{driver.points}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Wins</span>
                        <div className="text-xl font-semibold text-green-400">{driver.wins}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Podiums</span>
                        <div className="text-xl font-semibold text-yellow-400">{driver.podiums}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Points Behind</span>
                        <div className="text-xl font-semibold text-red-400">
                          {index === 0 ? 'Leader' : `-${sortedDrivers[0].points - driver.points}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Championship Progress</span>
                        <span>{((driver.points / sortedDrivers[0].points) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(driver.points / sortedDrivers[0].points) * 100}%`,
                            background: `linear-gradient(90deg, ${driver.teamColor}, ${driver.teamColor}80)`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DriversStandings;