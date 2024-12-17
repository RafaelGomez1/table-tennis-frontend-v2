import { Agenda, AvailableHour } from '../services/api/types';
import { DEFAULT_SCHEDULE } from '../data/defaultSchedule';
import { generateId } from './bookingUtils';

function createEmptyHour(from: number, to: number): AvailableHour {
  return {
    id: generateId(),
    from,
    to,
    capacity: { value: 8 },
    type: 'MEMBERS_TIME',
    registeredPlayers: []
  };
}

function timeToHour(timeString: string): number {
  return parseInt(timeString.split(':')[0], 10);
}

function createEmptyAgendaForDay(dayOfWeek: string, slots: { startTime: string; endTime: string }[], week: number, year: number): Agenda {
  return {
    id: generateId(),
    day: {
      number: new Date().getDate(), // This should be calculated properly based on week/year
      dayOfWeek: dayOfWeek.toUpperCase()
    },
    month: new Date().toLocaleString('default', { month: 'long' }).toUpperCase(),
    week,
    year,
    availableHours: slots.map(slot => createEmptyHour(
      timeToHour(slot.startTime),
      timeToHour(slot.endTime)
    ))
  };
}

export function createEmptyAgendas(week: number, year: number): Agenda[] {
  return DEFAULT_SCHEDULE
    .filter(schedule => schedule.day !== 'Saturday' && schedule.day !== 'Sunday')
    .map(schedule => createEmptyAgendaForDay(schedule.day, schedule.slots, week, year));
}

export function mergeAgendasWithSchedule(apiAgendas: Agenda[], week: number, year: number): Agenda[] {
  const emptyAgendas = createEmptyAgendas(week, year);
  
  if (!apiAgendas || !Array.isArray(apiAgendas) || apiAgendas.length === 0) {
    return emptyAgendas;
  }

  return emptyAgendas.map(emptyAgenda => {
    const matchingAgenda = apiAgendas.find(
      apiAgenda => apiAgenda.day.dayOfWeek === emptyAgenda.day.dayOfWeek
    );

    if (!matchingAgenda) {
      return emptyAgenda;
    }

    return {
      ...matchingAgenda,
      availableHours: matchingAgenda.availableHours.map(hour => ({
        ...hour,
        registeredPlayers: hour.registeredPlayers || []
      }))
    };
  });
}