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
      <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6] p-8 text-center text-[#8A3B2A]">
        Комната не найдена
      </div>
    );
  }

  if (roomQuery.isLoading || bookingQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F5EFE6] text-[#7A6350]">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#E4D5C1] border-t-[#8B5E34]" />
        <span>Загрузка данных…</span>
      </div>
    );
  }

  if (roomQuery.error || bookingQuery.error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6] p-8">
        <div className="rounded-2xl border border-[#D9A38A] bg-[#FBEFE8] px-6 py-4 text-[#8A3B2A]">
          Ошибка загрузки данных
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-4 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-[#A89279]">
              Бронирование
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-[#3D2B1F]">
              {roomQuery.data?.name}
            </h1>
          </div>
        </div>

        <section className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#3D2B1F]">
            Свободные слоты
          </h2>
          <TimeSlots
            bookings={bookingQuery.data || []}
            onSlotClick={handleSlotClick}
          />
        </section>

        {selectedSlot && (
          <div className="mt-6">
            <BookingForm
              startTime={selectedSlot.startTime}
              endTime={selectedSlot.endTime}
              roomId={roomId}
              onSubmit={handleBookingSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
