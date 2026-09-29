export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
}
