import React, { useState } from 'react';
import { LeagueSelector } from './LeagueSelector';
import { TeamSelector } from './TeamSelector';
import { LeagueStandings } from './LeagueStandings';
import { TeamStats } from './TeamStats';
import { useLeagueRankings } from '../../hooks/useLeagueRankings';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorAlert } from '../ui/ErrorAlert';
import type { LeagueId } from '../../data/leagues';

export function LeagueStats() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueId | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { rankings, loading, error } = useLeagueRankings(selectedLeague, selectedTeam);

  const handleLeagueChange = (leagueId: LeagueId) => {
    setSelectedLeague(leagueId);
    setSelectedTeam(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Estadísticas de Liga</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeagueSelector
            selectedLeague={selectedLeague}
            onLeagueSelect={handleLeagueChange}
          />
          <TeamSelector
            leagueId={selectedLeague}
            selectedTeam={selectedTeam}
            onTeamSelect={setSelectedTeam}
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} />}
      
      {loading ? (
        <LoadingSpinner message="Cargando datos de la liga..." />
      ) : (
        rankings && selectedTeam && selectedLeague && (
          <>
            <LeagueStandings 
              standings={Object.entries(rankings.standings)
                .find(([_, standings]) => 
                  standings.some(s => s.club === selectedTeam)
                )?.[1] || []}
              selectedLeague={selectedLeague}
            />
            <TeamStats 
              players={rankings.players.filter(p => p.club === selectedTeam)} 
            />
          </>
        )
      )}
    </div>
  );
}