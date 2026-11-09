'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BasecampLogoProps {
  variant?: 'image' | 'vector' | 'mark-only';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  withGlow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export default function BasecampLogo({
  variant = 'vector',
  size = 'md',
  className = '',
  withGlow = false,
  animated = true,
  onClick,
}: BasecampLogoProps) {
  // Dimensions map
  const dimensions = {
    xs: { markW: 24, markH: 20, textClass: 'text-sm tracking-[0.2em]', boxClass: 'h-7' },
    sm: { markW: 32, markH: 26, textClass: 'text-base tracking-[0.25em]', boxClass: 'h-9' },
    md: { markW: 42, markH: 34, textClass: 'text-xl tracking-[0.28em]', boxClass: 'h-11' },
    lg: { markW: 64, markH: 52, textClass: 'text-2xl tracking-[0.32em]', boxClass: 'h-16' },
    hero: { markW: 130, markH: 105, textClass: 'text-4xl tracking-[0.35em]', boxClass: 'h-48' },
  }[size];

  // If using the image variant (direct high-res render of user's uploaded logo)
  if (variant === 'image') {
    const imgSize = {
      xs: 32,
      sm: 48,
      md: 64,
      lg: 96,
      hero: 180,
    }[size];

    return (
      <motion.div
        whileHover={animated ? { scale: 1.05 } : {}}
        whileTap={animated ? { scale: 0.96 } : {}}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      >
        {withGlow && (
          <div className="absolute inset-0 bg-bc-red/25 rounded-2xl blur-xl scale-125 group-hover:bg-bc-red/40 transition-all duration-500 pointer-events-none" />
        )}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-bc-red/60 transition-colors bg-black shadow-2xl">
          <img
            src="/logo.jpg"
            alt="Basecamp Logo"
            className="object-contain"
            style={{ width: imgSize, height: imgSize }}
          />
        </div>
      </motion.div>
    );
  }

  // Vectorized high-res mountain crest matching the exact geometric aesthetic
  return (
    <motion.div
      whileHover={animated ? { scale: 1.03 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`relative inline-flex items-center gap-3 select-none cursor-pointer group ${dimensions.boxClass} ${className}`}
    >
      {/* Background ambient red glow pulse */}
      {withGlow && (
        <div className="absolute -inset-2 bg-bc-red/20 rounded-full blur-xl group-hover:bg-bc-red/40 transition-all duration-700 pointer-events-none animate-pulse" />
      )}

      {/* Mountain Crest SVG */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={dimensions.markW}
          height={dimensions.markH}
          viewBox="0 0 100 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(243,41,54,0.3)]"
        >
          {/* Main White Mountain Peak and Right Stepped Ridge */}
          <path
            d="M 50 8 L 8 78 L 32 78 L 50 48 L 58 62 L 68 46 L 76 60 L 92 78 L 68 78 L 58 62 L 50 48 L 42 62 Z"
            fill="none"
          />
          {/* Outer Mountain Solid Geometry matching uploaded crest */}
          <path
            d="M 50 6 L 10 78 L 32 78 L 50 46 L 68 78 L 92 78 L 74 48 L 68 56 L 50 26 Z"
            fill="none"
          />
          {/* Exact stylized shape */}
          <g>
            {/* White peak outline and facets */}
            <path
              d="M 50 6 L 10 78 L 32 78 L 50 46 L 66 78 L 90 78 L 74 48 L 66 60 L 50 6 Z"
              fill="#F5F3EF"
              className="group-hover:fill-white transition-colors"
            />
            {/* Inner Red Camp/Tent Triangle */}
            <path
              d="M 50 36 L 68 76 L 32 76 Z"
              fill="#F32936"
              className="drop-shadow-[0_0_8px_#F32936]"
            />
            {/* Center tent shadow divider */}
            <path
              d="M 50 36 L 50 76 L 32 76 Z"
              fill="#D81C29"
              opacity="0.85"
            />
          </g>
        </svg>
      </div>

      {/* Stylized Typography: B Ʌ S E C Ʌ M P */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`font-mono font-black text-white ${dimensions.textClass} tracking-[0.25em] group-hover:text-white transition-colors flex items-center`}>
              B<span className="text-bc-red font-sans mx-[0.5px]">Ʌ</span>SEC<span className="text-bc-red font-sans mx-[0.5px]">Ʌ</span>MP
            </span>
          </div>
          {size !== 'xs' && (
            <span className="text-[9px] uppercase font-mono tracking-widest text-bc-muted -mt-0.5 group-hover:text-bc-white/80 transition-colors">
              Open Gathering
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

