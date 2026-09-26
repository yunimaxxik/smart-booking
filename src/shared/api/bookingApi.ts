import type { Booking } from '../interfaces/Booking';
import type { CreateBookingData } from '../interfaces/CreateBookingData';

export async function getBookingsByRoom(roomId: string): Promise<Booking[]> {
  const response = await fetch(`/api/bookings?roomId=${roomId}`);
  if (!response.ok) {
    throw new Error('Ошибка получения списка бронирований');
  }
  return response.json();
}

export async function createBooking(
  booking: CreateBookingData
): Promise<Booking> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(booking)
  });
  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }
  return response.json();
}
