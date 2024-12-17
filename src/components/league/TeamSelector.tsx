import React from 'react';
import { useClubs } from '../../hooks/useClubs';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorAlert } from '../ui/ErrorAlert';
import type { LeagueId } from '../../data/leagues';

interface TeamSelectorProps {
  selectedTeam: string | null;
  onTeamSelect: (teamId: string) => void;
  leagueId: LeagueId | null;
}

export function TeamSelector({ selectedTeam, onTeamSelect, leagueId }: TeamSelectorProps) {
  const { clubs, loading, error } = useClubs(leagueId);

  if (loading) {
    return <LoadingSpinner message="Cargando equipos..." />;
  }

  return (
    <div className="mb-6">
      {error && <ErrorAlert message={error} />}
      
      <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
        Selecciona un equipo
      </label>
      <select
        id="team"
        value={selectedTeam || ''}
        onChange={(e) => onTeamSelect(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        disabled={!leagueId || loading}
      >
        <option value="">Selecciona un equipo...</option>
        {clubs.map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>
    </div>
  );
}