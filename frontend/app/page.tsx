'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useBasecamp } from '@/lib/store';
import BackgroundScrollCanvas from '@/components/BackgroundScrollCanvas';
import EventCard from '@/components/EventCard';
import ConnectModal from '@/components/ConnectModal';
import CursorGlow from '@/components/CursorGlow';
import AnimatedCounter from '@/components/AnimatedCounter';
import TiltCard from '@/components/TiltCard';
import BasecampLogo from '@/components/BasecampLogo';
import ActivityTicker from '@/components/ActivityTicker';
import AscentHUD from '@/components/AscentHUD';
import { 
  ArrowRight, 
  ArrowDown,
  Sparkles, 
  Terminal, 
  Flame, 
  Mountain, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  CheckCircle2, 
  Send,
  Zap,
  Shield,
  Layers,
  Compass
} from 'lucide-react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

export default function HomePage() {
  const { events, submitContactMessage } = useBasecamp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [interestEmail, setInterestEmail] = useState('');
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const categories = ['ALL', 'AI & Systems', 'Rust & Systems', 'Founders & Startups', 'Community & Outdoors'];

  const publishedEvents = events.filter((e) => e.status === 'PUBLISHED');

  const filteredEvents =
    selectedCategory === 'ALL'
      ? publishedEvents.slice(0, 6)
      : publishedEvents.filter((e) => e.category === selectedCategory);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestEmail) return;
    submitContactMessage({
      name: 'Community Interest',
      email: interestEmail,
      subject: 'Newsletter / Community Membership Interest',
      message: 'Subscribed from homepage interest banner.',
    });
    setInterestSubmitted(true);
    setInterestEmail('');
  };

  const scrollToExpeditions = () => {
    const el = document.getElementById('expeditions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white overflow-hidden">
      
      {/* 1. MOUSE-DRIVEN CURSOR SPOTLIGHT */}
      <CursorGlow />

      {/* 2. PERSISTENT BACKGROUND IMAGE SEQUENCE CONTROLLED VIA GSAP SCROLLTRIGGER */}
      <BackgroundScrollCanvas
        totalFrames={100}
        framePrefix="/sequence/ezgif-frame-"
      />

      {/* FOREGROUND CONTENT LAYER (Z-10) */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
          
          {/* Basecamp Brand Mountain Crest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-8 relative flex flex-col items-center justify-center"
          >
            <div className="absolute -inset-10 bg-bc-red/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <BasecampLogo size="lg" withGlow animated />
          </motion.div>

          {/* Floating Orbiting Micro-Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute left-8 top-1/3 items-center gap-2 px-3.5 py-1.5 rounded-full bg-bc-surface/70 border border-bc-border/80 backdrop-blur-md text-[11px] font-mono text-bc-white shadow-xl"
          >
            <Zap className="w-3.5 h-3.5 text-bc-red" />
            <span>Autonomous AI Systems</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden lg:flex absolute right-8 top-1/3 items-center gap-2 px-3.5 py-1.5 rounded-full bg-bc-surface/70 border border-bc-border/80 backdrop-blur-md text-[11px] font-mono text-bc-white shadow-xl"
          >
            <Mountain className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sunrise Mountain Treks</span>
          </motion.div>

          {/* Top Pill with Pulsing Radar Ring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono bg-bc-surface/85 border border-bc-border text-white mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(243,41,54,0.15)] group hover:border-bc-red/50 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bc-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bc-red" />
            </span>
            <span className="text-bc-muted">AN OPEN COMMUNITY:</span>
            <strong className="text-white">NOT LIMITED TO STUDENTS</strong>
          </motion.div>

          {/* Main Title with Animated Text Gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.08] drop-shadow-2xl"
          >
            Where Builders Gather Before the{' '}
            <span className="relative inline-block text-white group">
              <span className="relative z-10 bg-gradient-to-r from-white via-bc-white to-bc-red bg-clip-text text-transparent">
                Ascent
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 h-1.5 bg-bc-red rounded-full shadow-[0_0_15px_#F32936]" 
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-bc-muted max-w-3xl leading-relaxed backdrop-blur-sm p-3 rounded-2xl"
          >
            Basecamp is an open, multidisciplinary gathering bringing together founders, systems engineers, 
            creators, designers, and ambitious students for hands-on workshops, build sprints, and mountain trail treks.
          </motion.p>

          {/* Action CTAs with Micro-animations */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setConnectModalOpen(true)}
              className="px-7 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(243,41,54,0.45)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Connect & RSVP</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToExpeditions}
              className="px-7 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-surface/80 hover:bg-bc-card border border-bc-border text-white hover:text-white transition-all backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <span>Explore Expeditions</span>
              <ArrowDown className="w-4 h-4 text-bc-red animate-bounce" />
            </motion.button>
          </motion.div>

          {/* Scroll Cue Notice */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex items-center gap-2 text-xs font-mono text-bc-muted/90 bg-bc-surface/70 border border-bc-border/60 px-4 py-2 rounded-full backdrop-blur-md shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-bc-red animate-ping" />
            <span>Scroll mouse down — the Basecamp mountain background transforms with your scroll</span>
          </motion.div>

        </section>

        {/* 2. LIVE COMMUNITY ACTIVITY MARQUEE TICKER */}
        <ActivityTicker />

        {/* 3. ANIMATED STATS STRIP WITH COUNT-UP NUMBERS */}
        <section className="border-y border-bc-border/80 bg-bc-surface/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-bc-border/50">
              
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-mono font-black text-white">
                  <AnimatedCounter to={2400} suffix="+" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-bc-muted mt-1.5">Community Members</div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-mono font-black text-bc-red">
                  <AnimatedCounter to={48} suffix="+" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-bc-muted mt-1.5">Workshops & Talks</div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-mono font-black text-white">
                  <AnimatedCounter to={100} suffix="%" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-bc-muted mt-1.5">Free & Open Participation</div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-mono font-black text-bc-white">
                  <AnimatedCounter to={1} />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-bc-muted mt-1.5">Shared Mountain Peak</div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. "NOT JUST FOR STUDENTS" INCLUSIVITY SHOWCASE WITH 3D TILT CARDS */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-mono uppercase font-bold tracking-widest text-bc-red">
              Inclusive by Design
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Who Belongs at Basecamp?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-bc-muted">
              We actively bridge the gap between academia, industry, and independent creation. Everyone with curiosity and intent is welcome.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TiltCard withBeam className="p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/80 hover:border-bc-red/60 transition-all duration-300 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-5 border border-bc-border shadow-md">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">
                    Working Professionals & Engineers
                  </h3>
                  <p className="text-xs text-bc-muted leading-relaxed">
                    Explore technologies outside your day job stack, discuss distributed architecture trade-offs, and mentor rising builders.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                  <span>Mentorship & Systems Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TiltCard withBeam className="p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/80 hover:border-bc-red/60 transition-all duration-300 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-5 border border-bc-border shadow-md">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">
                    Founders & Indie Makers
                  </h3>
                  <p className="text-xs text-bc-muted leading-relaxed">
                    Find technical co-founders, get real user feedback without marketing fluff, and participate in candid product teardowns.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                  <span>Founders Firesides & Demos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TiltCard withBeam className="p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/80 hover:border-bc-red/60 transition-all duration-300 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-5 border border-bc-border shadow-md">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">
                    Students & Career Switchers
                  </h3>
                  <p className="text-xs text-bc-muted leading-relaxed">
                    Skip theoretical slides and write production-grade systems alongside senior practitioners. Build real portfolio proof.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                  <span>Hands-on Code & PR Sprints</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </section>

        {/* 5. SCHEDULED EXPEDITIONS DIRECTORY WITH ANIMATED REORDERING */}
        <section id="expeditions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-bc-border/80">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-bc-red">
                Upcoming Sessions
              </span>
              <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
                Scheduled Expeditions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-bc-muted">
                Free to register. Space is limited to maintain interactive depth.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setConnectModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-bc-surface hover:bg-bc-card border border-bc-border text-white transition-colors shadow-sm"
              >
                Connect & RSVP
              </button>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-bc-red hover:text-white transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Category Filter Chips with Material UI & Fluid Transitions */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  onClick={() => setSelectedCategory(cat)}
                  color={isSelected ? 'primary' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: isSelected ? 700 : 500,
                    px: 1,
                    py: 2,
                    borderRadius: '12px',
                    borderColor: isSelected ? '#F32936' : '#303030',
                    bgcolor: isSelected ? '#F32936' : 'rgba(21, 21, 21, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      bgcolor: isSelected ? '#D81C29' : 'rgba(32, 32, 32, 0.9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                />
              );
            })}
          </div>

          {/* Event Cards Grid with Framer Motion AnimatePresence reordering */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt) => (
                <motion.div
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard event={evt} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 6. WHAT WE DO / COMMUNITY PILLARS */}
        <section className="py-24 border-t border-bc-border/80 bg-bc-surface/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-bc-red">
                Core Activities
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                The Basecamp Experience
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <TiltCard withBeam className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-md border border-bc-border shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-4 border border-bc-border">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">Masterclasses</h4>
                <p className="text-xs text-bc-muted leading-relaxed">
                  High-density deep dives on systems engineering, compilers, multi-agent frameworks, and cloud architecture.
                </p>
              </TiltCard>

              <TiltCard withBeam className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-md border border-bc-border shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-4 border border-bc-border">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">Open Collabs</h4>
                <p className="text-xs text-bc-muted leading-relaxed">
                  Saturday build sprints where people assemble teams or hack solo on ambitious open-source tools.
                </p>
              </TiltCard>

              <TiltCard withBeam className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-md border border-bc-border shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-4 border border-bc-border">
                  <Mountain className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">Wilderness Treks</h4>
                <p className="text-xs text-bc-muted leading-relaxed">
                  Sunrise mountain climbs and trailhead breakfasts. Disconnecting from screens to spark genuine bonds.
                </p>
              </TiltCard>

              <TiltCard withBeam className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-md border border-bc-border shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red mb-4 border border-bc-border">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">Founders Fireside</h4>
                <p className="text-xs text-bc-muted leading-relaxed">
                  Raw, private post-mortems and growth stories from founders who survived near-death company moments.
                </p>
              </TiltCard>

            </div>
          </div>
        </section>

        {/* 7. COMMUNITY TESTIMONIALS */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase font-bold tracking-widest text-bc-red">
              Community Voices
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              What Members Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TiltCard className="p-7 rounded-3xl bg-bc-surface/80 backdrop-blur-xl border border-bc-border flex flex-col justify-between shadow-xl">
              <p className="text-xs text-bc-muted leading-relaxed italic">
                "Basecamp is the only tech community I've attended where students ask questions as equals alongside senior staff engineers. The vibe is humble, gritty, and builder-focused."
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-bc-border/60">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Member"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Rishi Venkatesh</div>
                  <div className="text-[10px] text-bc-muted font-mono">Infrastructure Architect</div>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="p-7 rounded-3xl bg-bc-surface/80 backdrop-blur-xl border border-bc-border flex flex-col justify-between shadow-xl">
              <p className="text-xs text-bc-muted leading-relaxed italic">
                "I met my current startup co-founder during a Basecamp Saturday open hack. No slide decks, no investor pitches — just two people building something together at a table."
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-bc-border/60">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
                  alt="Member"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Ananya Sundaram</div>
                  <div className="text-[10px] text-bc-muted font-mono">Co-founder @ HyperScale</div>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="p-7 rounded-3xl bg-bc-surface/80 backdrop-blur-xl border border-bc-border flex flex-col justify-between shadow-xl">
              <p className="text-xs text-bc-muted leading-relaxed italic">
                "The monthly sunrise trek to Nandi Hills cleared my head more than any conference ever did. Basecamp understands that great creative minds need nature and real talk."
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-bc-border/60">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                  alt="Member"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Sameer Kapoor</div>
                  <div className="text-[10px] text-bc-muted font-mono">Design Lead & Hiker</div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* 8. NEWSLETTER STRIP */}
        <section className="py-20 border-t border-bc-border/80 bg-gradient-to-b from-bc-card to-bc-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-bc-surface border border-bc-border text-bc-red mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Stay in the Basecamp Loop
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-bc-muted max-w-lg mx-auto">
              Get early event registration drops, workshop materials, and community announcements. No spam, ever.
            </p>

            {interestSubmitted ? (
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                You are on the list! Welcome to the Basecamp circle.
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={interestEmail}
                  onChange={(e) => setInterestEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-xl bg-bc-surface border border-bc-border text-xs text-white placeholder:text-bc-muted/60 focus:outline-none focus:border-bc-red"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-colors shrink-0 shadow-[0_0_15px_rgba(243,41,54,0.3)]"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </section>

      </div>

      {/* ASCENT ALTITUDE TELEMETRY HUD */}
      <AscentHUD />

      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />

    </div>
  );
}
