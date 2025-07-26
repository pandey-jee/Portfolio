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
  const [animationPhase, setAnimationPhase] = useState<'normal' | 'compress' | 'expand' | 'returning'>('normal');

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
    compressPos: number;
    expandPos: number;
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
      
      // Weighted random for orbit distribution
      const rands = [];
      rands.push(Math.random() * (maxorbit / 2) + 1);
      rands.push(Math.random() * (maxorbit / 2) + maxorbit);
      this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
      
      this.x = centerx;
      this.y = centery + this.orbital;
      this.yOrigin = centery + this.orbital;
      this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
      this.rotation = 0;
      this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
      this.id = id;
      
      this.collapseBonus = this.orbital - (maxorbit * 0.7);
      if (this.collapseBonus < 0) this.collapseBonus = 0;
      
      // Blue particles for better visibility against the image
      const colors = [
        'rgba(59, 130, 246, 0.9)', // Bright blue (primary)
        'rgba(96, 165, 250, 0.9)', // Light blue
        'rgba(37, 99, 235, 0.9)',  // Dark blue
        'rgba(147, 197, 253, 0.8)', // Very light blue
        'rgba(29, 78, 216, 0.9)'   // Deep blue
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      
      // Compress position (closer to center)
      this.compressPos = centery + (maxorbit / 4) + this.collapseBonus;
      // Expand position (far from center)
      this.expandPos = centery + (this.id % 100) * -12 + (Math.floor(Math.random() * 25) + 1);
      
      this.prevR = this.startRotation;
      this.prevX = this.x;
      this.prevY = this.y;
      this.originalY = this.yOrigin;
    }

    draw(context: CanvasRenderingContext2D, currentTime: number, phase: string) {
      // Update rotation
      const rotationSpeed = phase === 'expand' ? this.speed / 2 : this.speed;
      this.rotation = this.startRotation + (currentTime * rotationSpeed);
      
      // Movement based on phase
      switch (phase) {
        case 'normal':
          // Normal orbit
          if (this.y > this.yOrigin) this.y -= 2.5;
          if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 10;
          break;
          
        case 'compress':
          // Move towards compressed position (closer to center)
          if (this.y > this.compressPos) {
            this.y -= (this.y - this.compressPos) / 8;
          }
          if (this.y < this.compressPos - 4) {
            this.y += 3;
          }
          break;
          
        case 'expand':
          // Move to expansion position (far out)
          if (this.y > this.expandPos) {
            this.y -= Math.floor(this.expandPos - this.y) / -60;
          }
          break;
          
        case 'returning':
          // Return to original orbit slowly
          if (Math.abs(this.y - this.originalY) > 2) {
            this.y += (this.originalY - this.y) / 40;
          } else {
            this.y = this.originalY;
            this.yOrigin = this.originalY;
          }
          break;
      }

      // Draw the particle trail (like in original code)
      context.save();
      context.fillStyle = this.color;
      context.strokeStyle = this.color;
      context.beginPath();
      
      // Calculate old position with rotation
      const oldPos = this.rotate(this.centerx, this.centery, this.prevX, this.prevY, -this.prevR);
      context.moveTo(oldPos[0], oldPos[1]);
      
      // Apply rotation and draw line to current position
      context.translate(this.centerx, this.centery);
      context.rotate(this.rotation);
      context.translate(-this.centerx, -this.centery);
      context.lineTo(this.x, this.y);
      context.stroke();
      
      context.restore();

      this.prevR = this.rotation;
      this.prevX = this.x;
      this.prevY = this.y;
    }

    rotate(cx: number, cy: number, x: number, y: number, angle: number): [number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
      const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    }
  }

  // Handle animation phase changes when isActive changes
  useEffect(() => {
    if (isActive) {
      // Keep it in normal orbital phase continuously
      setAnimationPhase('normal');
    }
  }, [isActive]);

  // Reset when not active
  useEffect(() => {
    if (!isActive) {
      setAnimationPhase('normal');
    }
  }, [isActive]);

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
    const maxorbit = Math.min(size * 0.5, 300); // Increased orbit range for better visibility

    context.globalCompositeOperation = "lighter"; // Change back to lighter for visible particles

    // Set DPI
    const scaleFactor = 192 / 96;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = Math.ceil(size * scaleFactor);
    canvas.height = Math.ceil(size * scaleFactor);
    context.scale(scaleFactor, scaleFactor);

    // Initialize stars - increased quantity for better effect
    if (!isInitialized) {
      starsRef.current = [];
      for (let i = 0; i < 5000; i++) { // Doubled the particles for higher density
        starsRef.current.push(new Star(centerx, centery, maxorbit, i));
      }
      setIsInitialized(true);
    }

    const startTime = Date.now();
    
    function animate() {
      if (!context) return;
      
      const currentTime = (Date.now() - startTime) / 50;
      
      // Clear canvas completely to see particles clearly 
      context.clearRect(0, 0, size, size);
      
      // Add very light trail effect for better particle visibility
      context.fillStyle = 'rgba(0, 0, 0, 0.03)';
      context.fillRect(0, 0, size, size);
      
      // Draw all stars
      starsRef.current.forEach(star => {
        star.draw(context, currentTime, animationPhase);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, isInitialized, animationPhase]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Canvas for particle animation - this is the main effect */}
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          backgroundColor: 'transparent', // Make background transparent so we only see particles
          borderRadius: '50%',
          mixBlendMode: 'screen' // Makes particles more visible against dark backgrounds
        }}
      />
    </div>
  );
}
