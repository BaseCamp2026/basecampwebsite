'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Compass, ChevronUp, ChevronDown, Radio, Activity } from 'lucide-react';

export default function AscentHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [elevation, setElevation] = useState(920);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStage, setActiveStage] = useState('Camp I: Trailhead');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

      // Elevation ranges from 920m (Basecamp) to 1478m (Summit)
      const currentElev = Math.round(920 + progress * (1478 - 920));
      setElevation(currentElev);

      if (progress < 0.25) {
        setActiveStage('Camp I: Valley Trailhead');
      } else if (progress < 0.55) {
        setActiveStage('Camp II: Builder Ridge');
      } else if (progress < 0.85) {
        setActiveStage('Camp III: High Plateau');
      } else {
        setActiveStage('Summit: Pioneer Peak');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <motion.div
        layout
        className="relative flex flex-col items-end"
      >
        {/* Main Pill Widget */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-bc-surface/90 hover:bg-bc-card backdrop-blur-xl border border-bc-border hover:border-bc-red/60 text-white shadow-2xl cursor-pointer transition-all duration-300"
        >
          {/* Animated Mountain Contour Radar */}
          <div className="relative w-8 h-8 rounded-xl bg-bc-black flex items-center justify-center border border-bc-border overflow-hidden">
            <Mountain className="w-4 h-4 text-bc-red transition-transform duration-300" />
            <motion.div
              animate={{ height: `${scrollProgress * 100}%` }}
              className="absolute bottom-0 left-0 right-0 bg-bc-red/20 border-t border-bc-red"
            />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bc-red animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-bc-muted">
                ALTITUDE
              </span>
            </div>
            <div className="text-xs font-mono font-black text-white">
              {elevation.toLocaleString()} <span className="text-[10px] text-bc-muted font-normal">m</span>
            </div>
          </div>

          <div className="h-6 w-px bg-bc-border/80" />

          {/* Quick scroll toggle buttons */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToTop();
              }}
              title="Return to Basecamp"
              className="p-1 rounded-md hover:bg-white/10 text-bc-muted hover:text-white transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToBottom();
              }}
              title="Descend to Summit Camp"
              className="p-1 rounded-md hover:bg-white/10 text-bc-muted hover:text-white transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Expandable Altitude Telemetry Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-4 rounded-2xl bg-bc-surface/95 backdrop-blur-2xl border border-bc-border w-72 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-bc-border/80 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-bc-red animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                    Ascent Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-bc-muted">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-bc-card rounded-full h-1.5 overflow-hidden mb-3 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-bc-red to-orange-500 rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>

              {/* Current Waypoint */}
              <div className="text-[11px] font-mono text-bc-white mb-2">
                <span className="text-bc-muted block text-[9px] uppercase">Current Sector:</span>
                <span className="font-bold text-white">{activeStage}</span>
              </div>

              {/* Waypoint Milestones */}
              <div className="space-y-1.5 text-[10px] font-mono border-t border-bc-border/60 pt-2.5">
                <div className="flex items-center justify-between text-bc-muted">
                  <span>Valley Basecamp</span>
                  <span>920 m</span>
                </div>
                <div className="flex items-center justify-between text-bc-muted">
                  <span>Builder Ridge</span>
                  <span>1,080 m</span>
                </div>
                <div className="flex items-center justify-between text-bc-muted">
                  <span>High Bivouac</span>
                  <span>1,280 m</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="text-bc-red">Summit Peak</span>
                  <span>1,478 m</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-bc-border/60 flex items-center justify-between text-[10px] font-mono text-bc-muted">
                <span>Background Sync: Active</span>
                <Radio className="w-3 h-3 text-green-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

