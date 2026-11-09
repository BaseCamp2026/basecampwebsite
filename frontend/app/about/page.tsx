'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BasecampLogo from '@/components/BasecampLogo';
import CursorGlow from '@/components/CursorGlow';
import TiltCard from '@/components/TiltCard';
import { 
  Mountain, 
  Compass, 
  Shield, 
  Users, 
  Heart, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  Code,
  Flame,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  const organizers = [
    {
      name: 'Elena Vance',
      role: 'Lead Community Steward',
      bio: 'Former systems engineer turned community builder. Passionate about creating low-friction spaces for ambitious makers.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Devika Rao',
      role: 'Technical Program Director',
      bio: 'Staff AI researcher directing Basecamp masterclasses and open multi-agent research initiatives.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Arjun Nambiar',
      role: 'Founder Expeditions & Treks',
      bio: 'Angel investor, trail runner, and bootstrapped software founder coordinating our monthly outdoor hikes.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24 overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Atmospheric lighting */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with Basecamp Emblem */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl space-y-6 relative z-10"
      >
        <div className="flex items-center gap-4">
          <BasecampLogo size="sm" withGlow animated />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-bc-surface border border-bc-border text-bc-red">
            <Compass className="w-3.5 h-3.5" />
            <span>OUR STORY & MANIFESTO</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Where Builders Gather Before the{' '}
          <span className="bg-gradient-to-r from-white via-bc-white to-bc-red bg-clip-text text-transparent">
            Ascent
          </span>
        </h1>
        
        <p className="text-base sm:text-xl text-bc-muted leading-relaxed">
          In mountaineering, a basecamp is the shared haven where climbers acclimatize, check their gear, plan routes, 
          and build trusting partnerships before tackling the peak. That is exactly what we are for creators and technologists.
        </p>
      </motion.div>

      {/* Non-Negotiable Inclusivity Principle Showcase with Border Beam */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <TiltCard withBeam className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-bc-surface via-bc-card to-bc-surface border border-bc-red/40 shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase font-bold text-bc-red bg-bc-black/80 border border-bc-red/40">
              <span className="w-2 h-2 rounded-full bg-bc-red animate-ping" />
              <span>Non-Negotiable Community Principle</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Basecamp is Open to Everyone — Not Limited to Students
            </h2>

            <p className="text-sm sm:text-base text-bc-muted leading-relaxed">
              Most tech hubs are either closed campus clubs or corporate enterprise silos. Basecamp is explicitly both and neither. 
              We deliberately place a 19-year-old student hacker, a 34-year-old principal infrastructure architect, 
              a first-time founder, and a self-taught indie creator at the very same table.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-white">
              <div className="flex items-center gap-1.5 text-bc-red">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Gatekeeping</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Peer-to-Peer Learning</span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Radical Transparency</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* The Four Basecamp Principles as 3D TiltCards */}
      <div className="space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono uppercase font-bold text-bc-red tracking-widest">
            Foundational Tenets
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
            The Four Basecamp Principles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-3 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-bc-red font-bold">01 / HONEST CRAFT</span>
                  <div className="w-8 h-8 rounded-lg bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
                    <Terminal className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Zero Vanity, Real Substance</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  We talk about production failures, latency bottlenecks, memory leaks, and distribution struggles. We celebrate what actually works in practice, not elevator pitches.
                </p>
              </div>
              <div className="text-[11px] font-mono text-bc-muted pt-3 border-t border-bc-border/60">
                Focus: Production Engineering & Resilience
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-3 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-bc-red font-bold">02 / CODE & ARTIFACTS</span>
                  <div className="w-8 h-8 rounded-lg bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
                    <Code className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Build First, Debate Later</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Talk is cheap. We love working prototypes, open-source repositories, design systems, and tangible experiments you can touch, fork, and test.
                </p>
              </div>
              <div className="text-[11px] font-mono text-bc-muted pt-3 border-t border-bc-border/60">
                Focus: Open Source & Tangible Proof
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-3 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-bc-red font-bold">03 / CROSS-DISCIPLINE</span>
                  <div className="w-8 h-8 rounded-lg bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
                    <Mountain className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Wilderness & Code</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Computers are tools, but humans live in the real world. We combine intense weekend coding sprints with dawn mountain treks to keep our minds sharp and grounded.
                </p>
              </div>
              <div className="text-[11px] font-mono text-bc-muted pt-3 border-t border-bc-border/60">
                Focus: Mental Clarity & Trail Expeditions
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-3 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-bc-red font-bold">04 / RADICAL GENEROSITY</span>
                  <div className="w-8 h-8 rounded-lg bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Pay Knowledge Forward</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Senior practitioners freely share architectural lessons without hoarding gatekeeper status. Everyone has something to teach and something to learn.
                </p>
              </div>
              <div className="text-[11px] font-mono text-bc-muted pt-3 border-t border-bc-border/60">
                Focus: Mentorship & Reciprocity
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>

      {/* Organizers Section with Spring Hover Lift */}
      <div className="space-y-10 border-t border-bc-border pt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono uppercase font-bold text-bc-red tracking-widest">
            Leadership & Stewards
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Organized with Care</h2>
          <p className="text-xs text-bc-muted mt-1">
            Our organizers maintain community standards, review session proposals, and lead expeditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizers.map((org, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/50 transition-all flex flex-col items-center text-center shadow-xl group"
            >
              <div className="relative mb-5">
                <img
                  src={org.avatarUrl}
                  alt={org.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-bc-border group-hover:border-bc-red transition-colors shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-bc-red text-white shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="font-bold text-white text-lg">{org.name}</h3>
              <span className="text-xs font-mono text-bc-red mb-3 font-semibold">{org.role}</span>
              <p className="text-xs text-bc-muted leading-relaxed">{org.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code of Conduct CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-3xl bg-bc-surface/90 backdrop-blur-xl border border-bc-border hover:border-bc-red/40 transition-colors flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative z-10"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-white text-xl">Read Our Community Code of Conduct</h3>
          <p className="text-xs text-bc-muted max-w-xl">
            We maintain an uncompromised zero-tolerance policy against harassment, elitism, and discrimination.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_15px_rgba(243,41,54,0.3)] shrink-0 inline-flex items-center gap-2"
          >
            <span>Contact Organizers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>

    </div>
  );
}
