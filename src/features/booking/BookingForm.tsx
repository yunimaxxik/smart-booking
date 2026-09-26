import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useAuthStore } from '../../shared/store/authStore';
import type { CreateBookingData } from '../../shared/interfaces/CreateBookingData';

interface BookingFormProps {
  startTime: string;
  endTime: string;
  roomId: string;
  onSubmit: (data: CreateBookingData) => void | Promise<void>;
  onCancel: () => void;
}

const BookingFormSchema = z.object({
  theme: z.string().min(3, 'Минимум 3 символа'),
  userName: z.string().min(3, 'Имя слишком маленькое')
});

type BookingFormData = z.infer<typeof BookingFormSchema>;

const BookingForm = (props: BookingFormProps) => {
  const { startTime, endTime, roomId, onSubmit, onCancel } = props;
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      userName: user?.email || ''
    }
  });

  const formattedTime = `${format(new Date(startTime), 'dd MMMM yyyy, HH:mm')} - ${format(new Date(endTime), 'HH:mm')}`;

  const handleBookForm = (data: BookingFormData) => {
    onSubmit({ ...data, startTime, endTime, roomId });
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit(handleBookForm)}
    >
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        id="theme"
        type="text"
        placeholder="Тема встречи"
        {...register('theme')}
      />
      {errors.theme && <p className="text-red-500">{errors.theme.message}</p>}
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        id="userName"
        type="text"
        placeholder="Имя участника"
        {...register('userName')}
      />
      {errors.userName && (
        <p className="text-red-500">{errors.userName.message}</p>
      )}
      <div className="bg-gray-100 p-3 rounded-lg text-center text-gray-700 mb-4">
        {formattedTime}
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        type="submit"
        disabled={isSubmitting}
      >
        Забронировать
      </button>
      <button
        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
        type="button"
        onClick={onCancel}
      >
        Отмена
      </button>
    </form>
  );
};

export default BookingForm;
