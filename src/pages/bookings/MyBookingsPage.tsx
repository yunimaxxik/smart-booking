import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelBooking, getAllBookings } from '@/shared/api/bookingApi';
import BookingCard from '@/entities/booking/BookingCard';

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
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <div className="mb-6 h-7 w-64 animate-pulse rounded-lg bg-[#E4D5C1]" />
        <ul className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="h-40 animate-pulse rounded-2xl border border-[#E4D5C1] bg-[#EFE2CE]"
            />
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#D9A38A] bg-[#FBEFE8] p-4 text-[#8A3B2A]"
        >
          <svg
            className="mt-0.5 h-5 w-5 shrink-0"
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
            <p className="text-sm text-[#8A3B2A]/75">
              Попробуйте обновить страницу или повторите попытку позже.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const hasBookings = data && data.length > 0;

  return (
    <section className="min-h-screen bg-[#F5EFE6] px-4 py-10 sm:px-8 lg:px-16">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#3D2B1F]">
            Мои бронирования
          </h2>
          <p className="text-sm text-[#7A6350]">
            {hasBookings
              ? `Всего: ${data.length}`
              : 'Здесь появятся ваши брони'}
          </p>
        </div>
      </header>

      {hasBookings ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#D8C7B0] bg-[#FAF6F0] px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E4D5C1] bg-[#EFE2CE]">
            <svg
              className="h-6 w-6 text-[#8B5E34]"
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
            <p className="font-medium text-[#3D2B1F]">
              У вас пока нет бронирований
            </p>
            <p className="text-sm text-[#7A6350]">
              Выберите комнату и оформите первую бронь.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookingsPage;
