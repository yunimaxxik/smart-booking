import { format, parseISO } from 'date-fns';
import type { Booking } from '@/shared/interfaces/Booking';

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
  const isActive = booking.status === 'active';

  return (
    <li className="flex max-w-md list-none flex-col gap-2 rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <span
        className="text-xs font-medium uppercase tracking-wide text-[#A89279]"
        aria-label="date booking"
      >
        {format(parseISO(booking.startTime), 'dd MMMM yyyy')}
      </span>

      <h2 className="mt-1 text-lg font-semibold text-[#3D2B1F]">
        {booking.roomId}
      </h2>
      <h3 className="text-base font-medium text-[#5A4432]">{booking.theme}</h3>
      <h3 className="text-sm text-[#7A6350]">{booking.userName}</h3>

      <span
        className={`mt-2 self-start rounded-full px-3 py-1 text-xs font-semibold ${
          isActive
            ? 'bg-[#E4EFD9] text-[#4F6B3A]'
            : 'bg-[#F0DCD4] text-[#8A3B2A]'
        }`}
      >
        {isActive ? 'Активно' : 'Отменено'}
      </span>

      {isActive && (
        <button
          type="button"
          onClick={() => onCancel(booking.id)}
          className="mt-3 self-start rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-2 text-sm font-medium text-[#8A3B2A] transition-colors hover:bg-[#F3DED4] hover:text-[#6F2A1B] active:bg-[#EBD0C4] focus:outline-none focus:ring-2 focus:ring-[#D9A38A]/60"
        >
          Отменить
        </button>
      )}
    </li>
  );
};

export default BookingCard;
