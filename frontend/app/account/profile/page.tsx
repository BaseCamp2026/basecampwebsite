'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useBasecamp } from '@/lib/store';
import CursorGlow from '@/components/CursorGlow';
import TiltCard from '@/components/TiltCard';
import { 
  User, 
  Mail, 
  Briefcase, 
  Building, 
  CheckCircle2, 
  Save, 
  Ticket, 
  Sparkles,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile } = useBasecamp();
  
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [occupation, setOccupation] = useState(currentUser?.occupation || '');
  const [companyOrOrg, setCompanyOrOrg] = useState(currentUser?.companyOrOrg || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [marketingOptIn, setMarketingOptIn] = useState(currentUser?.marketingOptIn ?? true);
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Member Sign In Required</h2>
        <p className="text-xs text-bc-muted mb-4">Please sign in or switch your demo role in the navigation bar to Member.</p>
        <Link href="/" className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-bc-red text-white">
          Return Home
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      occupation,
      companyOrOrg,
      bio,
      marketingOptIn,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Atmospheric lighting */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-bc-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Profile Header with Animated Elevation */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-bc-border pb-8 relative z-10"
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.displayName}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-bc-red shadow-[0_0_20px_rgba(243,41,54,0.3)]"
            />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-bc-black flex items-center justify-center text-[10px] text-white">
              ✓
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{currentUser.displayName}</h1>
            <p className="text-xs text-bc-muted font-mono mt-0.5">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-bc-surface border border-bc-border text-bc-red">
                MEMBER ROLE: {currentUser.role}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/30">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/account/registrations"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-bold bg-bc-surface hover:bg-bc-card border border-bc-border text-white self-start sm:self-auto shadow-lg transition-colors"
          >
            <Ticket className="w-4 h-4 text-bc-red" />
            <span>My Boarding Passes</span>
            <ArrowRight className="w-4 h-4 text-bc-muted" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Profile Form Card with Border Beam */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10"
      >
        <TiltCard withBeam className="p-8 sm:p-10 rounded-3xl bg-bc-surface/90 backdrop-blur-2xl border border-bc-border shadow-2xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-bc-border/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-bc-red" />
                <h2 className="text-lg font-bold text-white">Pioneer Profile Settings</h2>
              </div>
              {saved && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-mono text-green-400 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full"
                >
                  <CheckCircle2 className="w-4 h-4" /> Changes saved!
                </motion.span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white focus:outline-none focus:border-bc-red transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                  Email Address (Identity ID)
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full px-4 py-3 rounded-xl bg-bc-black/60 border border-bc-border/60 text-sm text-bc-muted cursor-not-allowed font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                  Occupation / Specialty
                </label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Systems Engineer / Founder / Student"
                  className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white focus:outline-none focus:border-bc-red transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                  Company / Organization / School
                </label>
                <input
                  type="text"
                  value={companyOrOrg}
                  onChange={(e) => setCompanyOrOrg(e.target.value)}
                  placeholder="e.g. Independent / IISc / HyperScale"
                  className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white focus:outline-none focus:border-bc-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                Bio & Tinkering Interests
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a sentence or two about what you build and what technologies excite you..."
                className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white focus:outline-none focus:border-bc-red transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="optin"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="w-4 h-4 rounded border-bc-border text-bc-red focus:ring-bc-red accent-bc-red"
              />
              <label htmlFor="optin" className="text-xs text-bc-muted select-none cursor-pointer">
                Notify me when new expedition spots unlock and for trailhead announcements.
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_20px_rgba(243,41,54,0.4)] flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </motion.button>
          </form>
        </TiltCard>
      </motion.div>

    </div>
  );
}
