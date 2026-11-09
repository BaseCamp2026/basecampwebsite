'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Mountain, Flame, Users, Sparkles, MapPin } from 'lucide-react';

interface TickerItem {
  icon: React.ReactNode;
  tag: string;
  text: string;
  highlight?: string;
}

const tickerItems: TickerItem[] = [
  {
    icon: <Zap className="w-3.5 h-3.5 text-bc-red" />,
    tag: 'NEW RSVP',
    text: 'Vikram S. joined Distributed Rust Systems Workshop',
    highlight: 'Indiranagar Hub',
  },
  {
    icon: <Mountain className="w-3.5 h-3.5 text-emerald-400" />,
    tag: 'EXPEDITION',
    text: 'Sunrise Trek to Nandi Hills — 8 spots remaining',
    highlight: 'Sat 06:00 IST',
  },
  {
    icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
    tag: 'FIRESIDE',
    text: 'DeepTech Founders Session: Zero to $10M ARR lessons',
    highlight: 'Live Q&A',
  },
  {
    icon: <Users className="w-3.5 h-3.5 text-blue-400" />,
    tag: 'COMMUNITY',
    text: '2,400+ pioneers active across Bangalore, Chennai & Remote',
    highlight: 'Open Gathering',
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5 text-yellow-400" />,
    tag: 'COLLAB',
    text: 'Saturday Open Build Sprint: Multi-Agent AI Swarms',
    highlight: 'Hacking Open',
  },
  {
    icon: <MapPin className="w-3.5 h-3.5 text-purple-400" />,
    tag: 'INCLUSIVITY',
    text: 'Basecamp is free & open to all engineers, creators, founders, and students',
    highlight: 'No Barriers',
  },
];

export default function ActivityTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-bc-border/80 bg-bc-surface/70 backdrop-blur-md py-2.5">
      {/* Edge gradient fades for seamless look */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bc-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bc-black to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        >
          {/* Double items for infinite marquee loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 text-xs font-mono text-bc-muted hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-md bg-bc-black/80 border border-bc-border">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-bc-red tracking-wider uppercase">
                [{item.tag}]
              </span>
              <span className="text-white font-medium">{item.text}</span>
              {item.highlight && (
                <span className="px-2 py-0.5 rounded-md bg-bc-card border border-bc-border text-[10px] text-bc-white/80 font-bold">
                  {item.highlight}
                </span>
              )}
              <span className="text-bc-border font-bold">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

