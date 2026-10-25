import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getRoomById } from '@/shared/api/roomApi';
import { getBookingsByRoom, createBooking } from '@/shared/api/bookingApi';
import TimeSlots from '@/widgets/TimeSlots/TimeSlots';
import BookingForm from '@/features/booking/BookingForm';
import type { CreateBookingData } from '@/shared/interfaces/CreateBookingData';

// Локальная дата в формате YYYY-MM-DD (без сдвига из-за UTC)
const toDateInputValue = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const BookingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();

  const today = toDateInputValue(new Date());

  const [date, setDate] = useState(searchParams.get('date') ?? today);

  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  const queryClient = useQueryClient();

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (next && next < today) return;
    setDate(next || today);
    setSelectedSlot(null);
  };

  const toIso = (time: string) => {
    if (time.includes('T')) return time;
    const hhmm = time.slice(0, 5);
    return `${date}T${hhmm}:00`;
  };

  const handleSlotClick = (startTime: string, endTime: string) => {
    setSelectedSlot({
      startTime: toIso(startTime),
      endTime: toIso(endTime)
    });
  };

  const handleCancel = () => setSelectedSlot(null);

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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#3D2B1F]">
                Свободные слоты
              </h2>
              <p className="mt-1 text-sm text-[#7A6350]">
                {format(parseISO(date), 'd MMMM yyyy')}
                {date === today ? ' — сегодня' : ''}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="date"
                className="text-sm font-medium text-[#5A4432]"
              >
                Дата
              </label>
              <input
                id="date"
                type="date"
                min={today}
                value={date}
                onChange={handleDateChange}
                className="rounded-xl border border-[#E4D5C1] bg-[#FAF6F0] px-3 py-2 text-sm text-[#3D2B1F] focus:border-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60"
              />
            </div>
          </div>

          <TimeSlots
            date={date}
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
