import { http, HttpResponse } from 'msw';
import { mockRooms } from './data';
import {
  getStoredBookings,
  getStoredUsers,
  saveBookings,
  saveUsers
} from './storage';
import type { Booking } from '../shared/interfaces/Booking';
import type { User } from '../shared/interfaces/User';

export const handlers = [
  // 1. Обновление профиля
  http.patch('/api/auth/profile', async ({ request }) => {
    const body = (await request.json()) as { email: string; userName: string };
    const currentUsers = getStoredUsers();

    const user = currentUsers.find((u) => u.email === body.email);

    if (!user) {
      return HttpResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    user.userName = body.userName;
    saveUsers(currentUsers);
    return HttpResponse.json(user);
  }),

  // 2. Авторизация
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const currentUsers = getStoredUsers();

    const user = currentUsers.find((u) => u.email === body.email);

    if (!user || user.password !== body.password) {
      return HttpResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      token: 'mock-jwt-token-' + user.id,
      user
    });
  }),

  // 3. Регистрация
  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      userName: string;
    };

    const currentUsers = getStoredUsers();
    const isRegistered = currentUsers.some((u) => u.email === body.email);

    if (isRegistered) {
      return HttpResponse.json(
        { error: 'Пользователь с такой почтой уже зарегистрирован' },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: body.email,
      password: body.password,
      userName: body.userName
    };

    currentUsers.push(newUser);
    saveUsers(currentUsers);

    return HttpResponse.json({
      token: 'mock-jwt-token-' + newUser.id,
      user: newUser
    });
  }),

  // 4. Получить список комнат
  http.get('/api/rooms', ({ request }) => {
    const params = new URL(request.url).searchParams;
    const hasProjector = params.get('hasProjector');
    const hasWhiteboard = params.get('hasWhiteboard');
    const minCapacity = params.get('minCapacity');
    let result = [...mockRooms];

    if (hasProjector === 'true')
      result = result.filter((el) => el.hasProjector);
    if (hasWhiteboard === 'true')
      result = result.filter((el) => el.hasWhiteboard);
    if (minCapacity !== null)
      result = result.filter((el) => el.capacity >= Number(minCapacity));

    return HttpResponse.json(result);
  }),

  // 5. Получить комнату
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

  // 6. Получить бронирования
  http.get('/api/bookings', ({ request }) => {
    const roomId = new URL(request.url).searchParams.get('roomId');
    let result = getStoredBookings();
    if (roomId) {
      result = result.filter((b) => b.roomId === roomId);
    }
    return HttpResponse.json(result);
  }),

  // 7. Создать бронирование
  http.post('/api/bookings', async ({ request }) => {
    const body = (await request.json()) as Omit<Booking, 'id' | 'status'>;
    const currentBookings = getStoredBookings();

    const newBooking: Booking = {
      id: Date.now().toString(),
      ...body,
      status: 'active' as const
    };

    currentBookings.push(newBooking);
    saveBookings(currentBookings);
    return HttpResponse.json(newBooking);
  }),

  // 8. Отменить бронирование
  http.patch('/api/bookings/:bookingId', async ({ params }) => {
    const currentBookings = getStoredBookings();
    const booking = currentBookings.find((r) => r.id === params.bookingId);

    if (!booking) {
      return HttpResponse.json(
        { error: 'Бронирование не найдено' },
        { status: 404 }
      );
    }

    booking.status = 'cancelled';
    saveBookings(currentBookings);

    return HttpResponse.json(booking);
  })
];
