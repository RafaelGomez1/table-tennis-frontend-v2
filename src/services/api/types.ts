// Add these types to the existing types.ts file

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number;
}

export interface RankedPlayer {
  id: number;
  name: string;
  club: string;
  stats: PlayerStats;
  rankingPoints: number;
}

export interface LeagueStanding {
  id: string;
  club: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  setsWon: number;
  setsLost: number;
  points: number;
  standing: number;
}

export interface LeagueRanking {
  id: string;
  name: string;
  players: RankedPlayer[];
  standings: Record<string, LeagueStanding[]>;
}