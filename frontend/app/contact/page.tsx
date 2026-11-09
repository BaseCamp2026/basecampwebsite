'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBasecamp } from '@/lib/store';
import CursorGlow from '@/components/CursorGlow';
import TiltCard from '@/components/TiltCard';
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Shield,
  Zap,
  HelpCircle,
  Building
} from 'lucide-react';

export default function ContactPage() {
  const { submitContactMessage } = useBasecamp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subjects = [
    'General Question',
    'Proposal to Host / Speak at a Workshop',
    'Partnership / Venue Collaboration',
    'Code of Conduct / Safety Report',
    'Outdoor Trek Coordination',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      submitContactMessage(formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Question',
        message: '',
      });

      // Confetti burst on successful message
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F32936', '#FFFFFF', '#FFA500'],
        });
      } catch (err) {
        // Fallback silently
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-bc-black text-bc-white py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 overflow-hidden">
      
      {/* Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl space-y-4 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-bc-surface border border-bc-border text-bc-red">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT TRANSMISSION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Contact the{' '}
          <span className="bg-gradient-to-r from-white via-bc-white to-bc-red bg-clip-text text-transparent">
            Organizers
          </span>
        </h1>

        <p className="text-base sm:text-lg text-bc-muted leading-relaxed">
          Have an idea for a hands-on workshop? Want to host an expedition, offer venue space, or ask a question about participation? 
          Drop our steward team a direct transmission below.
        </p>
      </motion.div>

      {/* Main Grid: Form + Logistics info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        
        {/* Form Card (2 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <TiltCard withBeam className="p-8 sm:p-10 rounded-3xl bg-bc-surface/90 backdrop-blur-2xl border border-bc-border shadow-2xl">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs text-bc-muted max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. One of our community stewards will reply directly to your email within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-bc-card border border-bc-border text-white mt-4 shadow-md"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                      Your Email <span className="text-bc-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Selector Buttons */}
                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-2">
                    Topic / Subject
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((sub) => {
                      const isSelected = formData.subject === sub;
                      return (
                        <motion.button
                          key={sub}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setFormData({ ...formData, subject: sub })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-bc-red text-white font-bold shadow-[0_0_12px_rgba(243,41,54,0.35)]'
                              : 'bg-bc-card hover:bg-bc-card-hover border border-bc-border text-bc-muted hover:text-white'
                          }`}
                        >
                          {sub}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-bc-muted mb-1.5">
                    Your Message <span className="text-bc-red">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your session proposal, question, or collaboration idea in detail..."
                    className="w-full px-4 py-3 rounded-xl bg-bc-card border border-bc-border text-sm text-white placeholder:text-bc-muted/50 focus:outline-none focus:border-bc-red transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white transition-all shadow-[0_0_20px_rgba(243,41,54,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting...' : 'Dispatch Message'}</span>
                </motion.button>
              </form>
            )}
          </TiltCard>
        </motion.div>

        {/* Sidebar Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-1 space-y-5"
        >
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border space-y-3 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Direct Response SLA</h4>
            <p className="text-xs text-bc-muted leading-relaxed">
              We review inbox tickets every evening. You can expect a thoughtful response from an organizer within 24 to 48 hours.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border space-y-3 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Host or Sponsor a Workshop</h4>
            <p className="text-xs text-bc-muted leading-relaxed">
              Have a venue with high-speed internet and power outlets? Basecamp provides content, organizers, and audience curation.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border space-y-3 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-bc-card flex items-center justify-center text-bc-red border border-bc-border">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Confidential Safety Hotline</h4>
            <p className="text-xs text-bc-muted leading-relaxed">
              Safety and harassment reports are handled with absolute confidentiality by our designated lead stewards.
            </p>
          </motion.div>
        </motion.div>

      </div>

    </div>
  );
}
