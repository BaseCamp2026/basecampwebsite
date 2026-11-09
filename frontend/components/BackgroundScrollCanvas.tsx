'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BackgroundScrollCanvasProps {
  totalFrames?: number;
  framePrefix?: string;
  frameDigits?: number;
  frameExt?: string;
}

export default function BackgroundScrollCanvas({
  totalFrames = 100,
  framePrefix = '/sequence/ezgif-frame-',
  frameDigits = 3,
  frameExt = '.jpg',
}: BackgroundScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameObj = useRef<{ frame: number }>({ frame: 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const getFramePath = useCallback(
    (index: number) => {
      const numStr = String(index).padStart(frameDigits, '0');
      return `${framePrefix}${numStr}${frameExt}`;
    },
    [frameDigits, frameExt, framePrefix]
  );

  // Draw frame to canvas centered with cover aspect ratio
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(1, Math.min(totalFrames, Math.round(frameIndex)));
    const img = imagesRef.current[clampedIndex - 1];
    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

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

    // Subtle dark radial vignette so text in foreground is always razor-sharp
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.25,
      width / 2, height / 2, Math.max(width, height) * 0.7
    );
    vignette.addColorStop(0, 'rgba(8, 8, 8, 0.25)');
    vignette.addColorStop(0.7, 'rgba(8, 8, 8, 0.7)');
    vignette.addColorStop(1, 'rgba(8, 8, 8, 0.95)');

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }, [totalFrames]);

  // Preload all 100 frames into memory
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadPercent(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      imagesRef.current = [];
    };
  }, [totalFrames, getFramePath]);

  // Canvas size sync
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameObj.current.frame);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawFrame]);

  // GSAP ScrollTrigger linking whole page scroll to frame animation
  useEffect(() => {
    if (!isLoaded) return;

    // Initial render
    drawFrame(1);

    const ctx = gsap.context(() => {
      gsap.to(currentFrameObj.current, {
        frame: totalFrames,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // Smooth buttery scrubbing with slight inertial follow
          onUpdate: () => {
            drawFrame(currentFrameObj.current.frame);
          },
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isLoaded, totalFrames, drawFrame]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-bc-black">
      {/* Background HTML5 Canvas rendering the 100-frame sequence */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 0.75 : 0 }}
      />

      {/* Atmospheric dark tint & red gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-bc-black/80 via-transparent to-bc-black/90 pointer-events-none" />

      {/* Ambient Red glow aura centered behind content */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-bc-red/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}

