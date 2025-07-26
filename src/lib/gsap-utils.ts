declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function initializeGSAP() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Animation
  gsap.timeline()
    .from('.hero-bg h1', { y: 100, opacity: 0, duration: 1, ease: "power3.out" })
    .from('.hero-bg h2', { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
    .from('.hero-bg p', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .from('.hero-bg .flex', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

  // Skills Section Animation
  gsap.fromTo('.skill-scroll', 
    { y: 100, opacity: 0, rotation: -5 },
    { 
      y: 0, 
      opacity: 1, 
      rotation: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 80%'
      }
    }
  );

  // Projects Section Animation - with delay to ensure elements exist
  setTimeout(() => {
    const missionCards = document.querySelectorAll('.mission-card');
    if (missionCards.length > 0) {
      gsap.fromTo('.mission-card',
        { x: -100, opacity: 0, rotateY: -15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%'
          }
        }
      );
    }
  }, 1000);

  // Achievements Animation
  gsap.fromTo('.achievement-badge',
    { scale: 0, rotation: 180 },
    {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '#achievements',
        start: 'top 80%'
      }
    }
  );
}

export function createChakraRipple(element: HTMLElement, x: number, y: number) {
  if (!window.gsap) return;

  const ripple = document.createElement('div');
  ripple.classList.add('chakra-ripple');
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const rippleX = x - rect.left - size / 2;
  const rippleY = y - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = rippleX + 'px';
  ripple.style.top = rippleY + 'px';
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  window.gsap.to(ripple, {
    scale: 4,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      ripple.remove();
    }
  });
}
