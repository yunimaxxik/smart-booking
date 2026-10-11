import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../../shared/api/roomApi';
import { RoomCard } from '../../entities/room/RoomCard';
import { useFilterStore } from '../../shared/store/filtersStore';

const RoomList = () => {
  const hasProjector = useFilterStore((state) => state.hasProjector);
  const hasWhiteboard = useFilterStore((state) => state.hasWhiteboard);
  const minCapacity = useFilterStore((state) => state.minCapacity);

  const { isLoading, error, data } = useQuery({
    queryKey: ['rooms', hasProjector, hasWhiteboard, minCapacity],
    queryFn: () => getRooms({ hasProjector, hasWhiteboard, minCapacity })
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-[#7A6350]">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#E4D5C1] border-t-[#8B5E34]" />
        <span>Загрузка комнат…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#D9A38A] bg-[#FBEFE8] p-6 text-center text-[#8A3B2A]">
        Не удалось загрузить комнаты: {error.message}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#D8C7B0] bg-[#FAF6F0] p-10 text-center text-[#7A6350]">
        По заданным фильтрам комнаты не найдены
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </ul>
  );
};

export default RoomList;
