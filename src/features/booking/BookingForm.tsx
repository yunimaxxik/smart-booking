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

  const formattedTime = `${format(new Date(startTime), 'dd MMMM yyyy, HH:mm')} – ${format(new Date(endTime), 'HH:mm')}`;

  const handleBookForm = (data: BookingFormData) => {
    onSubmit({ ...data, startTime, endTime, roomId });
  };

  const inputClasses =
    'w-full rounded-xl border bg-[#FAF6F0] px-4 py-2.5 text-[#3D2B1F] placeholder-[#A89279] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50';

  return (
    <form
      className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-6 shadow-sm"
      onSubmit={handleSubmit(handleBookForm)}
    >
      {/* Выбранное время */}
      <div className="mb-6 rounded-xl border border-[#E4D5C1] bg-[#EFE2CE] px-4 py-3 text-center">
        <p className="text-xs uppercase tracking-wide text-[#A89279]">
          Выбранное время
        </p>
        <p className="mt-1 font-medium text-[#3D2B1F]">{formattedTime}</p>
      </div>

      {/* Тема встречи */}
      <div className="mb-4 flex flex-col gap-1.5">
        <label
          htmlFor="theme"
          className="text-sm font-medium text-[#5A4432]"
        >
          Тема встречи
        </label>
        <input
          id="theme"
          type="text"
          placeholder="Например, синк по проекту"
          className={`${inputClasses} ${
            errors.theme
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('theme')}
        />
        {errors.theme && (
          <p className="text-sm text-[#8A3B2A]">{errors.theme.message}</p>
        )}
      </div>

      {/* Имя участника */}
      <div className="mb-6 flex flex-col gap-1.5">
        <label
          htmlFor="userName"
          className="text-sm font-medium text-[#5A4432]"
        >
          Имя участника
        </label>
        <input
          id="userName"
          type="text"
          placeholder="Ваше имя или email"
          className={`${inputClasses} ${
            errors.userName
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('userName')}
        />
        {errors.userName && (
          <p className="text-sm text-[#8A3B2A]">{errors.userName.message}</p>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[#E4D5C1] bg-transparent px-6 py-2.5 font-medium text-[#5A4432] transition-colors hover:bg-[#EFE2CE] hover:text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-[#8B5E34] px-6 py-2.5 font-medium text-[#FAF6F0] shadow-sm transition-colors hover:bg-[#6F4A29] active:bg-[#5A3B20] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60 disabled:cursor-not-allowed disabled:bg-[#C9B39A] disabled:text-[#FAF6F0]/70"
        >
          {isSubmitting ? 'Бронируем…' : 'Забронировать'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
