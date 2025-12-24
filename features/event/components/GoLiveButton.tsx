'use client';

import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { publishEvent } from '@/state/api';
import { useState } from 'react';

export default function GoLiveButton() {
  const [event, setEvent] = useRecoilState(eventState);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleGoLive = async () => {
    // Basic validation
    if (!event.dateTime) {
      alert('Please select a date and time');
      return;
    }
    if (!event.location.trim()) {
      alert('Please enter a location');
      return;
    }

    setIsPublishing(true);
    try {
      // Create event with all collected information
      const eventData = {
        ...event,
        id: event.id || `event-${Date.now()}`,
        status: 'published' as const,
        // Ensure all fields are included
        eventName: event.eventName || 'Untitled Event',
        dateTime: event.dateTime,
        location: event.location,
        costPerPerson: event.costPerPerson,
        description: event.description,
        flyerImageUrl: event.flyerImageUrl,
        backgroundImageUrl: event.backgroundImageUrl,
        tickets: event.tickets || [],
        modules: event.modules || [],
        additionalFields: event.additionalFields || [],
      };

      publishEvent(eventData.id, setEvent, eventData);
      
      // Show success message
      console.log('Event created successfully:', eventData);
      alert('Event created and published successfully!');
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <button
      onClick={handleGoLive}
      disabled={isPublishing}
      className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-white shadow-md"
    >
      <span className="text-2xl">🚀</span>
      <span>{isPublishing ? 'Publishing...' : 'Go live'}</span>
    </button>
  );
}

