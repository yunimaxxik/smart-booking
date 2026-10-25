import { Link } from 'react-router-dom';
import type { Room } from '@/shared/interfaces/Room';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <li className="group overflow-hidden rounded-2xl border border-[#E4D5C1] bg-[#FAF6F0] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/booking/${room.id}`}
        className="block"
      >
        <div className="h-24 bg-linear-to-br from-[#E7D3B8] via-[#D8BC97] to-[#C49A6C]" />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-[#3D2B1F] transition-colors group-hover:text-[#8B5E34]">
            {room.name}
          </h3>

          <div className="mt-2 space-y-1 text-sm text-[#7A6350]">
            <p>Вместимость: {room.capacity} чел.</p>
            <p>Этаж: {room.floor}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {room.hasProjector && (
              <span className="rounded-full bg-[#EFE2CE] px-3 py-1 text-xs font-medium text-[#6F4A29]">
                📽 Проектор
              </span>
            )}
            {room.hasWhiteboard && (
              <span className="rounded-full bg-[#EFE2CE] px-3 py-1 text-xs font-medium text-[#6F4A29]">
                📋 Доска
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
