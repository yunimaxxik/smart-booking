export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
}
