'use client';

import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { updateEvent } from '@/state/api';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker() {
  const [event, setEvent] = useRecoilState(eventState);

  const handleDateChange = (date: Date | null) => {
    updateEvent({ dateTime: date }, setEvent, event);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Date and time';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200 relative">
      <span className="text-2xl">🗓️</span>
      <DatePickerLib
        selected={event.dateTime}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy, h:mm aa"
        placeholderText="Date and time"
        className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none border-none w-full"
        wrapperClassName="flex-1 w-full relative z-10"
        popperClassName="react-datepicker-popper !z-[99999]"
        popperModifiers={[
          {
            name: 'zIndex',
            options: {
              zIndex: 99999,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              rootBoundary: 'viewport',
              tether: false,
              altAxis: true,
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom'],
              padding: 8,
            },
          },
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
        customInput={
          <input
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none w-full text-base"
            readOnly
            value={formatDate(event.dateTime)}
            placeholder="Date and time"
          />
        }
      />
    </div>
  );
}

