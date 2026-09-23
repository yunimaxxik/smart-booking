import type { CreateBookingData } from '../interfaces/CreateBookingData';

export async function getBookingsByRoom(roomId: string) {
  const response = await fetch(`/api/bookings?roomId=${roomId}`);
  return response.json();
}

export async function createBooking(booking: CreateBookingData) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(booking)
  });
  response.json();
}
