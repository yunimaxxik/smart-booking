import type { Room } from '../interfaces/Room';
import type { Filters } from '../interfaces/Filters';

export async function getRooms(filters: Filters): Promise<Room[] | undefined> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    params.append(key, String(value));
  }
  const response = await fetch(`/api/rooms?${params}`);
  if (!response.ok) {
    throw new Error('Ошибка получения комнат');
  }
  return response.json();
}

export async function getRoomById(roomId: string): Promise<Room | undefined> {
  const response = await fetch(`/api/rooms/${roomId}`);
  if (!response.ok) {
    throw new Error('Ошибка получения комнаты');
  }
  return response.json();
}
