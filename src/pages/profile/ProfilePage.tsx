import UsernameProfileForm from '../../features/profile/UsernameProfileForm';
import PasswordProfileForm from '../../features/profile/PasswordProfileForm';
import AvatarProfileForm from '../../features/profile/AvatarProfileForm';
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
    <section className="flex min-h-full w-full items-start justify-center py-5">
      <div className="flex w-full max-w-4xl flex-col gap-5 px-4">
        <h2 className="text-center text-3xl font-semibold text-[#3D2B1F]">
          Мой профиль
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <aside className="w-full shrink-0 md:w-64 lg:w-72">
            <div className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-6 shadow-sm">
              <AvatarProfileForm user={user} />
            </div>
          </aside>

          <div className="flex w-full flex-col gap-6 md:min-w-0 md:flex-1">
            <div className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-6 shadow-sm">
              <UsernameProfileForm user={user} />
            </div>
            <div className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-6 shadow-sm">
              <PasswordProfileForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
