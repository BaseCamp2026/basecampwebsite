'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EventItem } from '@/lib/types';
import { Calendar, Clock, MapPin, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import RegistrationModal from './RegistrationModal';

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const startsDate = new Date(event.startsAt);
  const formattedDate = startsDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedDay = startsDate.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedTime = startsDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const remainingSpots = Math.max(0, event.capacity - event.confirmedCount);
  const percentFull = Math.min(100, Math.round((event.confirmedCount / event.capacity) * 100));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="group relative flex flex-col rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/80 hover:border-bc-red/60 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-[0_16px_40px_-10px_rgba(243,41,54,0.25)]"
      >
        {/* Dynamic Card Mouse Spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(243, 41, 54, 0.14), transparent 70%)`,
            }}
          />
        )}

        {/* Card Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bc-card">
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bc-surface via-transparent to-transparent opacity-90" />

          {/* Top Badges with Material UI Chips */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
            <Chip
              label={event.category}
              size="small"
              sx={{
                bgcolor: 'rgba(8, 8, 8, 0.85)',
                color: '#F5F3EF',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: 24,
                fontWeight: 700,
              }}
            />
          </div>

          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bc-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bc-red" />
            </span>
            <Chip
              label={event.format.replace('_', ' ')}
              size="small"
              sx={{
                bgcolor: event.format === 'IN_PERSON' ? 'rgba(243, 41, 54, 0.85)' : 'rgba(59, 130, 246, 0.85)',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                height: 24,
                fontWeight: 700,
              }}
            />
          </div>

          {/* Date Stamp Floating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bc-black/90 backdrop-blur-md border border-white/10 shadow-md z-20">
            <div className="text-center font-mono leading-none">
              <span className="block text-[10px] uppercase text-bc-red font-bold">{formattedDay}</span>
              <span className="text-sm font-black text-white">{formattedDate}</span>
            </div>
            <div className="h-4 w-px bg-bc-border" />
            <span className="text-xs font-mono text-bc-muted">{formattedTime} IST</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between relative z-20">
          <div>
            <Link href={`/events/${event.slug}`}>
              <h3 className="font-sans font-bold text-lg text-white group-hover:text-bc-white group-hover:underline decoration-bc-red underline-offset-4 transition-colors line-clamp-2 leading-snug">
                {event.title}
              </h3>
            </Link>

            <p className="mt-2 text-xs text-bc-muted line-clamp-2 leading-relaxed">
              {event.summary}
            </p>

            {/* Venue / Location */}
            <Tooltip title={event.venueAddress || 'Online joining instructions available upon RSVP'} arrow>
              <div className="mt-4 flex items-center gap-2 text-xs text-bc-muted truncate cursor-pointer hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-bc-red shrink-0" />
                <span className="truncate">{event.venueName || event.onlineJoinUrl || 'Basecamp Hub'}</span>
              </div>
            </Tooltip>
          </div>

          {/* Card Footer: Capacity & Register Button */}
          <div className="mt-5 pt-4 border-t border-bc-border/60">
            {/* Spots capacity indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
              <span className="text-bc-muted">Capacity Status</span>
              <span className={remainingSpots <= 5 ? 'text-bc-red font-bold' : 'text-white'}>
                {remainingSpots > 0 ? `${remainingSpots} spots remaining` : 'Waitlist open'}
              </span>
            </div>

            {/* Material UI LinearProgress styled with Basecamp Red */}
            <LinearProgress
              variant="determinate"
              value={percentFull}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                mb: 2.5,
                '& .MuiLinearProgress-bar': {
                  bgcolor: percentFull >= 90 ? '#F32936' : percentFull >= 70 ? '#FBBF24' : '#10B981',
                  borderRadius: 3,
                  transition: 'transform 0.5s ease-in-out',
                },
              }}
            />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex-1 py-2 px-3 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_15px_rgba(243,41,54,0.25)] flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{remainingSpots > 0 ? 'Register Free' : 'Join Waitlist'}</span>
              </motion.button>

              <Tooltip title="View Schedule, Speakers & FAQs" arrow>
                <Link
                  href={`/events/${event.slug}`}
                  className="p-2 rounded-xl bg-bc-card hover:bg-bc-surface border border-bc-border text-bc-muted hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
      </motion.div>

      {modalOpen && (
        <RegistrationModal event={event} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
