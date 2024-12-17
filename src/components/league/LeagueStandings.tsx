import React from 'react';
import type { LeagueStanding } from '../../services/api/types';
import type { LeagueId } from '../../data/leagues';

interface LeagueStandingsProps {
  standings: LeagueStanding[];
  selectedLeague: LeagueId;
}

export function LeagueStandings({ standings, selectedLeague }: LeagueStandingsProps) {
  if (!standings.length) return null;

  const getRowColor = (position: number): string => {
    if (selectedLeague === '4a') {
      return position <= 2 ? 'bg-green-50' : '';
    }

    if (position <= 2) return 'bg-green-50';
    if (position <= 6) return 'bg-blue-50';
    if (position <= 10) return 'bg-orange-50';
    return 'bg-red-50';
  };

  const renderLegend = () => {
    if (selectedLeague === '4a') {
      return (
        <div className="px-4 py-3 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"></div>
              <span>Promoción</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="px-4 py-3 bg-gray-50 border-t">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"></div>
            <span>Promoción</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2"></div>
            <span>Playoff Promoción</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded mr-2"></div>
            <span>Playoff Descenso</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-50 border border-red-200 rounded mr-2"></div>
            <span>Descenso</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Clasificación</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">EJ</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">EG</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">EP</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PG</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PP</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PTS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.map((standing) => (
              <tr key={standing.id} className={getRowColor(standing.standing)}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{standing.standing}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{standing.club}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{standing.gamesPlayed}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{standing.gamesWon}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{standing.gamesLost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{standing.setsWon}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{standing.setsLost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderLegend()}
    </div>
  );
}