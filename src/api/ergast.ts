export const ERGAST_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export interface RaceInfo {
  id: number;
  name: string;
  location: string;
  country: string;
  date: string;
  qualifying?: string;
  sprint?: string;
  flag?: string;
}

export interface DriverStanding {
  id: number;
  name: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  position: number;
  previousPosition: number;
  teamColor: string;
}

export interface ConstructorStanding {
  id: number;
  name: string;
  country: string;
  points: number;
  wins: number;
  podiums: number;
  position: number;
  previousPosition: number;
  color: string;
  logo?: string;
  drivers?: { name: string }[];
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  Bahrain: 'BH',
  'Saudi Arabia': 'SA',
  Australia: 'AU',
  Japan: 'JP',
  China: 'CN',
  USA: 'US',
  Italy: 'IT',
  Monaco: 'MC',
  Canada: 'CA',
  Spain: 'ES',
  Austria: 'AT',
  France: 'FR',
  Britain: 'GB',
  Hungary: 'HU',
  Belgium: 'BE',
  Netherlands: 'NL',
  Singapore: 'SG',
  Qatar: 'QA',
  Mexico: 'MX',
  Brazil: 'BR',
  'United States': 'US',
  'United Arab Emirates': 'AE'
};

const TEAM_COLOR_MAP: Record<string, string> = {
  'Red Bull': '#1E40AF',
  'Red Bull Racing': '#1E40AF',
  Ferrari: '#DC2626',
  McLaren: '#EA580C',
  Mercedes: '#00D4AA',
  'Aston Martin': '#00594F',
  Alpine: '#0066CC'
};

interface ErgastRace {
  raceName: string;
  date: string;
  time?: string;
  Circuit?: {
    Location?: {
      locality?: string;
      country?: string;
    };
  };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
}

interface ErgastDriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: { givenName: string; familyName: string };
  Constructors: { name: string }[];
  podiums?: string;
}

interface ErgastConstructorStanding {
  position: string;
  points: string;
  wins: string;
  Constructor: { name: string; nationality?: string };
  podiums?: string;
}

function getFlagUrl(country: string | undefined): string | undefined {
  if (!country) return undefined;
  const code = COUNTRY_CODE_MAP[country] || COUNTRY_CODE_MAP[country.replace(' Grand Prix', '')];
  return code ? `https://flagsapi.com/${code}/flat/64.png` : undefined;
}

export async function fetchRaceSchedule(year: number): Promise<RaceInfo[]> {
  const res = await fetch(`${ERGAST_BASE_URL}/${year}.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch Ergast schedule');
  }
  const json = await res.json();
  const races: ErgastRace[] = json?.MRData?.RaceTable?.Races || [];
  return races.map((race, idx) => ({
    id: idx + 1,
    name: race.raceName,
    location: race.Circuit?.Location?.locality || '',
    country: race.Circuit?.Location?.country || '',
    date: race.date && race.time ? `${race.date}T${race.time}` : race.date,
    qualifying: race.Qualifying ? `${race.Qualifying.date}T${race.Qualifying.time}` : undefined,
    sprint: race.Sprint ? `${race.Sprint.date}T${race.Sprint.time}` : undefined,
    flag: getFlagUrl(race.Circuit?.Location?.country)
  }));
}

export async function fetchDriverStandings(year: number): Promise<DriverStanding[]> {
  const res = await fetch(`${ERGAST_BASE_URL}/${year}/driverStandings.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch Ergast driver standings');
  }
  const json = await res.json();
  const standings: ErgastDriverStanding[] = json?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
  return standings.map((d, idx) => {
    const teamName = d.Constructors?.[0]?.name || '';
    return {
      id: idx + 1,
      name: `${d.Driver.givenName} ${d.Driver.familyName}`,
      team: teamName,
      points: Number(d.points),
      wins: Number(d.wins),
      podiums: Number(d.podiums ?? 0),
      position: Number(d.position),
      previousPosition: Number(d.position),
      teamColor: TEAM_COLOR_MAP[teamName] || '#666'
    };
  });
}

export async function fetchConstructorStandings(year: number): Promise<ConstructorStanding[]> {
  const res = await fetch(`${ERGAST_BASE_URL}/${year}/constructorStandings.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch Ergast constructor standings');
  }
  const json = await res.json();
  const standings: ErgastConstructorStanding[] = json?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
  return standings.map((c, idx) => {
    const name = c.Constructor?.name || '';
    return {
      id: idx + 1,
      name,
      country: c.Constructor?.nationality || '',
      points: Number(c.points),
      wins: Number(c.wins),
      podiums: Number(c.podiums ?? 0),
      position: Number(c.position),
      previousPosition: Number(c.position),
      color: TEAM_COLOR_MAP[name] || '#666',
      drivers: []
    };
  });
}
