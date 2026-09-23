import type { Room } from '../../shared/interfaces/Room';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
      <p className="text-gray-600">Вместимость: {room.capacity}</p>
      <p className="text-gray-600">Этаж: {room.floor}</p>
      <div className="flex gap-2 mt-2">
        {room.hasProjector && (
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            📽 Проектор
          </span>
        )}
        {room.hasWhiteboard && (
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            📋 Доска
          </span>
        )}
      </div>
    </div>
  );
}
