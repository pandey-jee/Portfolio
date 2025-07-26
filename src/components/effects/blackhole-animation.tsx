import React, { useEffect, useRef, useState } from 'react';

interface BlackholeAnimationProps {
  isActive: boolean;
  size?: number;
}

export default function BlackholeAnimation({ isActive, size = 300 }: BlackholeAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  class Star {
    orbital: number;
    x: number;
    y: number;
    yOrigin: number;
    speed: number;
    rotation: number;
    startRotation: number;
    id: number;
    collapseBonus: number;
    color: string;
    hoverPos: number;
    expansePos: number;
    prevR: number;
    prevX: number;
    prevY: number;
    originalY: number;
    centerx: number;
    centery: number;
    maxorbit: number;

    constructor(centerx: number, centery: number, maxorbit: number, id: number) {
      this.centerx = centerx;
      this.centery = centery;
      this.maxorbit = maxorbit;
      
      const rands = [];
      rands.push(Math.random() * (maxorbit / 2) + 1);
      rands.push(Math.random() * (maxorbit / 2) + maxorbit);
      this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
      this.x = centerx;
      this.y = centery + this.orbital;
      this.yOrigin = centery + this.orbital;
      // Faster speed for more dynamic effect
      this.speed = (Math.floor(Math.random() * 4) + 2.5) * Math.PI / 180;
      this.rotation = 0;
      this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
      this.id = id;
      this.collapseBonus = this.orbital - (maxorbit * 0.7);
      if (this.collapseBonus < 0) this.collapseBonus = 0;
      
      // Enhanced chakra-themed gradient with more glow
      const t = this.orbital / maxorbit;
      if (t < 0.3) {
        this.color = this.lerpColor('#ffffff', '#38b6ff', t * 3.33); // bright white to chakra blue
      } else if (t < 0.7) {
        this.color = this.lerpColor('#38b6ff', '#ff6b35', (t - 0.3) * 2.5); // chakra blue to orange
      } else {
        this.color = this.lerpColor('#ff6b35', '#005078', (t - 0.7) * 3.33); // orange to deep blue
      }

      this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus;
      this.expansePos = centery + (this.id % 100) * -12 + (Math.floor(Math.random() * 25) + 1);
      this.prevR = this.startRotation;
      this.prevX = this.x;
      this.prevY = this.y;
      this.originalY = this.yOrigin;
    }

    lerpColor(a: string, b: string, t: number): string {
      a = a.replace('#', '');
      b = b.replace('#', '');
      const ar = parseInt(a.substring(0, 2), 16), ag = parseInt(a.substring(2, 4), 16), ab = parseInt(a.substring(4, 6), 16);
      const br = parseInt(b.substring(0, 2), 16), bg = parseInt(b.substring(2, 4), 16), bb = parseInt(b.substring(4, 6), 16);
      const alpha = Math.max(0.6, 1 - t * 0.3); // More opacity for better glow
      return `rgba(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)},${alpha})`;
    }

    rotate(cx: number, cy: number, x: number, y: number, angle: number): [number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
      const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    }

    draw(context: CanvasRenderingContext2D, currentTime: number, collapse: boolean) {
      // Enhanced movement with faster response
      this.rotation = this.startRotation + (currentTime * this.speed);
      
      if (!collapse) {
        if (this.y > this.yOrigin) this.y -= 3.5; // Faster movement
        if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 8;
      } else {
        if (this.y > this.hoverPos) this.y -= (this.hoverPos - this.y) / -4; // Faster collapse
        if (this.y < this.hoverPos - 4) this.y += 3.5;
      }

      // Enhanced glowing particle trail with multiple layers
      context.save();
      
      // Outer glow layer
      context.shadowColor = this.color;
      context.shadowBlur = 25; // Increased blur for more glow
      context.globalAlpha = 0.4;
      context.fillStyle = this.color;
      context.beginPath();
      const pos = this.rotate(this.centerx, this.centery, this.prevX, this.prevY, -this.prevR);
      context.arc(pos[0], pos[1], 3 + Math.random() * 1.5, 0, 2 * Math.PI); // Larger particles
      context.fill();
      
      // Inner bright core
      context.shadowBlur = 15;
      context.globalAlpha = 0.8;
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.arc(pos[0], pos[1], 1.2 + Math.random() * 0.8, 0, 2 * Math.PI);
      context.fill();
      
      // Additional sparkle effect
      if (Math.random() > 0.95) {
        context.shadowBlur = 20;
        context.globalAlpha = 0.9;
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(pos[0] + (Math.random() - 0.5) * 4, pos[1] + (Math.random() - 0.5) * 4, 0.5, 0, 2 * Math.PI);
        context.fill();
      }
      
      context.restore();

      this.prevR = this.rotation;
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    const centerx = size / 2;
    const centery = size / 2;
    const maxorbit = size * 0.4; // Adjusted for container size

    context.globalCompositeOperation = "lighter";

    // Initialize stars
    if (!isInitialized) {
      starsRef.current = [];
      for (let i = 0; i < 1500; i++) { // More stars for denser effect
        starsRef.current.push(new Star(centerx, centery, maxorbit, i));
      }
      setIsInitialized(true);
    }

    const startTime = Date.now();
    
    function animate() {
      if (!context) return;
      
      const currentTime = (Date.now() - startTime) / 30; // Faster time progression
      
      // Clear canvas with slight trail effect for smoother animation
      context.fillStyle = 'rgba(0, 0, 0, 0.15)';
      context.fillRect(0, 0, size, size);
      
      // Draw all stars
      starsRef.current.forEach(star => {
        star.draw(context, currentTime, isActive);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, size, isInitialized]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Enhanced background glow effects */}
      <div 
        className="absolute rounded-full animate-pulse"
        style={{
          width: size * 1.2,
          height: size * 1.2,
          background: 'radial-gradient(circle at 48% 50%, #ffffff 0%, #38b6ff 20%, #ff6b35 60%, #005078 100%)',
          filter: 'blur(40px) brightness(1.5) saturate(1.5)',
          opacity: isActive ? 0.8 : 0.3,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      {/* Outer electric rim */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background: `conic-gradient(from 0deg, #ffffff 0%, #38b6ff 25%, #ff6b35 50%, #38b6ff 75%, #ffffff 100%)`,
          borderRadius: '50%',
          filter: 'blur(2px)',
          opacity: isActive ? 0.9 : 0.4,
          transition: 'opacity 0.5s ease-in-out',
          animation: isActive ? 'spin 3s linear infinite' : 'none'
        }}
      />
      
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="rounded-full"
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
    </div>
  );
}
