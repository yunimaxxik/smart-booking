import { http, HttpResponse } from 'msw';
import { mockRooms, mockBookings } from './data';
import type { Booking } from '../shared/interfaces/Booking';

export const handlers = [
  // Авторизация
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@test.com' && body.password === 'password') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { id: 'user1', email: body.email }
      });
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  // Получить список комнат
  http.get('/api/rooms', ({ request }) => {
    const params = new URL(request.url).searchParams;
    const hasProjector = params.get('hasProjector');
    const hasWhiteboard = params.get('hasWhiteboard');
    const minCapacity = params.get('minCapacity');
    let result = [...mockRooms];
    console.log(result);
    if (hasProjector === 'true')
      result = result.filter((el) => el.hasProjector);
    if (hasWhiteboard === 'true')
      result = result.filter((el) => el.hasWhiteboard);
    if (minCapacity !== null)
      result = result.filter((el) => el.capacity >= Number(minCapacity));

    return HttpResponse.json(result);
  }),

  // Получить комнату
  http.get('/api/rooms/:roomId', ({ params }) => {
    const room = mockRooms.find((r) => r.id === params.roomId);
    if (!room) {
      return HttpResponse.json(
        { error: 'Комната не найдена' },
        { status: 404 }
      );
    }

    return HttpResponse.json(room);
  }),

  // Получить бронирования
  http.get('/api/bookings', ({ request }) => {
    const roomId = new URL(request.url).searchParams.get('roomId');
    let result = [...mockBookings];
    if (roomId) {
      result = result.filter((b) => b.roomId === roomId);
    }
    return HttpResponse.json(result);
  }),

  // Создать бронирование
  http.post('/api/bookings', async ({ request }) => {
    const body = (await request.json()) as Omit<Booking, 'id' | 'status'>;

    const newBooking: Booking = {
      id: Date.now().toString(),
      ...body,
      status: 'active' as const
    };

    mockBookings.push(newBooking);

    return HttpResponse.json(newBooking);
  })
];
