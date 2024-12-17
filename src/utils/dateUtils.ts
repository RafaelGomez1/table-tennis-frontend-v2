import { startOfWeek, getWeek, getYear, addWeeks, isSaturday } from 'date-fns';

export const isTimeSlotCompleted = (timeSlot: string): boolean => {
  const now = new Date();
  const [hours, minutes] = timeSlot.split(':').map(Number);
  const slotDate = new Date();
  slotDate.setHours(hours, minutes);

  return now > slotDate;
};

export const getCurrentBookingWeek = (): { week: number; year: number } => {
  const today = new Date();
  
  // If it's Saturday, show next week's schedule
  if (isSaturday(today)) {
    const nextWeek = addWeeks(today, 1);
    return {
      week: getWeek(nextWeek),
      year: getYear(nextWeek)
    };
  }

  return {
    week: getWeek(today),
    year: getYear(today)
  };
};