import { SetterOrUpdater } from 'recoil';
import { Event, AvailableModule } from '@/features/event/types';

// Mock backend functions - easy to replace with real API calls (1-2 lines per function)

export const saveDraft = (event: Event, setEvent: SetterOrUpdater<Event>) => {
  // Current: Update Recoil atom directly
  setEvent({ ...event, status: 'draft' });
  
  // Real backend: 
  // return fetch('/api/drafts', { 
  //   method: 'POST', 
  //   body: JSON.stringify(event),
  //   headers: { 'Content-Type': 'application/json' }
  // });
};

export const uploadImage = async (
  file: File, 
  type: 'flyer' | 'background',
  setEvent: SetterOrUpdater<Event>,
  currentEvent: Event
): Promise<string> => {
  // Current: Return mock URL, update Recoil
  const mockUrl = URL.createObjectURL(file);
  
  if (type === 'flyer') {
    setEvent({ ...currentEvent, flyerImageUrl: mockUrl });
    console.log(`[API] 🎨 Flyer image URL updated in state:`, mockUrl);
  } else {
    setEvent({ ...currentEvent, backgroundImageUrl: mockUrl });
    console.log(`[API] 🖼️ Background image URL updated in state:`, {
      url: mockUrl,
      timestamp: new Date().toISOString(),
      willTriggerColorExtraction: true,
    });
  }
  
  return mockUrl;
  
  // Real backend: 
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('type', type);
  // const response = await fetch('/api/upload', { method: 'POST', body: formData });
  // const data = await response.json();
  // return data.url;
};

export const getAvailableModules = (): AvailableModule[] => {
  // Current: Return mock module list
  return [
    {
      id: 'questionnaires',
      type: 'questionnaires',
      title: 'Questionnaires',
      description: 'Create questionnaires for your event. Hosts can create questions and view responses.',
      icon: 'IconList',
      price: 'Free',
      usageCount: 446,
      likes: 406,
    },
    {
      id: 'newSection',
      type: 'newSection',
      title: 'New section',
      description: 'Add a custom section to showcase anything you want on your event page.',
      icon: 'IconNewSection',
      price: 'Free',
      usageCount: 817,
      likes: 277,
    },
    {
      id: 'invite',
      type: 'invite',
      title: 'Invite',
      description: 'Personally invite each and every guest within seconds',
      icon: 'Invite',
      price: 'Paid',
      usageCount: 340000,
      likes: 150000,
    },
    {
      id: 'photoGallery',
      type: 'photoGallery',
      title: 'Photo Gallery',
      description: 'Add photos for guests to view and relive the vibe.',
      icon: 'Photos',
      price: 'Free',
      usageCount: 342,
      likes: 302,
    },
    {
      id: 'links',
      type: 'links',
      title: 'Links',
      description: 'Share links to event guides, menus, playlists, and more.',
      icon: 'Links',
      price: 'Free',
      usageCount: 832,
      likes: 292,
    },
    {
      id: 'announcements',
      type: 'announcements',
      title: 'Announcements',
      description: 'Post updates & messages to keep your guests informed.',
      icon: 'Announcements',
      price: 'Free',
      usageCount: 686,
      likes: 146,
    },
    {
      id: 'textBlasts',
      type: 'textBlasts',
      title: 'Text blasts',
      description: 'Send text messages directly to your guest\'s phone number to keep your guests informed.',
      icon: 'TextBlasts',
      price: 'Free',
      usageCount: 565,
      likes: 25,
    },
  ];
  
  // Real backend: 
  // return fetch('/api/modules').then(res => res.json());
};

export const addModule = (
  moduleType: AvailableModule['type'],
  setEvent: SetterOrUpdater<Event>,
  currentEvent: Event
) => {
  // Current: Update Recoil atom
  const newModule = {
    id: `${moduleType}-${Date.now()}`,
    type: moduleType,
    config: {},
  };
  
  setEvent({
    ...currentEvent,
    modules: [...currentEvent.modules, newModule],
  });
  
  // Real backend:
  // return fetch('/api/events/${eventId}/modules', {
  //   method: 'POST',
  //   body: JSON.stringify({ type: moduleType }),
  //   headers: { 'Content-Type': 'application/json' }
  // });
};

export const publishEvent = (
  eventId: string | undefined,
  setEvent: SetterOrUpdater<Event>,
  currentEvent: Event
) => {
  // Current: Update Recoil atom with all event data
  const eventToPublish: Event = {
    ...currentEvent,
    status: 'published',
    id: eventId || `event-${Date.now()}`,
    // Ensure all fields are preserved
    eventName: currentEvent.eventName || 'Untitled Event',
    dateTime: currentEvent.dateTime,
    location: currentEvent.location || '',
    costPerPerson: currentEvent.costPerPerson,
    description: currentEvent.description || '',
    flyerImageUrl: currentEvent.flyerImageUrl,
    backgroundImageUrl: currentEvent.backgroundImageUrl,
    tickets: currentEvent.tickets || [],
    modules: currentEvent.modules || [],
    additionalFields: currentEvent.additionalFields || [],
  };
  
  setEvent(eventToPublish);
  
  // Log the event data for debugging
  console.log('[API] Event created and published:', {
    id: eventToPublish.id,
    eventName: eventToPublish.eventName,
    dateTime: eventToPublish.dateTime,
    location: eventToPublish.location,
    costPerPerson: eventToPublish.costPerPerson,
    description: eventToPublish.description,
    modules: eventToPublish.modules.length,
    additionalFields: eventToPublish.additionalFields.length,
    status: eventToPublish.status,
  });
  
  // Real backend:
  // return fetch('/api/events', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(eventToPublish),
  // });
};

export const updateEvent = (
  updates: Partial<Event>,
  setEvent: SetterOrUpdater<Event>,
  currentEvent: Event
) => {
  // Current: Update Recoil atom
  setEvent({ ...currentEvent, ...updates });
  
  // Real backend:
  // return fetch(`/api/events/${eventId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(updates),
  //   headers: { 'Content-Type': 'application/json' }
  // });
};

