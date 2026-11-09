export type UserRole = 'MEMBER' | 'EDITOR' | 'ORGANIZER' | 'ADMIN' | 'SUPER_ADMIN';

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED';

export type EventFormat = 'IN_PERSON' | 'ONLINE' | 'HYBRID';

export type RegistrationStatus = 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED' | 'ATTENDED' | 'NO_SHOW';

export interface Profile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  occupation?: string;
  companyOrOrg?: string;
  marketingOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  coverImageUrl: string;
  format: EventFormat;
  status: EventStatus;
  venueName?: string;
  venueAddress?: string;
  onlineJoinUrl?: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  capacity: number;
  confirmedCount: number;
  waitlistCount: number;
  waitlistEnabled: boolean;
  audienceDescription: string;
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
  createdById: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  profileId: string;
  userName: string;
  userEmail: string;
  status: RegistrationStatus;
  registeredAt: string;
  checkedInAt?: string;
  checkedInBy?: string;
  ticketCode: string;
  answers?: Record<string, string>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

