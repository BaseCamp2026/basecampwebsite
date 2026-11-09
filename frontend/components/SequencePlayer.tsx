'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Sliders } from 'lucide-react';

interface SequencePlayerProps {
  totalFrames?: number;
  framePrefix?: string;
  frameDigits?: number;
  frameExt?: string;
  autoPlay?: boolean;
  fps?: number;
  className?: string;
  enableScrollScrub?: boolean;
}

export default function SequencePlayer({
  totalFrames = 100,
  framePrefix = '/sequence/ezgif-frame-',
  frameDigits = 3,
  frameExt = '.jpg',
  autoPlay = true,
  fps = 24,
  className = '',
  enableScrollScrub = true,
}: SequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [interactiveMode, setInteractiveMode] = useState<'scroll' | 'autoplay'>('scroll');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameInterval = 1000 / (fps * playbackSpeed);

  // Helper to format frame path
  const getFramePath = useCallback(
    (index: number) => {
      const numStr = String(index).padStart(frameDigits, '0');
      return `${framePrefix}${numStr}${frameExt}`;
    },
    [frameDigits, frameExt, framePrefix]
  );

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [totalFrames, getFramePath]);

  // Draw frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Calculate aspect ratio fit (contain/cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Sync canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrame);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawFrame, currentFrame]);

  // Render on frame change
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame]);

  // Scroll scrub handler
  useEffect(() => {
    if (!enableScrollScrub || interactiveMode !== 'scroll' || reducedMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through hero section (from top of hero into viewport to bottom out of viewport)
      const totalScrollDistance = rect.height + viewportHeight;
      const currentScrollPos = viewportHeight - rect.top;

      let progress = currentScrollPos / totalScrollDistance;
      progress = Math.max(0, Math.min(1, progress));

      const targetFrame = Math.max(1, Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1));
      setCurrentFrame(targetFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollScrub, interactiveMode, totalFrames, reducedMotion]);

  // Autoplay animation loop
  useEffect(() => {
    if (!isPlaying || interactiveMode !== 'autoplay' || reducedMotion || !isLoaded) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (time - lastFrameTimeRef.current >= frameInterval) {
        lastFrameTimeRef.current = time;
        setCurrentFrame((prev) => {
          if (prev >= totalFrames) return 1;
          return prev + 1;
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, interactiveMode, frameInterval, totalFrames, reducedMotion, isLoaded]);

  // Handle manual scrub
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentFrame(val);
    if (isPlaying) setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (interactiveMode === 'scroll') {
      setInteractiveMode('autoplay');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setCurrentFrame(1);
    setIsPlaying(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full select-none ${className}`}>
      {/* Canvas container with cinematic glow */}
      <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-bc-black border border-bc-border/80 shadow-[0_0_60px_-15px_rgba(243,41,54,0.3)] group">
        
        {/* Ambient background glow matching the active frame */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 blur-3xl transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(243, 41, 54, ${currentFrame > 20 && currentFrame < 80 ? '0.45' : '0.2'}), transparent 70%)`
          }}
        />

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bc-black/90 backdrop-blur-md">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-bc-red/20 border-t-bc-red animate-spin" />
              <span className="text-xs font-mono font-bold text-bc-white">{loadProgress}%</span>
            </div>
            <p className="text-sm font-medium text-bc-muted tracking-widest uppercase">
              Buffering Basecamp Sequence...
            </p>
            <div className="w-48 h-1 bg-bc-surface rounded-full mt-3 overflow-hidden border border-bc-border">
              <div 
                className="h-full bg-bc-red transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* The HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain cursor-grab active:cursor-grabbing"
          title="Drag slider or scroll page to scrub Basecamp logo animation"
        />

        {/* Reduced motion fallback badge */}
        {reducedMotion && (
          <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded bg-bc-surface/90 border border-bc-border text-xs text-bc-muted">
            Reduced motion active (Static view)
          </div>
        )}

        {/* Subtle top HUD / Mode indicator */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-bc-black/70 backdrop-blur-md border border-white/10 text-bc-white flex items-center gap-1.5 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && interactiveMode === 'autoplay' ? 'bg-green-400 animate-pulse' : 'bg-bc-red'}`} />
            {interactiveMode === 'scroll' ? 'SCROLL-LINKED' : isPlaying ? 'PLAYING' : 'PAUSED'}
          </div>
          <div className="px-2.5 py-1 rounded-full text-[11px] font-mono text-bc-muted bg-bc-black/70 backdrop-blur-md border border-white/10">
            FRAME {String(currentFrame).padStart(3, '0')} / {totalFrames}
          </div>
        </div>

        {/* Bottom Interactive HUD & Timeline Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-bc-black via-bc-black/80 to-transparent backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-2.5 max-w-3xl mx-auto">
            {/* Timeline Progress Slider */}
            <div className="relative flex items-center">
              <input
                type="range"
                min="1"
                max={totalFrames}
                value={currentFrame}
                onChange={handleScrub}
                className="w-full h-1.5 bg-bc-border/80 rounded-lg appearance-none cursor-pointer accent-bc-red focus:outline-none focus:ring-2 focus:ring-bc-red/50"
                aria-label="Animation frame scrubber"
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs text-bc-muted">
              {/* Left: Play / Pause / Replay */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="p-1.5 rounded-lg bg-bc-surface hover:bg-bc-card-hover border border-bc-border text-bc-white hover:text-bc-red transition-colors flex items-center gap-1.5 px-3"
                  title={isPlaying && interactiveMode === 'autoplay' ? 'Pause animation' : 'Play animation'}
                >
                  {isPlaying && interactiveMode === 'autoplay' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px]">PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="font-mono text-[11px]">AUTOPLAY</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-bc-surface hover:bg-bc-card-hover border border-bc-border text-bc-muted hover:text-bc-white transition-colors"
                  title="Reset to frame 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Speed toggle */}
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 0.5 : 1))}
                  className="px-2 py-1 rounded bg-bc-surface hover:bg-bc-card-hover border border-bc-border text-[11px] font-mono text-bc-muted hover:text-bc-white"
                  title="Change playback speed"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Center / Right: Mode Switcher */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInteractiveMode('scroll');
                    setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                    interactiveMode === 'scroll'
                      ? 'bg-bc-red text-white border-bc-red'
                      : 'bg-bc-surface text-bc-muted border-bc-border hover:text-white'
                  }`}
                  title="Scrub animation as you scroll down the page"
                >
                  Scroll Scrub
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInteractiveMode('autoplay');
                    setIsPlaying(true);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                    interactiveMode === 'autoplay'
                      ? 'bg-bc-red text-white border-bc-red'
                      : 'bg-bc-surface text-bc-muted border-bc-border hover:text-white'
                  }`}
                  title="Play smoothly in continuous loop"
                >
                  Cinema Loop
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Micro-caption below the player */}
      <div className="flex items-center justify-between max-w-5xl mx-auto mt-3 px-2 text-[11px] font-mono text-bc-muted/80">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-bc-red" />
          Cinematic 100-Frame Dynamic Motion Sequence
        </span>
        <span className="hidden sm:inline">
          Tip: Scroll page to control motion or switch to Cinema Loop
        </span>
      </div>
    </div>
  );
}

