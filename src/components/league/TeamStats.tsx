import React from 'react';
import type { RankedPlayer } from '../../services/api/types';

interface TeamStatsProps {
  players: RankedPlayer[];
}

export function TeamStats({ players }: TeamStatsProps) {
  if (!players.length) return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Estadísticas de jugadores</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PJ</th>
              <th scope="col" className="hidden sm:table-cell px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PG</th>
              <th scope="col" className="hidden sm:table-cell px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PP</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">WR</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.stats.gamesPlayed}</td>
                <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.stats.gamesWon}</td>
                <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.stats.gamesLost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.stats.winRate}%</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.rankingPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}