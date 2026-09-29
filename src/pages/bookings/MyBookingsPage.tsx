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
    return <div className="p-8 text-center">Загрузка бронирований...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Ошибка загрузки данных</div>;
  }

  return (
    <section>
      <h2>Список ваших бронирований</h2>
      <ul>
        {data && data.length > 0 ? (
          data.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <div>У вас пока нет бронирований</div>
        )}
      </ul>
    </section>
  );
};

export default MyBookingsPage;
