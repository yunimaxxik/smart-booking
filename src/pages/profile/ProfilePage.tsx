import UsernameProfileForm from '../../features/profile/UsernameProfileForm';
import PasswordProfileForm from '../../features/profile/PasswordProfileForm';
import { useAuthStore } from '../../shared/store/authStore';

const ProfilePage = () => {
  const user = useAuthStore((store) => store.user);

  if (!user) {
    return (
      <div className="rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-3 text-sm text-[#8A3B2A]">
        Пользователь не найден
      </div>
    );
  }

  return (
    <section className="flex min-h-full w-full items-center justify-center py-5">
      <div className="flex w-full max-w-md flex-col gap-5 px-4">
        <h2 className="text-center text-3xl font-semibold text-[#3D2B1F]">
          Мой профиль
        </h2>

        <UsernameProfileForm user={user} />
        <PasswordProfileForm user={user} />
      </div>
    </section>
  );
};

export default ProfilePage;
