'use client';

import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { updateEvent } from '@/state/api';
import { Ticket } from '../types';

export default function TicketSection() {
  const [event, setEvent] = useRecoilState(eventState);

  const handleAddTicket = () => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      name: '',
      price: 0,
      quantity: 0,
    };
    updateEvent({ tickets: [...event.tickets, newTicket] }, setEvent, event);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <span className="text-xl">💵</span>
      <div className="flex-1">
        <button
          onClick={handleAddTicket}
          className="text-white/80 hover:text-white transition-colors text-left"
        >
          <div className="font-medium">Add tickets (optional)</div>
          <div className="text-sm text-white/60">Tickets can only be created before going live</div>
        </button>
      </div>
    </div>
  );
}

