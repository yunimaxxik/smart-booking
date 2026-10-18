import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { inputClasses } from '../../shared/ui/classes';
import { useAuthStore } from '../../shared/store/authStore';
import { changePassword } from '../../shared/api/authApi';
import type { User } from '../../shared/interfaces/User';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Минимум один символ'),
    newPassword: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordProfileForm = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((store) => store.logout);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  const handleChangePassword = async (data: PasswordFormData) => {
    try {
      await changePassword(user.email, data.currentPassword, data.newPassword);

      logout();
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message });
      } else {
        setError('root', { message: 'Неизвестная ошибка' });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleChangePassword)}
      noValidate
    >
      {/* Общая ошибка */}
      {errors.root && (
        <div
          role="alert"
          className="rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-3 text-sm text-[#8A3B2A]"
        >
          {errors.root.message}
        </div>
      )}

      {/* Текущий пароль */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-[#5A4432]"
        >
          Текущий пароль
        </label>
        <input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={`${inputClasses} ${
            errors.currentPassword
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-sm text-[#8A3B2A]">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* Новый пароль */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-[#5A4432]"
        >
          Новый пароль
        </label>
        <input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={`${inputClasses} ${
            errors.newPassword
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className="text-sm text-[#8A3B2A]">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Подтверждение пароля */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-[#5A4432]"
        >
          Подтверждение пароля
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={`${inputClasses} ${
            errors.confirmPassword
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-[#8A3B2A]">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer rounded-xl bg-[#8B5E34] px-6 py-2.5 font-medium text-[#FAF6F0] shadow-sm transition-colors hover:bg-[#6F4A29] active:bg-[#5A3B20] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60 disabled:cursor-not-allowed disabled:bg-[#C9B39A] disabled:text-[#FAF6F0]/70"
      >
        {isSubmitting ? 'Меняем…' : 'Изменить пароль'}
      </button>
    </form>
  );
};

export default PasswordProfileForm;
