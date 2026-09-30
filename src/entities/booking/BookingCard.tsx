import { format, parseISO } from 'date-fns';
import type { Booking } from '../../shared/interfaces/Booking';

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
  const isActive = booking.status === 'active';

  return (
    <li className="list-none flex flex-col gap-2 max-w-md p-5 bg-white border border-gray-200 rounded-xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span
        className="text-xs font-medium text-gray-500 uppercase tracking-wide"
        aria-label="date booking"
      >
        {format(parseISO(booking.startTime), 'dd MMMM yyyy')}
      </span>

      <h2 className="text-lg font-semibold text-gray-900 mt-1">
        {booking.roomId}
      </h2>
      <h3 className="text-base font-medium text-gray-800">{booking.title}</h3>
      <h3 className="text-sm text-gray-600">{booking.userName}</h3>

      <span
        className={`self-start mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {isActive ? 'Активно' : 'Отменено'}
      </span>

      {isActive && (
        <button
          onClick={() => onCancel(booking.id)}
          className="self-start mt-3 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Отменить
        </button>
      )}
    </li>
  );
};

export default BookingCard;
