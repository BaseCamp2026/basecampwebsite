'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useBasecamp } from '@/lib/store';
import CursorGlow from '@/components/CursorGlow';
import TiltCard from '@/components/TiltCard';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  XCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Zap,
  Mountain
} from 'lucide-react';

export default function MyRegistrationsPage() {
  const { currentUser, registrations, events, cancelRegistration } = useBasecamp();
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Member Sign In Required</h2>
        <p className="text-xs text-bc-muted mb-4">Please sign in or select Member role in the navigation bar.</p>
        <Link href="/" className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-bc-red text-white">
          Return Home
        </Link>
      </div>
    );
  }

  // Filter registrations matching current user email or profileId
  const myRegistrations = registrations.filter(
    (r) => r.profileId === currentUser.id || r.userEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Atmospheric lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bc-border pb-8 relative z-10"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-bc-surface border border-bc-border text-bc-red mb-3">
            <Ticket className="w-3.5 h-3.5" />
            <span>MY ADMISSION PASSES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            My Expeditions & Boarding Passes
          </h1>
          <p className="text-xs sm:text-sm text-bc-muted mt-2">
            Present your digital boarding pass and QR code at the check-in desk upon arrival.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-all self-start sm:self-auto shadow-[0_0_20px_rgba(243,41,54,0.35)] shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find More Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Registrations List */}
      <div className="relative z-10">
        {myRegistrations.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence>
              {myRegistrations.map((reg, idx) => {
                const event = events.find((e) => e.id === reg.eventId);
                if (!event) return null;

                const startsDate = new Date(event.startsAt);
                const isCancelled = reg.status === 'CANCELLED';

                return (
                  <motion.div
                    key={reg.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <TiltCard
                      withBeam={!isCancelled}
                      className={`relative rounded-3xl border ${
                        isCancelled
                          ? 'border-bc-border/40 bg-bc-surface/30 opacity-60'
                          : 'border-bc-border bg-gradient-to-br from-bc-surface via-bc-card to-bc-surface'
                      } p-6 sm:p-8 overflow-hidden shadow-2xl`}
                    >
                      {/* Perforation notches for boarding pass visual theme */}
                      <div className="hidden sm:block absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-bc-black border border-bc-border -translate-y-1/2 z-20" />
                      <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-bc-black border border-bc-border -translate-y-1/2 z-20" />

                      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        
                        {/* Left: Event Details */}
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-bc-red">
                              {event.category}
                            </span>
                            <span className="text-bc-border">•</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              reg.status === 'CONFIRMED'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : reg.status === 'ATTENDED'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                : reg.status === 'WAITLISTED'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {reg.status}
                            </span>
                          </div>

                          <Link href={`/events/${event.slug}`}>
                            <h3 className="text-xl sm:text-2xl font-bold text-white hover:text-bc-red transition-colors">
                              {event.title}
                            </h3>
                          </Link>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-bc-muted">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-bc-red" />
                              {startsDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-bc-muted" />
                              {startsDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-bc-red" />
                              {event.venueName || 'Online'}
                            </span>
                          </div>
                        </div>

                        {/* Middle / Right: Pass Card & QR code */}
                        <div className="flex items-center gap-6 sm:border-l sm:border-bc-border sm:pl-8 self-stretch justify-between sm:justify-end">
                          <div className="text-left sm:text-right">
                            <div className="text-[10px] font-mono text-bc-muted uppercase">Ticket Code</div>
                            <div className="font-mono text-sm sm:text-lg font-black text-white tracking-widest text-glow">
                              {reg.ticketCode}
                            </div>
                            <div className="text-[10px] text-bc-muted font-mono mt-0.5">
                              Pioneer: {reg.userName}
                            </div>
                          </div>

                          {/* Interactive QR code box with hover pulse */}
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xl cursor-pointer"
                          >
                            <QrCode className="w-full h-full text-black" />
                          </motion.div>
                        </div>

                      </div>

                      {/* Footer Bar: Cancel Option */}
                      {!isCancelled && reg.status !== 'ATTENDED' && (
                        <div className="mt-6 pt-4 border-t border-bc-border/60 flex items-center justify-between text-xs">
                          <span className="text-[11px] font-mono text-bc-muted">
                            Need to free up your spot for another builder?
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (confirm(`Are you sure you want to cancel your pass for "${event.title}"?`)) {
                                cancelRegistration(reg.id);
                              }
                            }}
                            className="text-xs font-mono text-bc-muted hover:text-bc-red transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg bg-bc-surface border border-bc-border"
                          >
                            <XCircle className="w-3.5 h-3.5 text-bc-red" />
                            <span>Cancel Registration</span>
                          </motion.button>
                        </div>
                      )}
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 text-center rounded-3xl bg-bc-surface/90 border border-bc-border space-y-4 max-w-lg mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-bc-card text-bc-muted mx-auto flex items-center justify-center border border-bc-border">
              <Ticket className="w-8 h-8 text-bc-red" />
            </div>
            <h3 className="font-bold text-white text-xl">No active boarding passes</h3>
            <p className="text-xs text-bc-muted leading-relaxed">
              You haven't reserved admission tickets for any upcoming Basecamp expeditions yet. Explore our workshops and sessions to claim your spot.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-mono font-bold bg-bc-red hover:bg-bc-red-hover text-white shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Events & Register Free</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
