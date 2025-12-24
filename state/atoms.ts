import { atom } from 'recoil';
import { Event } from '@/features/event/types';

export const eventState = atom<Event>({
  key: 'eventState',
  default: {
    eventName: '',
    dateTime: null,
    location: '',
    costPerPerson: null,
    description: '',
    flyerImageUrl: null,
    backgroundImageUrl: null,
    tickets: [],
    modules: [],
    additionalFields: [],
    status: 'draft',
  },
});

export interface BackgroundColors {
  color1: string; // Primary gradient color
  color2: string; // Secondary gradient color
  color3: string; // Tertiary gradient color
  color1Rgba: string; // Primary with alpha for radial gradients
  color2Rgba: string; // Secondary with alpha for radial gradients
  color3Rgba: string; // Tertiary with alpha for radial gradients
}

export const backgroundColorsState = atom<BackgroundColors | null>({
  key: 'backgroundColorsState',
  default: null,
});

