import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getRoomById } from '../../shared/api/roomApi';
import { getBookingsByRoom, createBooking } from '../../shared/api/bookingApi';
import TimeSlots from '../../widgets/TimeSlots/TimeSlots';
import BookingForm from '../../features/booking/BookingForm';
import type { CreateBookingData } from '../../shared/interfaces/CreateBookingData';

const BookingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const queryClient = useQueryClient();

  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  const roomQuery = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomById(roomId!)
  });

  const bookingQuery = useQuery({
    queryKey: ['bookings', roomId],
    queryFn: () => getBookingsByRoom(roomId!)
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', roomId] });
      setSelectedSlot(null);
    }
  });

  const handleSlotClick = (startTime: string, endTime: string) => {
    setSelectedSlot({ startTime, endTime });
  };

  const handleCancel = () => {
    setSelectedSlot(null);
  };

  const handleBookingSubmit = (data: CreateBookingData) => {
    mutation.mutate(data);
  };

  if (!roomId) {
    return (
      <div className="p-8 text-center text-red-500">Комната не найдена</div>
    );
  }

  if (roomQuery.isLoading || bookingQuery.isLoading) {
    return <div className="p-8 text-center">Загрузка данных...</div>;
  }
  if (roomQuery.error || bookingQuery.error) {
    return <div className="p-8 text-red-500">Ошибка загрузки данных</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{roomQuery.data?.name}</h1>
      <TimeSlots
        bookings={bookingQuery.data || []}
        onSlotClick={handleSlotClick}
      />
      {selectedSlot && (
        <BookingForm
          startTime={selectedSlot.startTime}
          endTime={selectedSlot.endTime}
          roomId={roomId}
          onSubmit={handleBookingSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default BookingPage;
