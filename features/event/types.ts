export interface Event {
  id?: string;
  eventName: string;
  dateTime: Date | null;
  location: string;
  costPerPerson: number | null;
  description: string;
  flyerImageUrl: string | null;
  backgroundImageUrl: string | null;
  tickets: Ticket[];
  modules: Module[];
  additionalFields: AdditionalField[];
  status: 'draft' | 'published';
}

export interface Module {
  id: string;
  type: 'photoGallery' | 'links' | 'questionnaires' | 'announcements' | 'textBlasts' | 'invite' | 'newSection';
  config: Record<string, any>;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AdditionalField {
  id: string;
  type: 'capacity' | 'link' | 'privacy' | 'announcements' | 'questionnaires' | 'textBlasts' | 'invite' | 'newSection';
  value: string;
}

export interface AvailableModule {
  id: string;
  type: Module['type'];
  title: string;
  description: string;
  icon: string;
  price: 'Free' | 'Paid';
  usageCount: number;
  likes: number;
}

