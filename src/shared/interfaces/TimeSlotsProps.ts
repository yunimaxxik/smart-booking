import type { Booking } from './Booking';

export interface TimeSlotsProps {
  date: string;
  bookings: Booking[];
  onSlotClick: (startTime: string, endTime: string) => void;
}
