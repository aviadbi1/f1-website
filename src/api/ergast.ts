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
  teamLogo?: string;
  thumbnail?: string;
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

export interface PodiumCounts {
  drivers: Record<string, number>;
  constructors: Record<string, number>;
}

export async function fetchPodiumCounts(year: number): Promise<PodiumCounts> {
  const res = await fetch(`${ERGAST_BASE_URL}/${year}/results.json?limit=1000`);
  if (!res.ok) {
    throw new Error('Failed to fetch Ergast results');
  }
  const json = await res.json();
  const races = json?.MRData?.RaceTable?.Races || [];
  const driverCounts: Record<string, number> = {};
  const constructorCounts: Record<string, number> = {};
  for (const race of races) {
    for (const result of race.Results || []) {
      const pos = Number(result.position);
      if (pos <= 3) {
        const driver = `${result.Driver.givenName} ${result.Driver.familyName}`;
        driverCounts[driver] = (driverCounts[driver] || 0) + 1;
        const team = result.Constructor?.name || '';
        if (team) {
          constructorCounts[team] = (constructorCounts[team] || 0) + 1;
        }
      }
    }
  }
  return { drivers: driverCounts, constructors: constructorCounts };
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
  'United Kingdom': 'GB',
  'Great Britain': 'GB',
  Hungary: 'HU',
  Belgium: 'BE',
  Netherlands: 'NL',
  Singapore: 'SG',
  Qatar: 'QA',
  Mexico: 'MX',
  Brazil: 'BR',
  'United States': 'US',
  'United Arab Emirates': 'AE',
  UAE: 'AE',
  Azerbaijan: 'AZ'
};

const TEAM_COLOR_MAP: Record<string, string> = {
  'Red Bull': '#1E40AF',
  'Red Bull Racing': '#1E40AF',
  'Oracle Red Bull Racing': '#1E40AF',
  'Red Bull Racing Honda RBPT': '#1E40AF',
  Ferrari: '#DC2626',
  'Scuderia Ferrari': '#DC2626',
  McLaren: '#EA580C',
  'McLaren F1 Team': '#EA580C',
  Mercedes: '#00D4AA',
  'Mercedes AMG Petronas F1 Team': '#00D4AA',
  'Aston Martin': '#00594F',
  'Aston Martin Aramco F1 Team': '#00594F',
  'Aston Martin Cognizant F1 Team': '#00594F',
  Alpine: '#0066CC',
  'Alpine F1 Team': '#0066CC',
  'BWT Alpine F1 Team': '#0066CC',
  Williams: '#0066B3',
  'Williams Racing': '#0066B3',
  Haas: '#B6BABD',
  'Haas F1 Team': '#B6BABD',
  'MoneyGram Haas F1 Team': '#B6BABD',
  'RB F1 Team': '#6692FF',
  'Visa Cash App RB': '#6692FF',
  'Scuderia AlphaTauri': '#6692FF',
  'Racing Bulls': '#6692FF',
  Sauber: '#52E252',
  'Kick Sauber': '#52E252',
  'Stake F1 Team Kick Sauber': '#52E252',
  'Alfa Romeo': '#52E252'
};

const TEAM_LOGO_MAP: Record<string, string> = {
  'Red Bull Racing':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.png',
  'Oracle Red Bull Racing':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.png',
  'Red Bull Racing Honda RBPT':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.png',
  'Red Bull':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing.png',
  Ferrari:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari.png',
  'Scuderia Ferrari':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari.png',
  McLaren:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren.png',
  'McLaren F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren.png',
  Mercedes:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes.png',
  'Mercedes AMG Petronas F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes.png',
  'Aston Martin':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin.png',
  'Aston Martin Aramco F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin.png',
  'Aston Martin Cognizant F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin.png',
  Alpine:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine.png',
  'Alpine F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine.png',
  'BWT Alpine F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine.png',
  Williams:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/williams.png',
  'Williams Racing':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/williams.png',
  Haas:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/haas.png',
  'Haas F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/haas.png',
  'MoneyGram Haas F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/haas.png',
  'RB F1 Team':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls.png',
  'Visa Cash App RB':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls.png',
  'Racing Bulls':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls.png',
  'Scuderia AlphaTauri':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls.png',
  Sauber:
    'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber.png',
  'Kick Sauber':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber.png',
  'Stake F1 Team Kick Sauber':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber.png',
  'Alfa Romeo':
    'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber.png'
};

const DRIVER_THUMBNAIL_MAP: Record<string, string> = {
  'Max Verstappen':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/verstappen.png',
  'Yuki Tsunoda':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/tsunoda.png',
  'Charles Leclerc':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/leclerc.png',
  'Lewis Hamilton':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/hamilton.png',
  'George Russell':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/russell.png',
  'Andrea Antonelli':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/antonelli.png',
  'Andrea Kimi Antonelli':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/antonelli.png',
  'Lando Norris':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/norris.png',
  'Oscar Piastri':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/piastri.png',
  'Fernando Alonso':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/alonso.png',
  'Lance Stroll':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/stroll.png',
  'Pierre Gasly':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/gasly.png',
  'Esteban Ocon':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/ocon.png',
  'Oliver Bearman':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/bearman.png',
  'Gabriel Bortoleto':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/bortoleto.png',
  'Nico Hulkenberg':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/hulkenberg.png',
  'Nico Hülkenberg':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/hulkenberg.png',
  'Isack Hadjar':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/hadjar.png',
  'Liam Lawson':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/lawson.png',
  'Alex Albon':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/albon.png',
  'Carlos Sainz':
    'https://www.formula1.com/content/dam/fom-website/drivers/2025Drivers/sainz.png'
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
  let podiumCounts: PodiumCounts | undefined;
  try {
    podiumCounts = await fetchPodiumCounts(year);
  } catch (err) {
    console.error('Failed to fetch podium counts', err);
  }
  return standings.map((d, idx) => {
    const teamName = d.Constructors?.[0]?.name || '';
    const fullName = `${d.Driver.givenName} ${d.Driver.familyName}`;
    return {
      id: idx + 1,
      name: fullName,
      team: teamName,
      teamLogo: TEAM_LOGO_MAP[teamName],
      thumbnail:
        DRIVER_THUMBNAIL_MAP[fullName] ||
        DRIVER_THUMBNAIL_MAP[fullName
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')],
      points: Number(d.points),
      wins: Number(d.wins),
      podiums:
        podiumCounts?.drivers[fullName] !== undefined
          ? podiumCounts.drivers[fullName]
          : Number(d.podiums ?? 0),
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
  let podiumCounts: PodiumCounts | undefined;
  try {
    podiumCounts = await fetchPodiumCounts(year);
  } catch (err) {
    console.error('Failed to fetch podium counts', err);
  }
  return standings.map((c, idx) => {
    const name = c.Constructor?.name || '';
    return {
      id: idx + 1,
      name,
      country: c.Constructor?.nationality || '',
      points: Number(c.points),
      wins: Number(c.wins),
      podiums:
        podiumCounts?.constructors[name] !== undefined
          ? podiumCounts.constructors[name]
          : Number(c.podiums ?? 0),
      position: Number(c.position),
      previousPosition: Number(c.position),
      color: TEAM_COLOR_MAP[name] || '#666',
      logo: TEAM_LOGO_MAP[name],
      drivers: []
    };
  });
}
