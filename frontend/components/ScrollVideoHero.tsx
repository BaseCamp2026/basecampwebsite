'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowDown, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Compass, 
  MousePointer, 
  Flame, 
  Terminal, 
  Users 
} from 'lucide-react';
import ConnectModal from './ConnectModal';

interface ScrollVideoHeroProps {
  totalFrames?: number;
  framePrefix?: string;
  frameDigits?: number;
  frameExt?: string;
  onExploreEvents?: () => void;
}

export default function ScrollVideoHero({
  totalFrames = 100,
  framePrefix = '/sequence/ezgif-frame-',
  frameDigits = 3,
  frameExt = '.jpg',
}: ScrollVideoHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  const [displayFrame, setDisplayFrame] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);

  // Mouse tilt coordinates for 3D parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getFramePath = useCallback(
    (index: number) => {
      const numStr = String(index).padStart(frameDigits, '0');
      return `${framePrefix}${numStr}${frameExt}`;
    },
    [frameDigits, frameExt, framePrefix]
  );

  // Preload all 100 frames into memory
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadPercentage(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === totalFrames) setIsLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      imagesRef.current = [];
    };
  }, [totalFrames, getFramePath]);

  // Track mouse coordinates for subtle 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8; // Max 4 deg tilt
      const y = (e.clientY / innerHeight - 0.5) * -8;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas drawing function
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[Math.max(0, Math.min(totalFrames - 1, Math.round(frameIndex) - 1))];
    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Calculate aspect ratio fit (cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Vignette gradient edges to blend into deep dark background
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.25,
      width / 2, height / 2, Math.max(width, height) * 0.65
    );
    gradient.addColorStop(0, 'rgba(8, 8, 8, 0)');
    gradient.addColorStop(0.85, 'rgba(8, 8, 8, 0.45)');
    gradient.addColorStop(1, 'rgba(8, 8, 8, 0.95)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [totalFrames]);

  // Sync canvas dimensions to viewport
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [renderFrame]);

  // Mouse Scroll listener
  useEffect(() => {
    if (isAutoplay) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      setScrollProgress(progress);

      const target = 1 + progress * (totalFrames - 1);
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoplay, totalFrames]);

  // Smooth inertial interpolation loop (Lerp)
  useEffect(() => {
    const loop = () => {
      if (isAutoplay) {
        // Continuous autoplay mode
        currentFrameRef.current += 0.45;
        if (currentFrameRef.current > totalFrames) {
          currentFrameRef.current = 1;
        }
        renderFrame(currentFrameRef.current);
        setDisplayFrame(Math.round(currentFrameRef.current));
      } else {
        // Inertial scroll scrub mode: Lerp towards targetFrame
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.02) {
          currentFrameRef.current += diff * 0.16; // Lerp factor for buttery glide
          renderFrame(currentFrameRef.current);
          setDisplayFrame(Math.round(currentFrameRef.current));
        }
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isAutoplay, renderFrame, totalFrames]);

  // Ambient Ember Particle Animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: string;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.4 ? 'rgba(243, 41, 54,' : 'rgba(255, 200, 150,',
      });
    }

    let particleAnimId: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `${p.hue} ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(243, 41, 54, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particleAnimId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(particleAnimId);
    };
  }, []);

  return (
    <>
      {/* 400vh Scroll Track: As user scrolls mouse wheel, sticky viewport plays the video */}
      <div ref={containerRef} className="relative h-[420vh] w-full bg-bc-black">
        
        {/* Sticky Fullscreen Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* 3D Perspective Tilt Wrapper */}
          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.02)`,
            }}
          >
            {/* The Main 100-Frame Animation Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Particle Embers Layer */}
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-0 pointer-events-none z-10 opacity-70"
          />

          {/* Preloader */}
          {!isLoaded && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-bc-black/95 backdrop-blur-md">
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-bc-red/20 border-t-bc-red animate-spin" />
                <span className="text-xs font-mono font-bold text-white">{loadPercentage}%</span>
              </div>
              <p className="text-xs font-mono tracking-widest text-bc-muted uppercase">
                Loading 100-Frame Mountain Sequence...
              </p>
              <div className="w-56 h-1.5 bg-bc-surface rounded-full mt-3 overflow-hidden border border-bc-border">
                <div 
                  className="h-full bg-bc-red transition-all duration-200 shadow-[0_0_10px_#F32936]"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCROLL-DRIVEN NARRATIVE MILESTONES (FADE IN/OUT ON SCROLL) */}
          {/* ========================================================= */}

          {/* STAGE 1: 0% to 22% Scroll — Hero Intro & Mouse Prompt */}
          <div 
            className={`absolute z-20 inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 pointer-events-none ${
              scrollProgress < 0.22 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-bc-surface/90 border border-bc-border text-white mb-6 backdrop-blur-md shadow-lg pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-bc-red animate-pulse" />
              <span className="text-bc-muted">AN OPEN FELLOWSHIP:</span>
              <strong className="text-white">NOT LIMITED TO STUDENTS</strong>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
              BASECAMP
            </h1>

            <p className="mt-5 text-base sm:text-xl text-bc-muted max-w-2xl leading-relaxed">
              Where engineers, founders, creators, designers, and students gather before the ascent.
            </p>

            {/* Mouse scroll cue */}
            <div className="mt-12 flex flex-col items-center gap-2.5 text-xs font-mono text-bc-muted animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-bc-muted/60 flex items-start justify-center p-1.5">
                <div className="w-1.5 h-2 bg-bc-red rounded-full animate-pulse" />
              </div>
              <span className="tracking-wider uppercase text-[11px] text-white">Scroll Mouse to Explore Video</span>
            </div>
          </div>

          {/* STAGE 2: 24% to 48% Scroll — Electric Circuit Pulse & Inclusivity */}
          <div 
            className={`absolute z-20 inset-x-4 sm:inset-x-12 max-w-lg left-4 sm:left-12 transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.24 && scrollProgress < 0.48
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-3 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-bc-red/10 border border-bc-red/30 text-bc-red">
                <Users className="w-3.5 h-3.5" />
                <span>PRINCIPLE 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Craft Over Credentials
              </h2>
              <p className="text-xs sm:text-sm text-bc-muted leading-relaxed">
                Skip theoretical slides and closed corporate silos. At Basecamp, a 19-year-old student hacker, 
                a 34-year-old distributed infrastructure architect, and an indie founder sit at the same table.
              </p>
              <div className="pt-2 text-[11px] font-mono text-bc-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Zero gatekeeping • 100% Free & Open Community</span>
              </div>
            </div>
          </div>

          {/* STAGE 3: 50% to 74% Scroll — Plasma Fire Peak & Deep Expeditions */}
          <div 
            className={`absolute z-20 inset-x-4 sm:inset-x-12 max-w-lg right-4 sm:right-12 ml-auto transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.50 && scrollProgress < 0.74
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-bc-surface/85 backdrop-blur-xl border border-bc-border/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-3 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-bc-red/10 border border-bc-red/30 text-bc-red">
                <Flame className="w-3.5 h-3.5" />
                <span>EXPEDITIONS 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                From Silicon to Trails
              </h2>
              <p className="text-xs sm:text-sm text-bc-muted leading-relaxed">
                We dissect microsecond latencies in Rust, deploy autonomous multi-agent tool loops, 
                and hike scenic mountain trails at dawn to clear our minds before building.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-bc-muted">
                <span className="text-white font-bold">48+ Sessions</span>
                <span>•</span>
                <span className="text-white font-bold">2,400+ Members</span>
                <span>•</span>
                <span className="text-bc-red font-bold">Bengaluru Hub</span>
              </div>
            </div>
          </div>

          {/* STAGE 4: 76% to 100% Scroll — Final Summit Lock & Action Hub */}
          <div 
            className={`absolute z-20 inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.76 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="max-w-2xl p-8 sm:p-10 rounded-3xl bg-bc-surface/90 backdrop-blur-xl border border-bc-border/90 shadow-[0_0_60px_rgba(243,41,54,0.25)] space-y-6 pointer-events-auto">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-widest text-bc-red">
                  <Sparkles className="w-4 h-4" />
                  <span>The Fellowship Awaits</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Step Into the Basecamp
                </h2>
                <p className="text-xs sm:text-sm text-bc-muted max-w-lg mx-auto">
                  Connect instantly to reserve free workshop passes, propose sessions, or join our community discussions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConnectModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-red hover:bg-bc-red-hover text-white flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(243,41,54,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Connect & RSVP</span>
                </button>

                <Link
                  href="/events"
                  className="px-6 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider bg-bc-card hover:bg-bc-card-hover border border-bc-border text-white transition-all"
                >
                  Browse 6 Expeditions
                </Link>
              </div>

              <div className="text-[11px] font-mono text-bc-muted flex items-center justify-center gap-1.5 pt-2">
                <span>Continue scrolling for full event directory</span>
                <ArrowDown className="w-3.5 h-3.5 text-bc-red animate-bounce" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FLOATING CONTROLS HUD (BOTTOM CORNER) */}
          {/* ========================================================= */}
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-bc-black/80 backdrop-blur-md border border-bc-border/80 px-3 py-2 rounded-2xl shadow-xl">
            {/* Frame Indicator */}
            <div className="text-[11px] font-mono text-bc-muted px-2 border-r border-bc-border">
              FRAME <strong className="text-white">{String(displayFrame).padStart(3, '0')}</strong> / 100
            </div>

            {/* Scroll percentage */}
            <div className="text-[11px] font-mono text-bc-red px-2 border-r border-bc-border font-bold">
              {Math.round(scrollProgress * 100)}% SCROLLED
            </div>

            {/* Play/Pause Autoplay button */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="p-1.5 rounded-lg bg-bc-surface hover:bg-bc-card border border-bc-border text-white transition-colors"
              title={isAutoplay ? 'Switch to mouse scroll scrub' : 'Play continuous cinema loop'}
            >
              {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>

        </div>
      </div>

      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

