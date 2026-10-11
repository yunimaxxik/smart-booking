export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  theme: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
}
