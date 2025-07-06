import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Flag } from 'lucide-react';
import { fetchRaceSchedule, RaceInfo } from '../api/ergast';

const RaceSchedule: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Jerusalem');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [schedule, setSchedule] = useState<RaceInfo[]>([]);

  const timezones = [
    { value: 'Asia/Jerusalem', label: 'Israel Time (GMT+3)' },
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'Europe/London', label: 'London Time' },
    { value: 'Asia/Tokyo', label: 'Japan Time' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRaceSchedule(2025);
        setSchedule(data);
      } catch (err) {
        console.error('Ergast schedule fetch failed', err);
      }
    };
    fetchData();
  }, []);

  const formatDateTime = (dateString: string, timezone: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
  };

  const getCountdown = (dateString: string) => {
    const raceTime = new Date(dateString).getTime();
    const now = currentTime.getTime();
    const diff = raceTime - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const getRaceStatus = (race: RaceInfo) => {
    const now = currentTime.getTime();
    const raceTime = new Date(race.date).getTime();
    const qualifyingTime = new Date(race.qualifying).getTime();

    if (now > raceTime) return 'completed';
    if (now > qualifyingTime) return 'qualifying-done';
    return 'upcoming';
  };

  return (
    <section className="py-16 bg-[#F8EEE1]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-[#008250]" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#008250] to-[#116dff] bg-clip-text text-transparent">
              2025 RACE CALENDAR
            </h2>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Timezone
            </label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[#008250] focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {schedule.map((race) => {
            const raceDateTime = formatDateTime(race.date, selectedTimezone);
            const qualifyingDateTime = formatDateTime(race.qualifying, selectedTimezone);
            const sprintDateTime = race.sprint ? formatDateTime(race.sprint, selectedTimezone) : null;
            const countdown = getCountdown(race.date);
            const status = getRaceStatus(race);

            return (
              <div
                key={race.id}
                className={`group bg-white/80 backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-[1.02] ${
                  status === 'completed'
                    ? 'border-gray-400/50 opacity-75'
                    : status === 'qualifying-done'
                    ? 'border-yellow-500/50 hover:border-yellow-400/70'
                    : 'border-gray-300 hover:border-[#008250]/50'
                }`}
              >
                <div className="relative mb-4">
                  <img
                    src={race.flag}
                    alt={race.country}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      status === 'completed' 
                        ? 'bg-gray-600 text-gray-200' 
                        : status === 'qualifying-done'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-cyan-500 text-black'
                    }`}>
                      {status === 'completed' ? 'FINISHED' : 
                       status === 'qualifying-done' ? 'QUALIFYING DONE' : 'UPCOMING'}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{race.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{race.location}, {race.country}</span>
                  </div>
                </div>

                {countdown && status === 'upcoming' && (
                  <div className="mb-4 p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <div className="text-center">
                      <div className="text-xs text-cyan-400 mb-1">COUNTDOWN</div>
                      <div className="flex justify-center space-x-2 text-sm font-bold">
                        <span className="text-cyan-300">{countdown.days}d</span>
                        <span className="text-cyan-300">{countdown.hours}h</span>
                        <span className="text-cyan-300">{countdown.minutes}m</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Flag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Qualifying</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-gray-900 font-medium">{qualifyingDateTime.time}</div>
                      <div className="text-gray-400">{qualifyingDateTime.date}</div>
                    </div>
                  </div>

                  {sprintDateTime && (
                    <div className="flex items-center justify-between p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-300">Sprint</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-orange-200 font-medium">{sprintDateTime.time}</div>
                        <div className="text-orange-400">{sprintDateTime.date}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                    <div className="flex items-center space-x-2">
                      <Flag className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-300">Race</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-red-200 font-medium">{raceDateTime.time}</div>
                      <div className="text-red-400">{raceDateTime.date}</div>
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

export default RaceSchedule;