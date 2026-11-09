'use client';

import React, { useState } from 'react';
import { EventItem, Registration } from '@/lib/types';
import { useBasecamp } from '@/lib/store';
import { 
  X, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface RegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const { currentUser, registerForEvent, registrations } = useBasecamp();
  
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [occupation, setOccupation] = useState(currentUser?.occupation || '');
  const [agree, setAgree] = useState(true);
  const [result, setResult] = useState<{ success: boolean; message: string; registration?: Registration } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return null;

  // Check if existing registration for current user email
  const existingReg = registrations.find(
    (r) => r.eventId === event.id && (r.userEmail.toLowerCase() === email.toLowerCase() || (currentUser && r.profileId === currentUser.id)) && r.status !== 'CANCELLED'
  );

  const remainingSeats = Math.max(0, event.capacity - event.confirmedCount);
  const isFull = remainingSeats <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerForEvent({
        eventId: event.id,
        name: name.trim(),
        email: email.trim(),
        occupation: occupation.trim(),
      });
      setResult(res);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bc-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-bc-surface border border-bc-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Accent Red */}
        <div className="flex items-center justify-between p-5 border-b border-bc-border bg-bc-card">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-bc-surface border border-bc-border text-bc-red">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-bc-white tracking-wide uppercase">
                {result?.success ? 'Ticket Issued' : 'Event Registration'}
              </h3>
              <p className="text-xs text-bc-muted truncate max-w-[280px]">
                {event.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-bc-muted hover:text-white hover:bg-bc-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {result?.success ? (
            /* Success Ticket Screen */
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {result.registration?.status === 'CONFIRMED' ? 'Spot Confirmed!' : 'Added to Waitlist!'}
                </h4>
                <p className="text-xs text-bc-muted">
                  {result.message}
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              {result.registration && (
                <div className="relative rounded-xl border border-bc-border bg-gradient-to-br from-bc-card to-bc-black p-5 overflow-hidden shadow-lg">
                  {/* Perforated ticket cutouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-bc-surface border border-bc-border -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-bc-surface border border-bc-border -translate-y-1/2" />

                  <div className="flex items-start justify-between pb-3 border-b border-dashed border-bc-border">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-bc-red font-bold">
                        BASECAMP PASS
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                        {event.title}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-bc-surface border border-bc-border text-white">
                      {result.registration.ticketCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-bc-muted uppercase">Attendee</span>
                      <div className="font-medium text-white truncate">{result.registration.userName}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-bc-muted uppercase">Format</span>
                      <div className="font-medium text-white">{event.format}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-bc-muted uppercase">Date</span>
                      <div className="font-medium text-white">
                        {new Date(event.startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-bc-muted uppercase">Status</span>
                      <div className={`font-mono font-bold ${result.registration.status === 'CONFIRMED' ? 'text-green-400' : 'text-amber-400'}`}>
                        {result.registration.status}
                      </div>
                    </div>
                  </div>

                  {/* QR simulation */}
                  <div className="pt-3 border-t border-dashed border-bc-border flex items-center justify-between text-xs text-bc-muted">
                    <span className="text-[11px] font-mono">Present pass at check-in desk</span>
                    <div className="w-9 h-9 rounded bg-white p-1 flex items-center justify-center">
                      <QrCode className="w-7 h-7 text-black" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Link
                  href="/account/registrations"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-center text-xs font-mono font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-colors"
                >
                  View in My Passes
                </Link>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono bg-bc-card hover:bg-bc-surface border border-bc-border text-bc-muted hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Event Quick Facts */}
              <div className="p-3.5 rounded-xl bg-bc-card border border-bc-border/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-bc-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bc-red" />
                    {new Date(event.startsAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-bc-muted" />
                    {new Date(event.startsAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-bc-muted">
                  <MapPin className="w-3.5 h-3.5 text-bc-red shrink-0" />
                  <span className="truncate">{event.venueName || event.venueAddress || 'Online'}</span>
                </div>

                {/* Capacity Bar */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-bc-muted mb-1">
                    <span>Capacity Status</span>
                    <span className={remainingSeats <= 5 ? 'text-bc-red font-bold' : 'text-bc-white'}>
                      {remainingSeats} spots remaining ({event.confirmedCount}/{event.capacity})
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-bc-surface rounded-full overflow-hidden border border-bc-border">
                    <div 
                      className={`h-full transition-all duration-300 ${isFull ? 'bg-amber-400' : 'bg-bc-red'}`}
                      style={{ width: `${Math.min(100, (event.confirmedCount / event.capacity) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Already registered warning */}
              {existingReg && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Active registration found:</span> You already have a ticket ({existingReg.ticketCode}) for this event under this email.
                  </div>
                </div>
              )}

              {/* Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                    Full Name <span className="text-bc-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-bc-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                    Email Address <span className="text-bc-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-bc-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                    Role / What You Do
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Software Engineer, Student, Founder, Designer..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-bc-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                  />
                  <p className="text-[11px] text-bc-muted mt-1">
                    Basecamp welcomes anyone interested in technology, craft, and community.
                  </p>
                </div>
              </div>

              {result && !result.success && (
                <div className="p-3 rounded-xl bg-bc-red/10 border border-bc-red/30 text-bc-red text-xs">
                  {result.message}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !!existingReg}
                className={`w-full py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                  existingReg
                    ? 'bg-bc-border text-bc-muted cursor-not-allowed'
                    : isFull
                    ? 'bg-amber-500 hover:bg-amber-600 text-black'
                    : 'bg-bc-red hover:bg-bc-red-hover text-white shadow-[0_0_20px_rgba(243,41,54,0.35)]'
                }`}
              >
                {isSubmitting ? (
                  <span>Reserving Ticket...</span>
                ) : existingReg ? (
                  <span>Already Registered</span>
                ) : isFull ? (
                  <span>Join Priority Waitlist</span>
                ) : (
                  <span>Confirm Free Registration</span>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

