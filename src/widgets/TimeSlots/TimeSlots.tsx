import type { TimeSlot } from '../../shared/interfaces/TimeSlot';
import type { TimeSlotsProps } from '../../shared/interfaces/TimeSlotsProps';
import {
  startOfDay,
  setHours,
  addHours,
  areIntervalsOverlapping,
  format
} from 'date-fns';

const TimeSlots = (props: TimeSlotsProps) => {
  const { bookings, onSlotClick } = props;
  const today = startOfDay(new Date());
  const slots: TimeSlot[] = [];

  for (let hour = 9; hour < 18; hour++) {
    const startTime = setHours(today, hour);
    const endTime = addHours(startTime, 1);

    slots.push({
      startTime,
      endTime,
      isBooked: false
    });
  }

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {slots.map((slot) => {
        const isBooked = bookings.some((booking) =>
          areIntervalsOverlapping(
            { start: slot.startTime, end: slot.endTime },
            {
              start: new Date(booking.startTime),
              end: new Date(booking.endTime)
            }
          )
        );

        return (
          <button
            key={slot.startTime.toISOString()}
            type="button"
            className={`rounded-xl px-4 py-4 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50 ${
              isBooked
                ? 'cursor-not-allowed border border-[#E4D5C1] bg-[#EFE2CE] text-[#A89279]'
                : 'bg-[#8B5E34] text-[#FAF6F0] shadow-sm hover:-translate-y-0.5 hover:bg-[#6F4A29] hover:shadow-md active:bg-[#5A3B20]'
            }`}
            disabled={isBooked}
            onClick={() =>
              onSlotClick(
                slot.startTime.toISOString(),
                slot.endTime.toISOString()
              )
            }
          >
            <span className="block text-base">
              {isBooked ? 'Занято' : format(slot.startTime, 'HH:mm')}
            </span>
            {!isBooked && (
              <span className="mt-0.5 block text-xs font-normal text-[#E7D3B8]">
                до {format(slot.endTime, 'HH:mm')}
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
};

export default TimeSlots;
