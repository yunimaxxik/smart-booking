import ProfileForm from '../../features/profile/ProfileForm';

const ProfilePage = () => {
  return (
    <section className="flex min-h-full w-full items-center justify-center py-5">
      <div className="flex w-full max-w-md flex-col gap-5 px-4">
        <h2 className="text-center text-3xl font-semibold text-[#3D2B1F]">
          Мой профиль
        </h2>
        <ProfileForm />
      </div>
    </section>
  );
};

export default ProfilePage;
