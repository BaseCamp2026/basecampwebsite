'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBasecamp } from '@/lib/store';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  User, 
  Briefcase,
  Lock
} from 'lucide-react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { currentUser, connectUser } = useBasecamp();
  
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [occupation, setOccupation] = useState(currentUser?.occupation || '');
  const [intent, setIntent] = useState('Attend Workshops & Collabs');
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sanitize = (str: string) => str.replace(/[<>]/g, '').trim();

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F32936', '#FFFFFF', '#FF6B75'],
      });
    } catch (e) {}
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      connectUser({
        displayName: sanitize(name),
        email: sanitize(email),
        occupation: sanitize(occupation),
        marketingOptIn,
      });
      setLoading(false);
      setSubmitted(true);
      triggerConfetti();
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Framer Motion Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bc-black/85 backdrop-blur-md"
          />

          {/* Framer Motion Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-bc-surface border border-bc-border shadow-[0_0_60px_rgba(243,41,54,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-bc-red via-red-500 to-bc-red" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-bc-border/80 bg-bc-card/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-bc-surface border border-bc-border text-bc-red shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                      Connect with Basecamp
                    </h3>
                    <Chip 
                      label="ZERO PASSWORDS" 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ height: 18, fontSize: '9px', fontWeight: 700 }}
                    />
                  </div>
                  <p className="text-[11px] text-bc-muted">
                    Direct community RSVP & instant pass access.
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

            {/* Modal Content */}
            <div className="p-6">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Connection Established!</h4>
                    <p className="text-xs text-bc-muted max-w-xs mx-auto">
                      Welcome to the circle, <strong className="text-white">{name}</strong>. You can now RSVP for open workshops with zero friction.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-bc-card border border-bc-border text-left text-xs font-mono space-y-1.5">
                    <div className="text-[10px] text-bc-muted uppercase">Verified Connection:</div>
                    <div className="text-white font-medium truncate">{email}</div>
                    <div className="text-green-400 text-[11px] flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-4 h-4" /> 
                      <span>Direct RSVP Access Enabled</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl font-mono text-xs uppercase font-bold bg-bc-red hover:bg-bc-red-hover text-white transition-colors shadow-md"
                  >
                    Continue Exploring
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleConnect} className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                        Your Name <span className="text-bc-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-bc-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Rivera"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                        Email Address <span className="text-bc-red">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-bc-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@domain.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                        What You Do / Craft
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-bc-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          placeholder="Software Engineer, Founder, Student, Designer..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red"
                        />
                      </div>
                      <p className="text-[10px] text-bc-muted mt-1">
                        Open to all backgrounds — not restricted to students or tech veterans.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-bc-muted mb-1">
                        Primary Interest
                      </label>
                      <select
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bc-card border border-bc-border text-xs text-white focus:outline-none focus:border-bc-red"
                      >
                        <option value="Attend Workshops & Collabs">Attend Workshops & Collabs</option>
                        <option value="Meet Founders & Builders">Meet Founders & Builders</option>
                        <option value="Wilderness Treks & Outdoors">Wilderness Treks & Outdoors</option>
                        <option value="Speak or Mentor">Speak or Mentor at Basecamp</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="optin"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="w-4 h-4 rounded bg-bc-card border-bc-border accent-bc-red mt-0.5"
                    />
                    <label htmlFor="optin" className="text-[11px] text-bc-muted leading-tight">
                      Send me priority invitations for newly announced workshops and expeditions.
                    </label>
                  </div>

                  {/* Security statement */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-bc-muted/80 pt-1">
                    <Lock className="w-3 h-3 text-green-400" />
                    <span>Protected with CSRF defense & secure local session</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_20px_rgba(243,41,54,0.35)] flex items-center justify-center gap-2"
                  >
                    {loading ? <span>Connecting...</span> : (
                      <>
                        <span>Connect & Instant Access</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
