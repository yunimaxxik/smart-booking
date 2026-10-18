import type { LoginResponse } from '../interfaces/LoginResponse';
import type { User } from '../interfaces/User';

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }
  return response.json();
}

export async function register(
  email: string,
  password: string,
  userName: string
): Promise<LoginResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, userName })
  });
  if (!response.ok) {
    throw new Error(`Пользователь с такой почтой уже зарегистрирован`);
  }
  return response.json();
}

export async function updateProfile(
  email: string,
  userName: string
): Promise<User> {
  const response = await fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, userName })
  });
  if (!response.ok) {
    throw new Error(`Ошибка обновления профиля`);
  }
  return response.json();
}

export async function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const response = await fetch('/api/auth/change-password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, currentPassword, newPassword })
  });
  if (!response.ok) {
    throw new Error(`Ошибка смены пароля`);
  }
}
