import { mockBookings, mockUsers } from './data';
import type { Booking } from '../shared/interfaces/Booking';
import type { User } from '../shared/interfaces/User';

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

export function getStoredUsers(): User[] {
  const users = localStorage.getItem('mockUsers');
  if (!users) {
    return mockUsers;
  }
  return JSON.parse(users) as User[];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem('mockUsers', JSON.stringify(users));
}
