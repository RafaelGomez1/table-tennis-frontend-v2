import { useState, useEffect } from 'react';
import { getAgendas } from '../services/api/bookings';
import type { Agenda } from '../services/api/types';
import { getCurrentBookingWeek } from '../utils/dateUtils';
import { ApiError } from '../services/api/errors';
import { mergeAgendasWithSchedule } from '../utils/scheduleUtils';

export function useAgendas() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgendas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { week, year } = getCurrentBookingWeek();
      console.log('Fetching agendas for week:', week, 'year:', year);
      
      const data = await getAgendas(week, year);
      console.log('API Response:', data);
      
      // Merge API data with default schedule to ensure all time slots are shown
      const mergedAgendas = mergeAgendasWithSchedule(data, week, year);
      console.log('Merged Agendas:', mergedAgendas);
      
      setAgendas(mergedAgendas);
    } catch (err) {
      console.error('Error fetching agendas:', err);
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load bookings. Please try again later.');
      }
      
      // Even on error, show empty schedules
      const { week, year } = getCurrentBookingWeek();
      const emptyAgendas = mergeAgendasWithSchedule([], week, year);
      setAgendas(emptyAgendas);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendas();
  }, []);

  return {
    agendas,
    loading,
    error,
    refreshAgendas: fetchAgendas,
  };
}