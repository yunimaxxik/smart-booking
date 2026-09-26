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
    return <div className="animate-spin">Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </ul>
  );
};

export default RoomList;
