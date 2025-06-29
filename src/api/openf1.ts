export const OPENF1_BASE_URL = 'https://api.openf1.org/v1';

export interface OpenF1Session {
  session_key?: number;
  event_name?: string;
  country_name?: string;
  country_code?: string;
  circuit_short_name?: string;
  location?: string;
  date_start?: string;
  qualifying_start?: string;
  sprint_start?: string;
}

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

export async function fetchRaceSchedule(year: number): Promise<RaceInfo[]> {
  const url = `${OPENF1_BASE_URL}/sessions?year=${year}&session_type=R`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch OpenF1 schedule');
  }
  const data: OpenF1Session[] = await res.json();
  return data.map((session, idx) => ({
    id: session.session_key ?? idx,
    name: session.event_name || 'Race',
    location: session.location || session.circuit_short_name || '',
    country: session.country_name || '',
    date: session.date_start || '',
    qualifying: session.qualifying_start,
    sprint: session.sprint_start,
    flag: session.country_code
      ? `https://flagsapi.com/${session.country_code}/flat/64.png`
      : undefined,
  }));
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

interface OpenF1DriverStanding {
  driver_name: string;
  team_name: string;
  points: number | string;
  wins?: number | string;
  podiums?: number | string;
  position: number;
  position_previous?: number;
  team_colour?: string;
}

interface OpenF1ConstructorStanding {
  team_name: string;
  country_name?: string;
  points: number | string;
  wins?: number | string;
  podiums?: number | string;
  position: number;
  position_previous?: number;
  team_colour?: string;
  team_logo?: string;
  drivers?: string[];
}

export async function fetchDriverStandings(
  year: number
): Promise<DriverStanding[]> {
  const url = `${OPENF1_BASE_URL}/rankings?year=${year}&category=driver`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch OpenF1 driver standings');
  }
  const data: OpenF1DriverStanding[] = await res.json();
  return data.map((d, idx) => ({
    id: idx + 1,
    name: d.driver_name,
    team: d.team_name,
    points: Number(d.points),
    wins: Number(d.wins ?? 0),
    podiums: Number(d.podiums ?? 0),
    position: Number(d.position),
    previousPosition: Number(d.position_previous ?? d.position),
    teamColor: d.team_colour ?? '#666',
  }));
}

export async function fetchConstructorStandings(
  year: number
): Promise<ConstructorStanding[]> {
  const url = `${OPENF1_BASE_URL}/rankings?year=${year}&category=team`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch OpenF1 constructor standings');
  }
  const data: OpenF1ConstructorStanding[] = await res.json();
  return data.map((d, idx) => ({
    id: idx + 1,
    name: d.team_name,
    country: d.country_name ?? '',
    points: Number(d.points),
    wins: Number(d.wins ?? 0),
    podiums: Number(d.podiums ?? 0),
    position: Number(d.position),
    previousPosition: Number(d.position_previous ?? d.position),
    color: d.team_colour ?? '#666',
    logo: d.team_logo,
    drivers: d.drivers?.map((name: string) => ({ name })),
  }));
}
