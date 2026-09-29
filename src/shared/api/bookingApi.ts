import type { Booking } from '../interfaces/Booking';
import type { CreateBookingData } from '../interfaces/CreateBookingData';

export async function getBookingsByRoom(roomId: string): Promise<Booking[]> {
  const response = await fetch(`/api/bookings?roomId=${roomId}`);
  if (!response.ok) {
    throw new Error('Ошибка получения списка бронирований');
  }
  return await response.json();
}

export async function getAllBookings(): Promise<Booking[]> {
  const response = await fetch(`/api/bookings`);
  if (!response.ok) {
    throw new Error('Ошибка получения списка бронирований');
  }
  return await response.json();
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
    throw new Error('Ошибка создания бронирования');
  }
  return await response.json();
}

export async function cancelBooking(bookingId: string): Promise<Booking> {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ status: 'cancelled' })
  });

  if (!response.ok) {
    throw new Error('Ошибка отмена бронирования');
  }

  return await response.json();
}
