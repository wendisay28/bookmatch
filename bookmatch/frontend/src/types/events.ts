export interface EventHost {
  name: string;
  avatar: string;
  userId?: string;
}

export interface Event {
  id: string | number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  image: string;
  host: EventHost;
  isPremium: boolean;
  createdAt?: any;
}

export interface NewEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: string;
  isPremium: boolean;
}

export const EVENT_CATEGORIES = [
  'Todos',
  'Club de Lectura',
  'Taller',
  'Intercambio',
  'Presentación',
  'Poesía'
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];
