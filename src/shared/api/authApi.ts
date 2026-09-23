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
