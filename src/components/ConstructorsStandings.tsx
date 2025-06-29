import React, { useEffect, useState } from 'react';
import { Users, Trophy } from 'lucide-react';
import { constructorsData as fallbackConstructors } from '../data/f1Data';
import { fetchConstructorStandings, ConstructorStanding } from '../api/openf1';

const ConstructorsStandings: React.FC = () => {
  const [constructors, setConstructors] = useState<ConstructorStanding[]>(
    fallbackConstructors as unknown as ConstructorStanding[]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchConstructorStandings(2025);
        if (data.length > 0) setConstructors(data);
      } catch (err) {
        console.error('OpenF1 constructor standings fetch failed', err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              CONSTRUCTORS CHAMPIONSHIP
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {constructors.map((constructor, index) => (
            <div
              key={constructor.id}
              className="group bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold ${
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
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-8 rounded overflow-hidden border border-gray-600">
                      <img
                        src={constructor.logo}
                        alt={constructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{constructor.name}</h3>
                      <p className="text-sm text-gray-400">{constructor.country}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm">Points</span>
                      <div className="text-2xl font-bold text-white">{constructor.points}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Wins</span>
                      <div className="text-xl font-semibold text-green-400">{constructor.wins}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Podiums</span>
                      <div className="text-xl font-semibold text-yellow-400">{constructor.podiums}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Drivers</h4>
                    <div className="flex space-x-2">
                      {constructor.drivers.map((driver, driverIndex) => (
                        <div key={driverIndex} className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-1">
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600 bg-gray-700 flex items-center justify-center">
                            <div className="text-xs font-bold text-gray-300">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-white">{driver.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Championship Progress</span>
                      <span>{((constructor.points / constructors[0].points) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(constructor.points / constructors[0].points) * 100}%`,
                          background: `linear-gradient(90deg, ${constructor.color}, ${constructor.color}80)`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructorsStandings;