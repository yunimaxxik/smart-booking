import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuthStore } from '../../shared/store/authStore';
import { updateProfile } from '../../shared/api/authApi';

const userSchema = z.object({
  userName: z.string().min(2, 'Никнейм должен быть не короче 2 символов')
});

type User = z.infer<typeof userSchema>;

const inputClasses =
  'w-full rounded-xl border bg-[#FAF6F0] px-4 py-2.5 text-[#3D2B1F] placeholder-[#A89279] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50';

const ProfileForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const user = useAuthStore((store) => store.user);
  const login = useAuthStore((store) => store.login);
  const token = useAuthStore((store) => store.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: { userName: user?.userName || '' }
  });

  if (!user) {
    return (
      <div className="rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-3 text-sm text-[#8A3B2A]">
        Пользователь не найден
      </div>
    );
  }

  const handleChange = async (data: User) => {
    try {
      const result = await updateProfile(user.email, data.userName);
      login(token!, result);
      setSuccessMessage('Профиль успешно обновлен');
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
      onSubmit={handleSubmit(handleChange)}
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
      {successMessage && (
        <div
          role="alert"
          className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {successMessage}
        </div>
      )}

      {/* Email (только для чтения) */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-[#5A4432]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          disabled
          className={`${inputClasses} cursor-not-allowed border-[#E4D5C1] text-[#A89279] opacity-70`}
        />
      </div>

      {/* Никнейм */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="userName"
          className="text-sm font-medium text-[#5A4432]"
        >
          Никнейм
        </label>
        <input
          id="userName"
          type="text"
          autoComplete="username"
          placeholder="test123"
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer rounded-xl bg-[#8B5E34] px-6 py-2.5 font-medium text-[#FAF6F0] shadow-sm transition-colors hover:bg-[#6F4A29] active:bg-[#5A3B20] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60 disabled:cursor-not-allowed disabled:bg-[#C9B39A] disabled:text-[#FAF6F0]/70"
      >
        {isSubmitting ? 'Сохраняем…' : 'Сохранить'}
      </button>
    </form>
  );
};

export default ProfileForm;
