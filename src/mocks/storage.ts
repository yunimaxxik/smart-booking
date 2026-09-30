import type { Booking } from '../shared/interfaces/Booking';
import { mockBookings } from './data';

export function getStoredBookings(): Booking[] {
  const data = localStorage.getItem('mockBookings');
  if (!data) {
    return mockBookings;
  }

  return JSON.parse(data);
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem('mockBookings', JSON.stringify(bookings));
}
