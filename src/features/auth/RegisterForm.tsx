import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register as registerApi } from '../../shared/api/authApi';
import { useAuthStore } from '../../shared/store/authStore';
import { inputClasses } from '../../shared/ui/classes';

const registerSchema = z
  .object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
    confirmPassword: z.string(),
    userName: z.string().min(2, 'Имя должно быть не короче 2 символов')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const handleRegister = async (data: FormData) => {
    try {
      const result = await registerApi(
        data.email,
        data.password,
        data.userName
      );
      login(result.token, result.user);
      navigate('/dashboard');
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
      className="flex min-w-full flex-col gap-5 py-5"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
    >
      {/* Общая ошибка регистрации */}
      {errors.root && (
        <div
          role="alert"
          className="rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-3 text-sm text-[#8A3B2A]"
        >
          {errors.root.message}
        </div>
      )}

      {/* Email */}
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
          autoComplete="email"
          placeholder="you@example.com"
          className={`${inputClasses} ${
            errors.email
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-[#8A3B2A]">{errors.email.message}</p>
        )}
      </div>

      {/* Username */}
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

      {/* Пароль */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-[#5A4432]"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={`${inputClasses} ${
            errors.password
              ? 'border-[#D9A38A] focus:ring-[#D9A38A]/60'
              : 'border-[#E4D5C1] focus:border-[#C49A6C]'
          }`}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-[#8A3B2A]">{errors.password.message}</p>
        )}
      </div>

      {/* Подтверждения пароля */}
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
          autoComplete="current-password"
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
        {isSubmitting ? 'Регистрируем…' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;
