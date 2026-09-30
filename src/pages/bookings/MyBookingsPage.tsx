import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelBooking, getAllBookings } from '../../shared/api/bookingApi';
import BookingCard from '../../entities/booking/BookingCard';

const MyBookingsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: () => getAllBookings()
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  const handleCancel = (bookingId: string) => {
    cancelMutation.mutate(bookingId);
  };

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-6" />
        <ul className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="h-40 bg-gray-100 border border-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
        >
          <svg
            className="w-5 h-5 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 5a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z"
            />
          </svg>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Не удалось загрузить бронирования</p>
            <p className="text-sm text-red-600/80">
              Попробуйте обновить страницу или повторите попытку позже.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const hasBookings = data && data.length > 0;

  return (
    <section>
      <header className="flex items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-900">Мои бронирования</h2>
          <p className="text-sm text-gray-500">
            {hasBookings
              ? `Всего: ${data.length}`
              : 'Здесь появятся ваши брони'}
          </p>
        </div>
      </header>

      {hasBookings ? (
        <ul className="flex flex-col gap-4">
          {data.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 bg-gray-50 border border-dashed border-gray-300 rounded-2xl text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-900">
              У вас пока нет бронирований
            </p>
            <p className="text-sm text-gray-500">
              Выберите комнату и оформите первую бронь.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookingsPage;
