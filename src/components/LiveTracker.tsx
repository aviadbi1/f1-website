import React, { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import { raceSchedule } from '../data/f1Data';

interface GridEntry {
  position: number;
  driver: string;
  team: string;
}

interface ErgastResult {
  grid: string;
  Driver: { givenName: string; familyName: string };
  Constructor?: { name?: string };
}

const LiveTracker: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [grid, setGrid] = useState<GridEntry[]>([]);

  // check if there is a race within 3 hours of now
  const isRaceActive = () => {
    const now = currentTime.getTime();
    return raceSchedule.some((race) => {
      const raceTime = new Date(race.date).getTime();
      return Math.abs(now - raceTime) <= 3 * 60 * 60 * 1000;
    });
  };

  const getCurrentRace = () => {
    const now = currentTime.getTime();
    return raceSchedule.find((race) => {
      const raceTime = new Date(race.date).getTime();
      return Math.abs(now - raceTime) <= 3 * 60 * 60 * 1000;
    });
  };

  const fetchGrid = async () => {
    try {
      const res = await fetch(
        'https://api.jolpi.ca/ergast/f1/current/last/results.json?limit=30'
      );
      const json = await res.json();
      const results =
        json?.MRData?.RaceTable?.Races?.[0]?.Results?.map((r: ErgastResult) => ({
          position: Number(r.grid),
          driver: `${r.Driver.givenName} ${r.Driver.familyName}`,
          team: r.Constructor?.name,
        })) || [];
      const sorted = results
        .filter((r: GridEntry) => r.position > 0)
        .sort((a: GridEntry, b: GridEntry) => a.position - b.position);
      setGrid(sorted);
    } catch (err) {
      console.error('Failed to fetch grid', err);
    }
  };

  useEffect(() => {
    fetchGrid();
    const interval = setInterval(fetchGrid, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const raceActive = isRaceActive();
  const currentRace = getCurrentRace();

  if (!raceActive) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Radio className="w-8 h-8 text-gray-500" />
            <h2 className="text-3xl font-bold text-gray-400">LIVE GRID</h2>
          </div>
          <p className="text-gray-400">Live grid will appear when a race is active.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Radio className="w-8 h-8 text-red-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-red-400">LIVE GRID - {currentRace?.name}</h2>
          </div>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {grid.map((entry) => (
            <div
              key={entry.position}
              className="bg-black/40 backdrop-blur-lg rounded-lg p-3 border border-gray-700/50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white text-sm font-bold">
                  {entry.position}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{entry.driver}</div>
                  <div className="text-xs text-gray-400">{entry.team}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveTracker;
