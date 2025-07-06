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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-[#008250] bg-clip-text text-transparent">
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
                    ? 'bg-[#008250]/20 border border-[#008250]/50 text-[#008250]'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white/80 backdrop-blur-lg">
            <thead className="bg-[#F8EEE1] text-xs font-semibold text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Pos</th>
                <th scope="col" className="px-4 py-3 text-left">Driver</th>
                <th scope="col" className="px-4 py-3 text-left">Team</th>
                <th scope="col" className="px-4 py-3 text-right">Pts</th>
                <th scope="col" className="px-4 py-3 text-right">Wins</th>
                <th scope="col" className="px-4 py-3 text-right">Podiums</th>
                <th scope="col" className="px-4 py-3 text-right">Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-900">
              {sortedDrivers.map((driver, index) => {
                const change = getPositionChange(driver);
                const ChangeIcon = change.icon;
                return (
                  <tr key={driver.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                          {driver.thumbnail ? (
                            <img src={driver.thumbnail} alt={driver.name} className="w-full h-full object-cover" />
                          ) : driver.teamLogo ? (
                            <img src={driver.teamLogo} alt={driver.team} className="w-full h-full object-contain" />
                          ) : (
                            <div className="text-sm font-bold text-gray-400">
                              {driver.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                          )}
                        </div>
                        <span className="font-medium">{driver.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: driver.teamColor }}>
                      {driver.team}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{driver.points}</td>
                    <td className="px-4 py-3 text-right">{driver.wins}</td>
                    <td className="px-4 py-3 text-right">{driver.podiums}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <ChangeIcon className={`w-4 h-4 ${change.color}`} />
                        <span className={`${change.color}`}>{change.value}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DriversStandings;