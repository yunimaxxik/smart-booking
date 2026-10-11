import LoginForm from '../../features/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5EFE6] px-4 py-10">
      {/* Мягкие декоративные пятна на фоне */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#E7D3B8]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-112 w-md rounded-full bg-[#C49A6C]/25 blur-3xl"
      />

      <section className="relative w-full max-w-md rounded-3xl border border-[#E4D5C1] bg-[#FAF6F0] px-8 py-12 shadow-xl shadow-[#3D2B1F]/5 sm:px-10">
        {/* Шапка */}
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A89279]">
            Smart Booking
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3D2B1F]">
            Авторизация
          </h1>
          <p className="mt-2 text-sm text-[#7A6350]">
            Войдите, чтобы бронировать переговорные
          </p>
        </div>

        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
