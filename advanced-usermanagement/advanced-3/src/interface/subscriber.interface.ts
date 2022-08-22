import { LocationInterface } from './location.interface';

export interface SubscriberData {
  id: number;
  location?: LocationInterface;
  time?: string;
}
