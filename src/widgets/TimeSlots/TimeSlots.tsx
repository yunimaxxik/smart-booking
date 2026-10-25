import { useEffect, useState } from 'react';
import type { TimeSlot } from '../../shared/interfaces/TimeSlot';
import type { TimeSlotsProps } from '../../shared/interfaces/TimeSlotsProps';
import {
  parseISO,
  setHours,
  addHours,
  areIntervalsOverlapping,
  format
} from 'date-fns';

const TimeSlots = (props: TimeSlotsProps) => {
  const { date, bookings, onSlotClick } = props;

  const dayStart = parseISO(date);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const slots: TimeSlot[] = [];

  for (let hour = 9; hour < 18; hour++) {
    const startTime = setHours(dayStart, hour);
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

        const isPast = slot.startTime.getTime() <= now;
        const isDisabled = isBooked || isPast;

        return (
          <button
            key={slot.startTime.toISOString()}
            type="button"
            className={`rounded-xl px-4 py-4 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50 ${
              isDisabled
                ? 'cursor-not-allowed border border-[#E4D5C1] bg-[#EFE2CE] text-[#A89279]'
                : 'bg-[#8B5E34] text-[#FAF6F0] shadow-sm hover:-translate-y-0.5 hover:bg-[#6F4A29] hover:shadow-md active:bg-[#5A3B20]'
            }`}
            disabled={isDisabled}
            onClick={() =>
              onSlotClick(
                slot.startTime.toISOString(),
                slot.endTime.toISOString()
              )
            }
          >
            <span
              className={`block text-base ${
                isPast && !isBooked ? 'line-through' : ''
              }`}
            >
              {isBooked ? 'Занято' : format(slot.startTime, 'HH:mm')}
            </span>

            {!isDisabled && (
              <span className="mt-0.5 block text-xs font-normal text-[#E7D3B8]">
                до {format(slot.endTime, 'HH:mm')}
              </span>
            )}

            {isPast && !isBooked && (
              <span className="mt-0.5 block text-xs font-normal text-[#A89279]">
                прошло
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
};

export default TimeSlots;
