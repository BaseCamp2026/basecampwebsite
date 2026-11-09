'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useBasecamp } from '@/lib/store';
import RegistrationModal from '@/components/RegistrationModal';
import CursorGlow from '@/components/CursorGlow';
import TiltCard from '@/components/TiltCard';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  Share2, 
  Check, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Activity,
  Zap,
  Mountain
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { events } = useBasecamp();

  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Event Not Found</h2>
        <p className="text-sm text-bc-muted mb-6">The expedition you are looking for does not exist or has been archived.</p>
        <Link
          href="/events"
          className="px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold bg-bc-red text-white"
        >
          Back to All Events
        </Link>
      </div>
    );
  }

  const startsDate = new Date(event.startsAt);
  const endsDate = new Date(event.endsAt);
  const remainingSpots = Math.max(0, event.capacity - event.confirmedCount);
  const percentFull = Math.min(100, Math.round((event.confirmedCount / event.capacity) * 100));

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Ambient background glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Breadcrumb & Share */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8 text-xs font-mono text-bc-muted relative z-10"
      >
        <Link
          href="/events"
          className="inline-flex items-center gap-2 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-bc-red group-hover:-translate-x-1 transition-transform" />
          <span>Back to Expeditions</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bc-surface border border-bc-border hover:border-bc-red/50 text-white transition-colors shadow-md"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-bc-red" />}
          <span>{copied ? 'Link Copied!' : 'Share Expedition'}</span>
        </motion.button>
      </motion.div>

      {/* Main Grid: Left 2 cols Content, Right 1 col Sticky Registration Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        
        {/* Left Column: Event Hero & Content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Cover & Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-bc-border/80 aspect-[16/9] shadow-2xl group"
          >
            <img
              src={event.coverImageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bc-black/95 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-bc-black/85 backdrop-blur-md text-white border border-white/10 shadow-lg">
                {event.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-bc-red text-white shadow-[0_0_15px_rgba(243,41,54,0.4)]">
                {event.format.replace('_', ' ')}
              </span>
            </div>

            {/* In-Person / Online Status Stamp */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bc-surface/90 border border-bc-border backdrop-blur-md text-xs font-mono text-bc-white">
              <span className="w-2 h-2 rounded-full bg-bc-red animate-ping" />
              <span>{remainingSpots > 0 ? `${remainingSpots} spots available` : 'Waitlist Active'}</span>
            </div>
          </motion.div>

          {/* Title & Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-bc-muted leading-relaxed">
              {event.summary}
            </p>
          </motion.div>

          {/* Deep Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-bc-border/80 pt-8 space-y-4"
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-bc-red flex items-center gap-2">
              <Zap className="w-4 h-4" />
              About This Expedition
            </h3>
            <div className="text-sm text-bc-muted leading-relaxed whitespace-pre-line p-5 rounded-2xl bg-bc-surface/60 border border-bc-border/70 backdrop-blur-md">
              {event.description}
            </div>
          </motion.div>

          {/* Inclusivity & Audience Notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <TiltCard withBeam className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-bc-card text-bc-red border border-bc-border shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs space-y-1.5">
                <h4 className="font-bold text-white text-base">Who Can Attend?</h4>
                <p className="text-bc-muted leading-relaxed text-xs">
                  {event.audienceDescription}
                </p>
                <div className="text-xs font-mono text-bc-red pt-1 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Open to students, working professionals, founders, and hobbyists alike.</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-t border-bc-border/80 pt-8 space-y-6"
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-bc-red flex items-center gap-2">
                <Users className="w-4 h-4" />
                Featured Mentors & Speakers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((spk, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-bc-surface/80 border border-bc-border hover:border-bc-red/50 transition-all flex items-center gap-4 shadow-lg backdrop-blur-md"
                  >
                    <img
                      src={spk.avatarUrl}
                      alt={spk.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-bc-border"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">{spk.name}</div>
                      <div className="text-xs text-bc-red font-mono">{spk.role}</div>
                      {spk.bio && <div className="text-[11px] text-bc-muted mt-1 line-clamp-2">{spk.bio}</div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Schedule Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="border-t border-bc-border/80 pt-8 space-y-6"
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-bc-red flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Schedule & Roadmap
              </h3>
              <div className="space-y-3">
                {event.schedule.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-4 rounded-2xl bg-bc-surface/80 border border-bc-border/70 hover:border-bc-red/40 items-start transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-xs font-bold text-bc-red whitespace-nowrap min-w-[100px] pt-0.5">
                        {item.time}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      {item.speaker && (
                        <div className="text-[11px] text-bc-muted font-mono mt-0.5">
                          Speaker: {item.speaker}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Animated Accordion FAQs */}
          {event.faqs && event.faqs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t border-bc-border/80 pt-8 space-y-4"
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-bc-red flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {event.faqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl bg-bc-surface/80 border border-bc-border overflow-hidden transition-colors hover:border-bc-red/40"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <span className="text-xs font-bold text-white">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-bc-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-bc-red' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="px-4 pb-4 text-xs text-bc-muted leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </div>

        {/* Right Column: Sticky Action & Logistics Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="sticky top-28"
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/90 backdrop-blur-2xl border border-bc-border space-y-6 shadow-2xl">
              
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bc-muted">Expedition Pass</span>
                <div className="text-3xl font-black text-white mt-1">Free Admission</div>
                <p className="text-xs text-bc-muted mt-1">Community supported. Zero paywalls.</p>
              </div>

              {/* Logistics list */}
              <div className="space-y-3.5 text-xs border-y border-bc-border py-5">
                <div className="flex items-start gap-3 text-bc-muted">
                  <Calendar className="w-4 h-4 text-bc-red shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">
                      {startsDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-bc-muted">
                  <Clock className="w-4 h-4 text-bc-red shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">
                      {startsDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} – {endsDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST
                    </div>
                    <div className="text-[11px] font-mono text-bc-muted">Timezone: {event.timezone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-bc-muted">
                  <MapPin className="w-4 h-4 text-bc-red shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">{event.venueName || 'Online'}</div>
                    {event.venueAddress && (
                      <div className="text-[11px] text-bc-muted mt-0.5">{event.venueAddress}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Capacity Counter Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-bc-muted">Capacity Status</span>
                  <span className={remainingSpots <= 5 ? 'text-bc-red font-bold' : 'text-white'}>
                    {remainingSpots > 0 ? `${remainingSpots} spots remaining` : 'Waitlist open'}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-bc-card rounded-full overflow-hidden border border-bc-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentFull}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full ${percentFull >= 90 ? 'bg-bc-red' : percentFull >= 70 ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                  />
                </div>
                <div className="text-[11px] font-mono text-bc-muted text-right mt-1.5">
                  {event.confirmedCount} / {event.capacity} seats confirmed
                </div>
              </div>

              {/* Main Action Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setModalOpen(true)}
                className="w-full py-4 rounded-2xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_25px_rgba(243,41,54,0.45)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{remainingSpots > 0 ? 'Register For Free' : 'Join Waitlist'}</span>
              </motion.button>

              <div className="text-[11px] text-bc-muted text-center leading-relaxed">
                Instant digital pass generated upon confirmation with QR code check-in credential.
              </div>

            </TiltCard>
          </motion.div>
        </div>

      </div>

      {modalOpen && (
        <RegistrationModal event={event} onClose={() => setModalOpen(false)} />
      )}

    </div>
  );
}
