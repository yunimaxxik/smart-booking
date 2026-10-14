import type { LoginResponse } from '../interfaces/LoginResponse';

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
