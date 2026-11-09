'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBasecamp } from '@/lib/store';
import CursorGlow from '@/components/CursorGlow';
import AnimatedCounter from '@/components/AnimatedCounter';
import TiltCard from '@/components/TiltCard';
import { 
  Users, 
  Terminal, 
  Flame, 
  Mountain, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Coffee,
  Code,
  Zap,
  Send
} from 'lucide-react';

export default function CommunityPage() {
  const { submitContactMessage } = useBasecamp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    githubOrUrl: '',
    interest: 'Systems & Engineering',
    building: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tracks = [
    'Systems & Low-Level Engineering',
    'Autonomous AI & Agents',
    'Founders & Independent Startups',
    'Wilderness & Mountain Hikes',
    'Open Source Tooling',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: `Community Join Request: ${formData.interest}`,
        message: `Project/Building: ${formData.building}\nProfile/Link: ${formData.githubOrUrl}`,
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F32936', '#FFFFFF', '#FFA500', '#F5F3EF'],
        });
      } catch (err) {
        // Fallback silently if canvas-confetti unsupported
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Atmospheric lighting */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl space-y-4 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-bc-surface border border-bc-border text-bc-red">
          <Users className="w-3.5 h-3.5" />
          <span>JOIN THE FELLOWSHIP</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Join the Basecamp{' '}
          <span className="bg-gradient-to-r from-white via-bc-white to-bc-red bg-clip-text text-transparent">
            Circle
          </span>
        </h1>

        <p className="text-base sm:text-lg text-bc-muted leading-relaxed">
          Basecamp is free to join. We are an inclusive fellowship of builders, engineers, designers, founders, and students 
          who take pride in their craft and love exploring the frontier together.
        </p>

        {/* Live Community Metric Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">
              <AnimatedCounter to={2400} suffix="+" />
            </span>
            <span className="text-bc-muted uppercase">Pioneers</span>
          </div>
          <div className="h-6 w-px bg-bc-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-bc-red">
              <AnimatedCounter to={48} suffix="+" />
            </span>
            <span className="text-bc-muted uppercase">Expeditions</span>
          </div>
          <div className="h-6 w-px bg-bc-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">
              <AnimatedCounter to={100} suffix="%" />
            </span>
            <span className="text-bc-muted uppercase">Free Access</span>
          </div>
        </div>
      </motion.div>

      {/* Active Guilds & Focus Groups with 3D TiltCards */}
      <div className="space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono uppercase font-bold text-bc-red tracking-widest">
            Specialized Guilds
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Active Guilds & Focus Groups</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-4 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border mb-4 shadow-md">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Systems & Low-Level Guild</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Discussions on Rust, C++, Linux kernel, zero-copy messaging, micro-benchmarks, and distributed storage engines.
                </p>
              </div>
              <div className="pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                <span>Weekly Friday Sprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-4 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border mb-4 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">AI & Autonomous Agents</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Evaluating local LLM inference, multi-agent frameworks, tool protocols, memory mechanisms, and agentic UX patterns.
                </p>
              </div>
              <div className="pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                <span>Hands-on Agent Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TiltCard withBeam className="p-7 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border hover:border-bc-red/60 space-y-4 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border mb-4 shadow-md">
                  <Mountain className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Wilderness & Trail Trekkers</h3>
                <p className="text-xs text-bc-muted leading-relaxed mt-2">
                  Monthly sunrise mountain expeditions, outdoor camping discussions, navigation, and physical fitness meetups.
                </p>
              </div>
              <div className="pt-4 border-t border-bc-border/60 text-[11px] font-mono text-bc-red flex items-center gap-1.5">
                <span>Monthly Trail Treks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>

      {/* Join Interest Form with Animated States & Confetti */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <TiltCard withBeam className="p-8 sm:p-12 rounded-3xl bg-bc-surface/90 backdrop-blur-2xl border border-bc-border space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-bc-red tracking-widest">
                Direct Connection
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Introduce Yourself to the Circle
              </h3>
              <p className="text-xs sm:text-sm text-bc-muted">
                Tell us a little bit about what you are tinkering with. We will send an invite to our Discord server and upcoming workshop passes.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-green-500/10 border border-green-500/30 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Welcome Aboard, {formData.name}!</h4>
                <p className="text-xs text-bc-muted max-w-sm mx-auto">
                  We've received your interest submission. Keep an eye on your inbox for our invite link and first meetup orientation.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    href="/events"
                    className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-colors"
                  >
                    Browse Open Expeditions
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-bc-card border border-bc-border text-white"
                  >
                    Submit Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                      Your Name <span className="text-bc-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                      Email Address <span className="text-bc-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                    Primary Area of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white focus:outline-none focus:border-bc-red transition-colors cursor-pointer"
                  >
                    {tracks.map((t) => (
                      <option key={t} value={t} className="bg-bc-surface text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                    What are you building or curious about right now?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    placeholder="e.g. Experimenting with local webgpu models or migrating microservices to Rust..."
                    className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_20px_rgba(243,41,54,0.35)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Connecting...' : 'Request Community Access'}</span>
                </motion.button>
              </form>
            )}
          </div>
        </TiltCard>
      </motion.div>

    </div>
  );
}
