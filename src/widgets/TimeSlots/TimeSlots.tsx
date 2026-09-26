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
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            className={`p-4 rounded-lg font-medium transition-colors ${
              isBooked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            disabled={isBooked}
            onClick={() =>
              onSlotClick(
                slot.startTime.toISOString(),
                slot.endTime.toISOString()
              )
            }
          >
            {isBooked === true ? 'Занято' : format(slot.startTime, 'HH:mm')}
          </button>
        );
      })}
    </section>
  );
};

export default TimeSlots;
