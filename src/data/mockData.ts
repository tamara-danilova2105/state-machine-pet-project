import { User, TransferSlot, AccommodationOption, Activity, Invitation } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Александр Петров', department: 'IT', position: 'Разработчик' },
  { id: '2', name: 'Мария Сидорова', department: 'HR', position: 'Менеджер' },
  { id: '3', name: 'Дмитрий Иванов', department: 'Маркетинг', position: 'Аналитик' },
  { id: '4', name: 'Екатерина Козлова', department: 'Финансы', position: 'Бухгалтер' },
  { id: '5', name: 'Андрей Смирнов', department: 'IT', position: 'Тестировщик' },
  { id: '6', name: 'Ольга Федорова', department: 'HR', position: 'Рекрутер' },
  { id: '7', name: 'Сергей Попов', department: 'Продажи', position: 'Менеджер' },
  { id: '8', name: 'Анна Волкова', department: 'Дизайн', position: 'UI/UX дизайнер' },
];

export const transferSlots: TransferSlot[] = [
  { id: '1', time: '18:00', capacity: 50, booked: 45 },
  { id: '2', time: '18:30', capacity: 50, booked: 32 },
  { id: '3', time: '19:00', capacity: 50, booked: 28 },
  { id: '4', time: '19:30', capacity: 50, booked: 15 },
];

export const accommodationOptions: AccommodationOption[] = [
  {
    id: '1',
    type: '2x',
    name: 'Двухместный номер',
    description: 'Уютный номер для двух человек с удобствами',
    maxGuests: 2
  },
  {
    id: '2',
    type: '3x',
    name: 'Трехместный номер',
    description: 'Просторный номер для трех человек',
    maxGuests: 3
  },
  {
    id: '3',
    type: '5x',
    name: 'Пятиместный номер',
    description: 'Большой номер для компании друзей',
    maxGuests: 5
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Футбол',
    time: '11:00',
    capacity: 22,
    booked: 18,
    description: 'Товарищеский матч на футбольном поле',
    sport: 'football'
  },
  {
    id: '2',
    name: 'Волейбол',
    time: '11:00',
    capacity: 12,
    booked: 8,
    description: 'Игра в волейбол на пляже',
    sport: 'volleyball'
  },
  {
    id: '3',
    name: 'Теннис',
    time: '12:00',
    capacity: 8,
    booked: 4,
    description: 'Турнир по настольному теннису',
    sport: 'tennis'
  },
  {
    id: '4',
    name: 'Баскетбол',
    time: '12:00',
    capacity: 10,
    booked: 6,
    description: 'Стритбол на открытой площадке',
    sport: 'basketball'
  },
  {
    id: '5',
    name: 'Плавание',
    time: '13:00',
    capacity: 15,
    booked: 12,
    description: 'Заплыв в бассейне',
    sport: 'swimming'
  },
  {
    id: '6',
    name: 'Бадминтон',
    time: '13:00',
    capacity: 8,
    booked: 3,
    description: 'Игра в бадминтон',
    sport: 'badminton'
  }
];

export const mockInvitations: Invitation[] = [
  {
    id: '1',
    fromUser: mockUsers[0],
    toUserId: '2',
    accommodationId: '1',
    status: 'pending'
  }
];

export const currentUser = mockUsers[0];