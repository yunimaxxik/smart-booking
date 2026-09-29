import { format, parseISO } from 'date-fns';
import type { Booking } from '../../shared/interfaces/Booking';

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}
const BookingCard = (props: BookingCardProps) => {
  const { booking, onCancel } = props;
  return (
    <li>
      <span aria-label="date booking">
        {format(parseISO(booking.startTime), 'dd MMMM yyyy')}
      </span>
      <h2>{booking.roomId}</h2>
      <h3>{booking.title}</h3>
      <h3>{booking.userName}</h3>
      <span>{booking.status === 'active' ? 'Активно' : 'Отменено'}</span>
      {booking.status === 'active' && (
        <button onClick={() => onCancel(booking.id)}>Отменить</button>
      )}
    </li>
  );
};

export default BookingCard;
