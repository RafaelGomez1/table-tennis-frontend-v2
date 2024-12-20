import { useState, useEffect } from 'react';
import { getClubsByLeague } from '../services/api/competition';
import type { LeagueId } from '../data/leagues';

export function useClubs(leagueId: LeagueId | null) {
  const [clubs, setClubs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      if (!leagueId) {
        setClubs([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getClubsByLeague(leagueId);
        setClubs(data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Ha habido un error al cargar los equipos.');
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [leagueId]);

  return { clubs, loading, error };
}