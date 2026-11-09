'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventItem, Profile, Registration, ContactMessage, AuditLog, UserRole } from './types';
import {
  INITIAL_USER,
  INITIAL_EVENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_MESSAGES,
  INITIAL_AUDIT_LOGS,
} from './mock-data';

interface RegisterParams {
  eventId: string;
  name: string;
  email: string;
  occupation?: string;
}

interface BasecampContextType {
  currentUser: Profile | null;
  currentRole: UserRole | 'VISITOR';
  setCurrentRole: (role: UserRole | 'VISITOR') => void;
  updateProfile: (updates: Partial<Profile>) => void;
  events: EventItem[];
  registrations: Registration[];
  contactMessages: ContactMessage[];
  auditLogs: AuditLog[];
  registerForEvent: (params: RegisterParams) => { success: boolean; message: string; registration?: Registration };
  cancelRegistration: (registrationId: string) => { success: boolean; message: string };
  checkInAttendee: (registrationId: string) => { success: boolean; message: string };
  createEvent: (eventData: Partial<EventItem>) => EventItem;
  updateEvent: (eventId: string, updates: Partial<EventItem>) => void;
  togglePublishEvent: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => { success: boolean; message: string };
  updateMessageStatus: (id: string, status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED') => void;
  exportAttendeesCSV: (eventId?: string) => void;
  connectUser: (data: { displayName: string; email: string; occupation?: string; marketingOptIn?: boolean }) => void;
  resetAllData: () => void;
}

const BasecampContext = createContext<BasecampContextType | undefined>(undefined);

export function BasecampProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(INITIAL_USER);
  const [currentRole, setCurrentRoleState] = useState<UserRole | 'VISITOR'>('MEMBER');
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [registrations, setRegistrations] = useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('bc_events');
      const savedRegs = localStorage.getItem('bc_registrations');
      const savedMsgs = localStorage.getItem('bc_messages');
      const savedLogs = localStorage.getItem('bc_audit_logs');
      const savedRole = localStorage.getItem('bc_current_role');

      if (savedEvents) setEvents(JSON.parse(savedEvents));
      if (savedRegs) setRegistrations(JSON.parse(savedRegs));
      if (savedMsgs) setContactMessages(JSON.parse(savedMsgs));
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
      if (savedRole) {
        setCurrentRoleState(savedRole as UserRole | 'VISITOR');
        if (savedRole === 'VISITOR') {
          setCurrentUser(null);
        } else if (savedRole === 'ADMIN' || savedRole === 'SUPER_ADMIN') {
          setCurrentUser({
            ...INITIAL_USER,
            id: 'usr-admin-1',
            displayName: 'Elena Vance',
            email: 'elena@basecamp.community',
            role: 'ADMIN',
          });
        }
      }
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('bc_events', JSON.stringify(events));
      localStorage.setItem('bc_registrations', JSON.stringify(registrations));
      localStorage.setItem('bc_messages', JSON.stringify(contactMessages));
      localStorage.setItem('bc_audit_logs', JSON.stringify(auditLogs));
      localStorage.setItem('bc_current_role', currentRole);
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }, [events, registrations, contactMessages, auditLogs, currentRole, isInitialized]);

  // Switch role helper
  const setCurrentRole = (role: UserRole | 'VISITOR') => {
    setCurrentRoleState(role);
    if (role === 'VISITOR') {
      setCurrentUser(null);
    } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      setCurrentUser({
        ...INITIAL_USER,
        id: 'usr-admin-1',
        displayName: 'Elena Vance',
        email: 'elena@basecamp.community',
        role: 'ADMIN',
      });
    } else {
      setCurrentUser(INITIAL_USER);
    }
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);
  };

  const connectUser = (data: { displayName: string; email: string; occupation?: string; marketingOptIn?: boolean }) => {
    const profile: Profile = {
      id: `usr-${Date.now()}`,
      displayName: data.displayName,
      email: data.email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      occupation: data.occupation || 'Builder / Explorer',
      marketingOptIn: data.marketingOptIn ?? true,
      role: 'MEMBER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCurrentUser(profile);
    setCurrentRoleState('MEMBER');
  };

  // Register for event (Atomic validation: duplicate check, deadline, capacity, waitlist)
  const registerForEvent = ({ eventId, name, email }: RegisterParams) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event not found.' };
    }

    if (event.status !== 'PUBLISHED') {
      return { success: false, message: 'This event is not open for registrations.' };
    }

    const now = new Date();
    if (new Date(event.registrationClosesAt) < now) {
      return { success: false, message: 'Registration has closed for this event.' };
    }

    // Duplicate check
    const existing = registrations.find(
      (r) => r.eventId === eventId && r.userEmail.toLowerCase() === email.toLowerCase() && r.status !== 'CANCELLED'
    );
    if (existing) {
      return {
        success: false,
        message: 'You already have an active registration for this event.',
        registration: existing,
      };
    }

    const isFull = event.confirmedCount >= event.capacity;
    if (isFull && !event.waitlistEnabled) {
      return { success: false, message: 'This event has reached full capacity and waitlisting is closed.' };
    }

    const status = isFull ? 'WAITLISTED' : 'CONFIRMED';
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const prefix = event.category.substring(0, 3).toUpperCase();
    const ticketCode = `BC-${prefix}-${randomCode}`;

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      eventId,
      profileId: currentUser?.id || `anon-${Date.now()}`,
      userName: name,
      userEmail: email,
      status,
      registeredAt: new Date().toISOString(),
      ticketCode,
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Update event counters
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            confirmedCount: status === 'CONFIRMED' ? e.confirmedCount + 1 : e.confirmedCount,
            waitlistCount: status === 'WAITLISTED' ? e.waitlistCount + 1 : e.waitlistCount,
          };
        }
        return e;
      })
    );

    // Audit log
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      actorId: currentUser?.id || 'public-user',
      actorName: name,
      action: status === 'CONFIRMED' ? 'REGISTRATION_CONFIRMED' : 'REGISTRATION_WAITLISTED',
      resource: 'Registration',
      resourceId: newReg.id,
      metadata: { eventTitle: event.title, ticketCode },
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [log, ...prev]);

    return {
      success: true,
      message:
        status === 'CONFIRMED'
          ? `Confirmed! Your spot at "${event.title}" is reserved.`
          : `You have been placed on the priority waitlist for "${event.title}".`,
      registration: newReg,
    };
  };

  // Cancel registration
  const cancelRegistration = (registrationId: string) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return { success: false, message: 'Registration not found' };

    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, status: 'CANCELLED' } : r))
    );

    // Decrease count
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === reg.eventId) {
          return {
            ...e,
            confirmedCount: reg.status === 'CONFIRMED' ? Math.max(0, e.confirmedCount - 1) : e.confirmedCount,
            waitlistCount: reg.status === 'WAITLISTED' ? Math.max(0, e.waitlistCount - 1) : e.waitlistCount,
          };
        }
        return e;
      })
    );

    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      actorId: currentUser?.id || 'user',
      actorName: reg.userName,
      action: 'REGISTRATION_CANCELLED',
      resource: 'Registration',
      resourceId: registrationId,
      metadata: { ticketCode: reg.ticketCode },
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [log, ...prev]);

    return { success: true, message: 'Registration successfully cancelled.' };
  };

  // Attendee Check-in (FR-022)
  const checkInAttendee = (registrationId: string) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return { success: false, message: 'Attendee not found' };

    const checkInTime = new Date().toISOString();
    const actorName = currentUser?.displayName || 'Organizer';

    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === registrationId
          ? {
              ...r,
              status: 'ATTENDED',
              checkedInAt: checkInTime,
              checkedInBy: currentUser?.id || 'admin-system',
            }
          : r
      )
    );

    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      actorId: currentUser?.id || 'usr-admin-1',
      actorName,
      action: 'ATTENDEE_CHECK_IN',
      resource: 'Registration',
      resourceId: registrationId,
      metadata: { attendee: reg.userName, ticketCode: reg.ticketCode },
      createdAt: checkInTime,
    };
    setAuditLogs((prev) => [log, ...prev]);

    return { success: true, message: `Successfully checked in ${reg.userName}.` };
  };

  // Create event (FR-020)
  const createEvent = (data: Partial<EventItem>): EventItem => {
    const slug =
      data.slug ||
      (data.title || 'untitled-event')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: data.title || 'Untitled Community Event',
      slug,
      summary: data.summary || 'Summary of the event',
      description: data.description || 'Full event description...',
      category: data.category || 'Workshop',
      coverImageUrl:
        data.coverImageUrl ||
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      format: data.format || 'IN_PERSON',
      status: data.status || 'DRAFT',
      venueName: data.venueName || 'Basecamp Hub',
      venueAddress: data.venueAddress || 'Bengaluru',
      onlineJoinUrl: data.onlineJoinUrl,
      startsAt: data.startsAt || new Date(Date.now() + 86400000 * 7).toISOString(),
      endsAt: data.endsAt || new Date(Date.now() + 86400000 * 7 + 10800000).toISOString(),
      timezone: 'Asia/Kolkata',
      registrationOpensAt: new Date().toISOString(),
      registrationClosesAt: data.registrationClosesAt || new Date(Date.now() + 86400000 * 6).toISOString(),
      capacity: data.capacity || 50,
      confirmedCount: 0,
      waitlistCount: 0,
      waitlistEnabled: data.waitlistEnabled ?? true,
      audienceDescription: data.audienceDescription || 'Open to all developers, founders, creators and students.',
      speakers: data.speakers || [],
      schedule: data.schedule || [{ time: '10:00 - 12:00', title: 'Session' }],
      faqs: data.faqs || [],
      createdById: currentUser?.id || 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEvents((prev) => [newEvent, ...prev]);

    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      actorId: currentUser?.id || 'admin',
      actorName: currentUser?.displayName || 'Admin',
      action: 'EVENT_CREATED',
      resource: 'Event',
      resourceId: newEvent.id,
      metadata: { title: newEvent.title },
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [log, ...prev]);

    return newEvent;
  };

  const updateEvent = (eventId: string, updates: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e))
    );
  };

  const togglePublishEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const nextStatus = e.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
          return {
            ...e,
            status: nextStatus,
            publishedAt: nextStatus === 'PUBLISHED' ? new Date().toISOString() : undefined,
          };
        }
        return e;
      })
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // Submit Contact Form (FR-030)
  const submitContactMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    setContactMessages((prev) => [newMsg, ...prev]);
    return { success: true, message: 'Message sent! We typically respond within 24 hours.' };
  };

  const updateMessageStatus = (id: string, status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED') => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  // Export Attendees to CSV (FR-025)
  const exportAttendeesCSV = (eventId?: string) => {
    const list = eventId ? registrations.filter((r) => r.eventId === eventId) : registrations;
    if (list.length === 0) {
      alert('No attendees found to export.');
      return;
    }

    const headers = ['Registration ID', 'Event ID', 'Name', 'Email', 'Status', 'Ticket Code', 'Registered At', 'Checked In At'];
    const rows = list.map((r) => [
      r.id,
      r.eventId,
      `"${r.userName.replace(/"/g, '""')}"`,
      r.userEmail,
      r.status,
      r.ticketCode,
      r.registeredAt,
      r.checkedInAt || 'N/A',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `basecamp_attendees_${eventId || 'all'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAllData = () => {
    localStorage.clear();
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setContactMessages(INITIAL_MESSAGES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser(INITIAL_USER);
    setCurrentRoleState('MEMBER');
  };

  return (
    <BasecampContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        updateProfile,
        events,
        registrations,
        contactMessages,
        auditLogs,
        registerForEvent,
        cancelRegistration,
        checkInAttendee,
        createEvent,
        updateEvent,
        togglePublishEvent,
        deleteEvent,
        submitContactMessage,
        updateMessageStatus,
        exportAttendeesCSV,
        connectUser,
        resetAllData,
      }}
    >
      {children}
    </BasecampContext.Provider>
  );
}

export function useBasecamp() {
  const context = useContext(BasecampContext);
  if (!context) {
    throw new Error('useBasecamp must be used within a BasecampProvider');
  }
  return context;
}

