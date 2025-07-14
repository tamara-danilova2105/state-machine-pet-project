export interface User {
  id: string;
  name: string;
  department: string;
  position: string;
}

export interface TransferSlot {
  id: string;
  time: string;
  capacity: number;
  booked: number;
}

export interface AccommodationOption {
  id: string;
  type: '2x' | '3x' | '5x';
  name: string;
  description: string;
  maxGuests: number;
}

export interface Activity {
  id: string;
  name: string;
  time: string;
  capacity: number;
  booked: number;
  description: string;
  sport: string;
}

export interface Invitation {
  id: string;
  fromUser: User;
  toUserId: string;
  accommodationId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface RegistrationData {
  user: User;
  transfer?: {
    type: 'self' | 'organized';
    slotId?: string;
  };
  accommodation?: {
    optionId: string;
    guestIds: string[];
  };
  activities: string[];
  invitationId?: string;
}