'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  withBeam?: boolean;
}

export default function TiltCard({ children, className = '', withBeam = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 280, mass: 0.5 }}
      className={`relative overflow-hidden group ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Moving mouse glow reflection */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 320px at ${glowPos.x}% ${glowPos.y}%, rgba(243, 41, 54, 0.16), transparent 70%)`,
        }}
      />

      {/* Animated Traveling Border Laser Beam on Hover / Active */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 rounded-[inherit] transition-opacity duration-500 ${
          isHovered || withBeam ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          padding: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(243, 41, 54, 0.8), transparent)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'borderBeam 4s linear infinite',
        }}
      />

      <div style={{ transform: 'translateZ(15px)' }} className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
