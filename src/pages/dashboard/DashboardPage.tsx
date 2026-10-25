import RoomList from '@/widgets/RoomList/RoomList';
import Filters from '@/widgets/Filters/Filters';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F5EFE6] px-4 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-[#3D2B1F]">
            Доска комнат
          </h1>
          <p className="mt-2 text-[#7A6350]">
            Найдите идеальное пространство для встречи
          </p>
        </header>

        <div className="rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] p-5 shadow-sm">
          <Filters />
        </div>

        <div className="mt-8">
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
