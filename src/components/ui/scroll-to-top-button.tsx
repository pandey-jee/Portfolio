import { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Remove glow if we land at the top and are auto-scrolling
        if (isAutoScrolling && window.pageYOffset === 0) {
          setIsAutoScrolling(false);
          setIsGlowing(false);
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isAutoScrolling]);

  const scrollToTop = () => {
    // Create flash overlay
    const flash = document.createElement('div');
    flash.className = 'fixed top-0 left-0 w-full h-full bg-blue-400 opacity-60 pointer-events-none z-[9999] animate-fade-out';
    flash.style.animation = 'fadeOut 0.2s ease forwards';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);

    // Activate glowing effect for duration of scroll
    setIsGlowing(true);
    setIsAutoScrolling(true);

    // Custom smooth scroll with easing
    const start = window.pageYOffset;
    const duration = 650 + Math.min(start * 0.5, 1500); // longer for bigger scrolls
    const startTime = performance.now();

    function scrollStep(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing for smoother finish
      const eased = 1 - Math.pow(1 - progress, 2.7);

      window.scrollTo(0, start * (1 - eased));
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        // Done scrolling, remove glowing
        setIsAutoScrolling(false);
        setIsGlowing(false);
      }
    }
    requestAnimationFrame(scrollStep);
  };

  return (
    <>
      {/* Add custom CSS for fade out animation */}
      <style>
        {`
          @keyframes fadeOut {
            from { opacity: 0.6; }
            to { opacity: 0; }
          }
        `}
      </style>
      
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-24 right-5 z-50
          bg-blue-500 rounded-full p-4
          shadow-lg shadow-blue-400/50
          cursor-pointer transition-all duration-300
          ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          ${isGlowing 
            ? 'bg-blue-600 shadow-blue-300 shadow-[0_0_35px_#60d6f6,0_0_55px_#90e0ff,0_0_110px_10px_rgba(150,245,255,0.6),0_0_160px_24px_rgba(96,214,246,0.53)] scale-110' 
            : 'hover:bg-blue-600 hover:shadow-blue-300 hover:shadow-[0_0_35px_#60d6f6,0_0_55px_#90e0ff,0_0_110px_10px_rgba(150,245,255,0.6),0_0_160px_24px_rgba(96,214,246,0.53)] hover:scale-110'
          }
        `}
        aria-label="Back to top"
        title="Back to top"
      >
        {/* Chakra swirl SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path 
            d="M24 8c5.7 0 10.7 4.1 10.7 10.7 0 7.5-8.5 11.2-14.2 15.6-2.9 2.3-2.5 5.9 2.4 5.9 3.8 0 7-2.4 9.3-6.1" 
            stroke="#aaf4ff" 
            strokeWidth="2.2"
          />
          <circle 
            cx="24" 
            cy="24" 
            r="19" 
            stroke="#60d6f6" 
            strokeWidth="1.6" 
            opacity="0.33"
          />
          <polyline 
            points="19,28 24,20 29,28" 
            stroke="white" 
            strokeWidth="2.8" 
            fill="none"
          />
        </svg>
      </button>
    </>
  );
}
