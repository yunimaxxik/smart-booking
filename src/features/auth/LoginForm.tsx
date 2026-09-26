import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login as loginApi } from '../../shared/api/authApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен быть не короче 6 символов')
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const handleAuth = async (data: FormData) => {
    try {
      const result = await loginApi(data.email, data.password);
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
    <form onSubmit={handleSubmit(handleAuth)}>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label htmlFor="password">
        <input
          id="password"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
