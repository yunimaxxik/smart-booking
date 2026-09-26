import type { Booking } from './Booking';

export interface TimeSlotsProps {
  bookings: Booking[];
  onSlotClick: (startTime: string, endTime: string) => void;
}
