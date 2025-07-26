import { useEffect, useRef } from "react";

export default function ParticleSystem() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      const particleTypes = ['particle', 'chakra-particle', 'energy-particle'];
      const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particle.className = randomType;
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      
      // Add different colors for variety
      const colors = [
        'rgba(59, 130, 246, 0.6)', // Blue chakra
        'rgba(249, 115, 22, 0.6)', // Orange energy
        'rgba(34, 197, 94, 0.6)',  // Green nature
        'rgba(168, 85, 247, 0.6)'  // Purple spiritual
      ];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 10000);
    };

    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  return <div ref={particlesRef} className="particles fixed inset-0 z-0" />;
}
