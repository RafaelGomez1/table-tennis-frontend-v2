import React from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import type { Agenda } from '../services/api/types';
import { isSlotFull } from '../utils/bookingUtils';
import { StatusBadge } from './ui/StatusBadge';
import { PlayerBadge } from './ui/PlayerBadge';
import { translateDayOfWeek, translateMonth } from '../utils/translations';

interface BookingTableProps {
  agenda: Agenda;
  onAddBooking: (agendaId: string, hourId: string) => void;
  onDeleteBooking: (agendaId: string, hourId: string) => void;
}

export function BookingTable({ agenda, onAddBooking, onDeleteBooking }: BookingTableProps) {
  if (!agenda?.availableHours) {
    return null;
  }

  const formatTime = (hour: number) => {
    return hour.toString().padStart(2, '0');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {translateDayOfWeek(agenda.day.dayOfWeek)} {agenda.day.number} {translateMonth(agenda.month)}
        </h2>
      </div>
      
      {/* Mobile view */}
      <div className="block sm:hidden">
        {agenda.availableHours.map((hour) => {
          const startTime = formatTime(hour.from);
          const endTime = formatTime(hour.to);
          const isFull = isSlotFull(hour);

          return (
            <div key={hour.id} className="p-4 border-b last:border-b-0">
              <div className="flex items-center">
                {/* Time - fixed width */}
                <div className="w-20 text-xs text-gray-600">
                  {startTime} - {endTime}
                </div>

                {/* Players column - takes most of the space */}
                <div className="flex-grow mx-4">
                  <div className="flex flex-col space-y-2">
                    {hour.registeredPlayers?.map((player, index) => (
                      <PlayerBadge key={`${player.name}-${index}`} name={player.name} />
                    ))}
                  </div>
                </div>

                {/* Actions column - fixed width */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onAddBooking(agenda.id, hour.id)}
                    disabled={isFull}
                    className="p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteBooking(agenda.id, hour.id)}
                    disabled={(hour.registeredPlayers?.length || 0) === 0}
                    className="p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop view - unchanged */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jugadores
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agenda.availableHours.map((hour) => {
              const startTime = formatTime(hour.from);
              const endTime = formatTime(hour.to);
              const isFull = isSlotFull(hour);

              return (
                <tr key={hour.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {startTime} - {endTime}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {hour.registeredPlayers?.map((player, index) => (
                        <PlayerBadge key={`${player.name}-${index}`} name={player.name} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={isFull ? 'completed' : 'available'} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onAddBooking(agenda.id, hour.id)}
                        disabled={isFull}
                        className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <UserPlus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteBooking(agenda.id, hour.id)}
                        disabled={(hour.registeredPlayers?.length || 0) === 0}
                        className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <UserMinus className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}