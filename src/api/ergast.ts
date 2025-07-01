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
  photo?: string;
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
    'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Red_Bull_Racing_logo.svg/200px-Red_Bull_Racing_logo.svg.png',
  'Oracle Red Bull Racing':
    'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Red_Bull_Racing_logo.svg/200px-Red_Bull_Racing_logo.svg.png',
  'Red Bull Racing Honda RBPT':
    'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Red_Bull_Racing_logo.svg/200px-Red_Bull_Racing_logo.svg.png',
  'Red Bull':
    'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Red_Bull_Racing_logo.svg/200px-Red_Bull_Racing_logo.svg.png',
  Ferrari:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Scuderia_Ferrari_Logo.svg/200px-Scuderia_Ferrari_Logo.svg.png',
  'Scuderia Ferrari':
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Scuderia_Ferrari_Logo.svg/200px-Scuderia_Ferrari_Logo.svg.png',
  McLaren:
    'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/McLaren_F1_Logo.svg/200px-McLaren_F1_Logo.svg.png',
  'McLaren F1 Team':
    'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/McLaren_F1_Logo.svg/200px-McLaren_F1_Logo.svg.png',
  Mercedes:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mercedes-Benz_in_Motorsport_logo.svg/200px-Mercedes-Benz_in_Motorsport_logo.svg.png',
  'Mercedes AMG Petronas F1 Team':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mercedes-Benz_in_Motorsport_logo.svg/200px-Mercedes-Benz_in_Motorsport_logo.svg.png',
  'Aston Martin':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Aston_Martin_F1_logo.svg/200px-Aston_Martin_F1_logo.svg.png',
  'Aston Martin Aramco F1 Team':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Aston_Martin_F1_logo.svg/200px-Aston_Martin_F1_logo.svg.png',
  'Aston Martin Cognizant F1 Team':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Aston_Martin_F1_logo.svg/200px-Aston_Martin_F1_logo.svg.png',
  Alpine:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Alpine_F1_Team_logo.svg/200px-Alpine_F1_Team_logo.svg.png',
  'Alpine F1 Team':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Alpine_F1_Team_logo.svg/200px-Alpine_F1_Team_logo.svg.png',
  'BWT Alpine F1 Team':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Alpine_F1_Team_logo.svg/200px-Alpine_F1_Team_logo.svg.png',
  Williams:
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Williams_Racing_logo_2020.svg/200px-Williams_Racing_logo_2020.svg.png',
  'Williams Racing':
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Williams_Racing_logo_2020.svg/200px-Williams_Racing_logo_2020.svg.png',
  Haas:
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Haas_F1_Team_logo.svg/200px-Haas_F1_Team_logo.svg.png',
  'Haas F1 Team':
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Haas_F1_Team_logo.svg/200px-Haas_F1_Team_logo.svg.png',
  'MoneyGram Haas F1 Team':
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Haas_F1_Team_logo.svg/200px-Haas_F1_Team_logo.svg.png',
  'RB F1 Team':
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_F1_Team_logo.svg/200px-RB_F1_Team_logo.svg.png',
  'Visa Cash App RB':
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_F1_Team_logo.svg/200px-RB_F1_Team_logo.svg.png',
  'Racing Bulls':
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_F1_Team_logo.svg/200px-RB_F1_Team_logo.svg.png',
  'Scuderia AlphaTauri':
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_F1_Team_logo.svg/200px-RB_F1_Team_logo.svg.png',
  Sauber:
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Stake_F1_Team_Kick_Sauber_logo.svg/200px-Stake_F1_Team_Kick_Sauber_logo.svg.png',
  'Kick Sauber':
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Stake_F1_Team_Kick_Sauber_logo.svg/200px-Stake_F1_Team_Kick_Sauber_logo.svg.png',
  'Stake F1 Team Kick Sauber':
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Stake_F1_Team_Kick_Sauber_logo.svg/200px-Stake_F1_Team_Kick_Sauber_logo.svg.png',
  'Alfa Romeo':
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Stake_F1_Team_Kick_Sauber_logo.svg/200px-Stake_F1_Team_Kick_Sauber_logo.svg.png'
};

const DRIVER_PHOTO_MAP: Record<string, string> = {
  'Max Verstappen':
    'https://images.pexels.com/photos/15914435/pexels-photo-15914435.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Charles Leclerc':
    'https://images.pexels.com/photos/15914439/pexels-photo-15914439.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Lando Norris':
    'https://images.pexels.com/photos/17081144/pexels-photo-17081144.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Carlos Sainz':
    'https://images.pexels.com/photos/17081143/pexels-photo-17081143.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Oscar Piastri':
    'https://images.pexels.com/photos/17081142/pexels-photo-17081142.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'George Russell':
    'https://images.pexels.com/photos/17081141/pexels-photo-17081141.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Lewis Hamilton':
    'https://images.pexels.com/photos/17081140/pexels-photo-17081140.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Sergio Perez':
    'https://images.pexels.com/photos/17081139/pexels-photo-17081139.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Fernando Alonso':
    'https://images.pexels.com/photos/17081138/pexels-photo-17081138.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  'Lance Stroll':
    'https://images.pexels.com/photos/17081137/pexels-photo-17081137.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
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
    const fullName = `${d.Driver.givenName} ${d.Driver.familyName}`;
    return {
      id: idx + 1,
      name: fullName,
      team: teamName,
      teamLogo: TEAM_LOGO_MAP[teamName],
      photo: DRIVER_PHOTO_MAP[fullName],
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
      logo: TEAM_LOGO_MAP[name],
      drivers: []
    };
  });
}
