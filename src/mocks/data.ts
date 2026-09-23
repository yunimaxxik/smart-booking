import type { Room } from '../shared/interfaces/Room';
import type { Booking } from '../shared/interfaces/Booking';

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Conference Room A',
    capacity: 10,
    floor: 1,
    hasProjector: true,
    hasWhiteboard: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
  },
  {
    id: '2',
    name: 'Meeting Room B',
    capacity: 6,
    floor: 2,
    hasProjector: false,
    hasWhiteboard: true,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
  },
  {
    id: '3',
    name: 'Board Room',
    capacity: 20,
    floor: 3,
    hasProjector: true,
    hasWhiteboard: false,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800'
  },
  {
    id: '4',
    name: 'Service Room',
    capacity: 14,
    floor: 4,
    hasProjector: false,
    hasWhiteboard: false,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800'
  },
  {
    id: '5',
    name: 'Cool Room',
    capacity: 40,
    floor: 5,
    hasProjector: true,
    hasWhiteboard: true,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    roomId: '1',
    userId: 'user1',
    startTime: '2024-01-20T10:00:00',
    endTime: '2024-01-20T11:00:00',
    status: 'active'
  }
];
