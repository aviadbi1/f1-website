export const driversData = [
  {
    id: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    teamColor: '#1E40AF',
    points: 63,
    wins: 2,
    podiums: 3,
    position: 1,
    previousPosition: 1
  },
  {
    id: 2,
    name: 'Charles Leclerc',
    team: 'Ferrari',
    teamColor: '#DC2626',
    points: 44,
    wins: 1,
    podiums: 2,
    position: 2,
    previousPosition: 3
  },
  {
    id: 3,
    name: 'Lando Norris',
    team: 'McLaren',
    teamColor: '#EA580C',
    points: 41,
    wins: 0,
    podiums: 2,
    position: 3,
    previousPosition: 2
  },
  {
    id: 4,
    name: 'Carlos Sainz',
    team: 'Ferrari',
    teamColor: '#DC2626',
    points: 32,
    wins: 0,
    podiums: 1,
    position: 4,
    previousPosition: 4
  },
  {
    id: 5,
    name: 'Oscar Piastri',
    team: 'McLaren',
    teamColor: '#EA580C',
    points: 28,
    wins: 0,
    podiums: 1,
    position: 5,
    previousPosition: 6
  },
  {
    id: 6,
    name: 'George Russell',
    team: 'Mercedes',
    teamColor: '#00D4AA',
    points: 22,
    wins: 0,
    podiums: 0,
    position: 6,
    previousPosition: 5
  },
  {
    id: 7,
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    teamColor: '#00D4AA',
    points: 18,
    wins: 0,
    podiums: 0,
    position: 7,
    previousPosition: 7
  },
  {
    id: 8,
    name: 'Sergio Perez',
    team: 'Red Bull Racing',
    teamColor: '#1E40AF',
    points: 15,
    wins: 0,
    podiums: 1,
    position: 8,
    previousPosition: 9
  },
  {
    id: 9,
    name: 'Fernando Alonso',
    team: 'Aston Martin',
    teamColor: '#00594F',
    points: 12,
    wins: 0,
    podiums: 0,
    position: 9,
    previousPosition: 8
  },
  {
    id: 10,
    name: 'Lance Stroll',
    team: 'Aston Martin',
    teamColor: '#00594F',
    points: 8,
    wins: 0,
    podiums: 0,
    position: 10,
    previousPosition: 10
  }
];

export const constructorsData = [
  {
    id: 1,
    name: 'Red Bull Racing',
    country: 'Austria',
    points: 78,
    wins: 2,
    podiums: 4,
    color: '#1E40AF',
    logo: 'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Max Verstappen' },
      { name: 'Sergio Perez' }
    ]
  },
  {
    id: 2,
    name: 'Ferrari',
    country: 'Italy',
    points: 76,
    wins: 1,
    podiums: 3,
    color: '#DC2626',
    logo: 'https://images.pexels.com/photos/2127041/pexels-photo-2127041.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Charles Leclerc' },
      { name: 'Carlos Sainz' }
    ]
  },
  {
    id: 3,
    name: 'McLaren',
    country: 'United Kingdom',
    points: 69,
    wins: 0,
    podiums: 3,
    color: '#EA580C',
    logo: 'https://images.pexels.com/photos/2127043/pexels-photo-2127043.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Lando Norris' },
      { name: 'Oscar Piastri' }
    ]
  },
  {
    id: 4,
    name: 'Mercedes',
    country: 'Germany',
    points: 40,
    wins: 0,
    podiums: 0,
    color: '#00D4AA',
    logo: 'https://images.pexels.com/photos/2127040/pexels-photo-2127040.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Lewis Hamilton' },
      { name: 'George Russell' }
    ]
  },
  {
    id: 5,
    name: 'Aston Martin',
    country: 'United Kingdom',
    points: 20,
    wins: 0,
    podiums: 0,
    color: '#00594F',
    logo: 'https://images.pexels.com/photos/2127042/pexels-photo-2127042.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Fernando Alonso' },
      { name: 'Lance Stroll' }
    ]
  },
  {
    id: 6,
    name: 'Alpine',
    country: 'France',
    points: 8,
    wins: 0,
    podiums: 0,
    color: '#0066CC',
    logo: 'https://images.pexels.com/photos/2127044/pexels-photo-2127044.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    drivers: [
      { name: 'Pierre Gasly' },
      { name: 'Esteban Ocon' }
    ]
  }
];

export const raceSchedule = [
  {
    id: 1,
    name: 'Bahrain Grand Prix',
    location: 'Sakhir',
    country: 'Bahrain',
    date: '2025-03-02T15:00:00Z',
    qualifying: '2025-03-01T15:00:00Z',
    flag: 'https://images.pexels.com/photos/2127045/pexels-photo-2127045.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 2,
    name: 'Saudi Arabian Grand Prix',
    location: 'Jeddah',
    country: 'Saudi Arabia',
    date: '2025-03-09T17:00:00Z',
    qualifying: '2025-03-08T17:00:00Z',
    flag: 'https://images.pexels.com/photos/2127046/pexels-photo-2127046.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 3,
    name: 'Australian Grand Prix',
    location: 'Melbourne',
    country: 'Australia',
    date: '2025-03-23T05:00:00Z',
    qualifying: '2025-03-22T05:00:00Z',
    flag: 'https://images.pexels.com/photos/2127047/pexels-photo-2127047.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 4,
    name: 'Japanese Grand Prix',
    location: 'Suzuka',
    country: 'Japan',
    date: '2025-04-13T05:00:00Z',
    qualifying: '2025-04-12T05:00:00Z',
    flag: 'https://images.pexels.com/photos/2127048/pexels-photo-2127048.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 5,
    name: 'Chinese Grand Prix',
    location: 'Shanghai',
    country: 'China',
    date: '2025-04-20T07:00:00Z',
    qualifying: '2025-04-19T07:00:00Z',
    sprint: '2025-04-19T03:00:00Z',
    flag: 'https://images.pexels.com/photos/2127049/pexels-photo-2127049.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 6,
    name: 'Miami Grand Prix',
    location: 'Miami',
    country: 'USA',
    date: '2025-05-04T19:30:00Z',
    qualifying: '2025-05-03T19:30:00Z',
    sprint: '2025-05-03T15:30:00Z',
    flag: 'https://images.pexels.com/photos/2127050/pexels-photo-2127050.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 7,
    name: 'Emilia Romagna Grand Prix',
    location: 'Imola',
    country: 'Italy',
    date: '2025-05-18T13:00:00Z',
    qualifying: '2025-05-17T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127051/pexels-photo-2127051.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 8,
    name: 'Monaco Grand Prix',
    location: 'Monte Carlo',
    country: 'Monaco',
    date: '2025-05-25T13:00:00Z',
    qualifying: '2025-05-24T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127052/pexels-photo-2127052.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 9,
    name: 'Canadian Grand Prix',
    location: 'Montreal',
    country: 'Canada',
    date: '2025-06-08T18:00:00Z',
    qualifying: '2025-06-07T18:00:00Z',
    flag: 'https://images.pexels.com/photos/2127053/pexels-photo-2127053.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 10,
    name: 'Spanish Grand Prix',
    location: 'Barcelona',
    country: 'Spain',
    date: '2025-06-22T13:00:00Z',
    qualifying: '2025-06-21T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127054/pexels-photo-2127054.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 11,
    name: 'Austrian Grand Prix',
    location: 'Spielberg',
    country: 'Austria',
    date: '2025-06-29T13:00:00Z',
    qualifying: '2025-06-28T13:00:00Z',
    sprint: '2025-06-28T09:30:00Z',
    flag: 'https://images.pexels.com/photos/2127055/pexels-photo-2127055.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 12,
    name: 'British Grand Prix',
    location: 'Silverstone',
    country: 'United Kingdom',
    date: '2025-07-06T14:00:00Z',
    qualifying: '2025-07-05T14:00:00Z',
    flag: 'https://images.pexels.com/photos/2127056/pexels-photo-2127056.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 13,
    name: 'Hungarian Grand Prix',
    location: 'Budapest',
    country: 'Hungary',
    date: '2025-07-20T13:00:00Z',
    qualifying: '2025-07-19T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127057/pexels-photo-2127057.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 14,
    name: 'Belgian Grand Prix',
    location: 'Spa-Francorchamps',
    country: 'Belgium',
    date: '2025-07-27T13:00:00Z',
    qualifying: '2025-07-26T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127058/pexels-photo-2127058.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 15,
    name: 'Dutch Grand Prix',
    location: 'Zandvoort',
    country: 'Netherlands',
    date: '2025-08-31T13:00:00Z',
    qualifying: '2025-08-30T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127059/pexels-photo-2127059.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 16,
    name: 'Italian Grand Prix',
    location: 'Monza',
    country: 'Italy',
    date: '2025-09-07T13:00:00Z',
    qualifying: '2025-09-06T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127060/pexels-photo-2127060.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 17,
    name: 'Azerbaijan Grand Prix',
    location: 'Baku',
    country: 'Azerbaijan',
    date: '2025-09-21T11:00:00Z',
    qualifying: '2025-09-20T11:00:00Z',
    flag: 'https://images.pexels.com/photos/2127061/pexels-photo-2127061.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 18,
    name: 'Singapore Grand Prix',
    location: 'Marina Bay',
    country: 'Singapore',
    date: '2025-10-05T12:00:00Z',
    qualifying: '2025-10-04T12:00:00Z',
    flag: 'https://images.pexels.com/photos/2127062/pexels-photo-2127062.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 19,
    name: 'United States Grand Prix',
    location: 'Austin',
    country: 'USA',
    date: '2025-10-19T19:00:00Z',
    qualifying: '2025-10-18T19:00:00Z',
    sprint: '2025-10-18T15:00:00Z',
    flag: 'https://images.pexels.com/photos/2127063/pexels-photo-2127063.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 20,
    name: 'Mexican Grand Prix',
    location: 'Mexico City',
    country: 'Mexico',
    date: '2025-10-26T20:00:00Z',
    qualifying: '2025-10-25T20:00:00Z',
    flag: 'https://images.pexels.com/photos/2127064/pexels-photo-2127064.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 21,
    name: 'Brazilian Grand Prix',
    location: 'São Paulo',
    country: 'Brazil',
    date: '2025-11-09T18:00:00Z',
    qualifying: '2025-11-08T18:00:00Z',
    sprint: '2025-11-08T14:00:00Z',
    flag: 'https://images.pexels.com/photos/2127065/pexels-photo-2127065.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 22,
    name: 'Las Vegas Grand Prix',
    location: 'Las Vegas',
    country: 'USA',
    date: '2025-11-23T06:00:00Z',
    qualifying: '2025-11-22T06:00:00Z',
    flag: 'https://images.pexels.com/photos/2127066/pexels-photo-2127066.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 23,
    name: 'Qatar Grand Prix',
    location: 'Lusail',
    country: 'Qatar',
    date: '2025-11-30T16:00:00Z',
    qualifying: '2025-11-29T16:00:00Z',
    sprint: '2025-11-29T12:00:00Z',
    flag: 'https://images.pexels.com/photos/2127067/pexels-photo-2127067.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  },
  {
    id: 24,
    name: 'Abu Dhabi Grand Prix',
    location: 'Yas Marina',
    country: 'UAE',
    date: '2025-12-07T13:00:00Z',
    qualifying: '2025-12-06T13:00:00Z',
    flag: 'https://images.pexels.com/photos/2127068/pexels-photo-2127068.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'
  }
];