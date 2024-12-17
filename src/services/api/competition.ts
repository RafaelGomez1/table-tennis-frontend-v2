import { apiRequest } from './client';
import type { LeagueRanking } from './types';
import { LEAGUE_DISPLAY_TO_API, type LeagueId } from '../../data/leagues';

interface ClubsResponse {
  clubs: string[];
}

export async function getClubsByLeague(leagueId: LeagueId): Promise<string[]> {
  try {
    const apiLeagueName = LEAGUE_DISPLAY_TO_API[leagueId];
    const response = await apiRequest<ClubsResponse>(`/clubs?league=${apiLeagueName}`);
    return response.clubs;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

export async function getLeagueRankings(leagueId: LeagueId, club: string): Promise<LeagueRanking> {
  try {
    const apiLeagueName = LEAGUE_DISPLAY_TO_API[leagueId];
    return await apiRequest<LeagueRanking>(`/rankings?league=${apiLeagueName}&club=${club}`);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
}