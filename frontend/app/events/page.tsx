'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBasecamp } from '@/lib/store';
import EventCard from '@/components/EventCard';
import CursorGlow from '@/components/CursorGlow';
import { Search, Filter, Calendar, MapPin, Sparkles, Compass, Zap, Flame, Mountain } from 'lucide-react';

export default function EventsPage() {
  const { events } = useBasecamp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewTab, setViewTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');

  const categories = [
    'ALL',
    'AI & Systems',
    'Rust & Systems',
    'Founders & Startups',
    'Web & Architecture',
    'Community & Outdoors',
    'Open Source',
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Status check
      if (viewTab === 'UPCOMING') {
        if (evt.status !== 'PUBLISHED' && evt.status !== 'DRAFT') return false;
      }

      // Format filter
      if (selectedFormat !== 'ALL' && evt.format !== selectedFormat) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && evt.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesSummary = evt.summary.toLowerCase().includes(query);
        const matchesCategory = evt.category.toLowerCase().includes(query);
        const matchesVenue = (evt.venueName || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesCategory && !matchesVenue) {
          return false;
        }
      }

      return true;
    });
  }, [events, searchQuery, selectedFormat, selectedCategory, viewTab]);

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Interactive Desktop Mouse Cursor Spotlight */}
      <CursorGlow />

      {/* Floating Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-bc-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header with Animated Entrances */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-bc-surface/90 border border-bc-border text-bc-red mb-4 backdrop-blur-md shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
          <span>EXPEDITIONS & SESSIONS</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Community <span className="bg-gradient-to-r from-white via-bc-white to-bc-red bg-clip-text text-transparent">Expeditions</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-bc-muted leading-relaxed">
          Discover workshops, hands-on hack sprints, fireside talks, and trail treks. 
          All events are free and open to everyone — students, seasoned staff engineers, founders, and career switchers.
        </p>

        {/* Micro-badging telemetry strip */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-bc-surface/70 border border-bc-border text-[11px] font-mono text-bc-muted">
            <Zap className="w-3 h-3 text-bc-red" />
            <span>Zero Paywalls</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-bc-surface/70 border border-bc-border text-[11px] font-mono text-bc-muted">
            <Mountain className="w-3 h-3 text-emerald-400" />
            <span>Bangalore Trailheads & Hub</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-bc-surface/70 border border-bc-border text-[11px] font-mono text-bc-muted">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>RSVP Instant Digital Pass</span>
          </div>
        </div>
      </motion.div>

      {/* Filter and Search Bar Controls with Fluid Stagger */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="p-5 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/40 transition-all duration-300 space-y-4 mb-10 shadow-2xl relative z-10"
      >
        {/* Top Controls: Search + Format Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Animated Search Input */}
          <div className="relative w-full md:w-96 group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bc-muted group-focus-within:text-bc-red transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, speaker, or venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-bc-card border border-bc-border text-xs text-white placeholder:text-bc-muted/60 focus:outline-none focus:border-bc-red focus:ring-2 focus:ring-bc-red/20 transition-all"
            />
          </div>

          {/* Format Buttons with Spring Animation */}
          <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-mono text-bc-muted mr-1 hidden sm:inline">Format:</span>
            {['ALL', 'IN_PERSON', 'ONLINE', 'HYBRID'].map((fmt) => {
              const isSelected = selectedFormat === fmt;
              return (
                <motion.button
                  key={fmt}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-bc-red text-white font-bold shadow-[0_0_15px_rgba(243,41,54,0.4)]'
                      : 'bg-bc-card hover:bg-bc-card-hover border border-bc-border text-bc-muted hover:text-white'
                  }`}
                >
                  {fmt === 'ALL' ? 'All Formats' : fmt.replace('_', ' ')}
                </motion.button>
              );
            })}
          </div>

        </div>

        {/* Category Pill Filters with Liquid Pill Transitions */}
        <div className="pt-3 border-t border-bc-border/60 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-bc-muted mr-1 hidden lg:inline">Track:</span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-bc-card/80 hover:bg-bc-surface border border-bc-border text-bc-muted hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

      </motion.div>

      {/* Events Results Count Strip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-between mb-8 text-xs font-mono text-bc-muted px-1"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-bc-red animate-ping" />
          <span>Showing <strong className="text-white font-bold">{filteredEvents.length}</strong> active expeditions</span>
        </div>
        {(searchQuery || selectedFormat !== 'ALL' || selectedCategory !== 'ALL') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSearchQuery(''); setSelectedFormat('ALL'); setSelectedCategory('ALL'); }}
            className="text-bc-red hover:underline font-bold"
          >
            Clear all filters
          </motion.button>
        )}
      </motion.div>

      {/* Events Grid with Staggered Entrance and Layout Reordering */}
      <motion.div 
        layout
        className="relative z-10"
      >
        {filteredEvents.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt, idx) => (
                <motion.div
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <EventCard event={evt} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 text-center rounded-3xl bg-bc-surface/90 border border-bc-border space-y-4 max-w-xl mx-auto shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-bc-card text-bc-muted mx-auto flex items-center justify-center border border-bc-border">
              <Search className="w-7 h-7 text-bc-red" />
            </div>
            <h3 className="font-bold text-white text-lg">No expeditions match your filters</h3>
            <p className="text-xs text-bc-muted leading-relaxed">
              We couldn't find any sessions matching your query. Clear your filters or explore other tracks to see upcoming sessions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearchQuery(''); setSelectedFormat('ALL'); setSelectedCategory('ALL'); }}
              className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-lg"
            >
              Reset All Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>

    </div>
  );
}
