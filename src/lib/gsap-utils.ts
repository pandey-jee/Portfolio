import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance-optimized animation settings
export const ANIMATION_CONFIG = {
  // Smooth, chakra-like easing
  ease: {
    chakra: "power2.out",
    rasengan: "elastic.out(1, 0.5)",
    gentle: "power1.inOut",
    swift: "power3.out"
  },
  
  // Optimized durations (not too fast, not too slow)
  duration: {
    quick: 0.3,
    normal: 0.6,
    slow: 1.2,
    cinematic: 2.0
  },
  
  // Stagger timing for sequences
  stagger: {
    cards: 0.1,
    elements: 0.05,
    sections: 0.2
  }
};

export function initializeGSAP() {
  // Set global GSAP defaults for performance
  gsap.defaults({
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.ease.chakra
  });

  // Configure for better performance
  gsap.config({
    nullTargetWarn: false,
    force3D: true // Hardware acceleration
  });

  // Hero Section Animation
  gsap.timeline()
    .from('.hero-bg h1', { y: 100, opacity: 0, duration: 1, ease: "power3.out" })
    .from('.hero-bg h2', { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
    .from('.hero-bg p', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .from('.hero-bg .flex', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

  // Skills Section Animation with scroll reversing
  gsap.utils.toArray('.skill-scroll').forEach((skill: any, index: number) => {
    gsap.fromTo(skill, 
      { y: 100, opacity: 0, rotation: -5, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        rotation: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skill,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            // Chakra energy effect on scroll down
            gsap.to(skill, {
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)",
              duration: 0.4,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeave: () => {
            gsap.to(skill, {
              boxShadow: "0 0 0px rgba(59, 130, 246, 0), inset 0 0 0px rgba(59, 130, 246, 0)",
              duration: 0.3
            });
          },
          onEnterBack: () => {
            gsap.to(skill, {
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)",
              duration: 0.4,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeaveBack: () => {
            gsap.to(skill, {
              boxShadow: "0 0 0px rgba(59, 130, 246, 0), inset 0 0 0px rgba(59, 130, 246, 0)",
              duration: 0.3
            });
          }
        }
      }
    );
  });

  // Projects Section Animation - with delay to ensure elements exist
  setTimeout(() => {
    const missionCards = document.querySelectorAll('.mission-card');
    if (missionCards.length > 0) {
      missionCards.forEach((card: any, index: number) => {
        gsap.fromTo(card,
          { x: -100, opacity: 0, rotateY: -15, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: "play reverse play reverse",
              onEnter: () => {
                // Mission scroll glow effect
                gsap.to(card, {
                  filter: "drop-shadow(0 0 25px rgba(255, 165, 0, 0.6)) brightness(1.1)",
                  transform: "translateZ(0) rotateY(2deg)",
                  duration: 0.5,
                  ease: ANIMATION_CONFIG.ease.chakra
                });
              },
              onLeave: () => {
                gsap.to(card, {
                  filter: "drop-shadow(0 0 0px rgba(255, 165, 0, 0)) brightness(1)",
                  transform: "translateZ(0) rotateY(0deg)",
                  duration: 0.3
                });
              },
              onEnterBack: () => {
                gsap.to(card, {
                  filter: "drop-shadow(0 0 25px rgba(255, 165, 0, 0.6)) brightness(1.1)",
                  transform: "translateZ(0) rotateY(2deg)",
                  duration: 0.5,
                  ease: ANIMATION_CONFIG.ease.chakra
                });
              },
              onLeaveBack: () => {
                gsap.to(card, {
                  filter: "drop-shadow(0 0 0px rgba(255, 165, 0, 0)) brightness(1)",
                  transform: "translateZ(0) rotateY(0deg)",
                  duration: 0.3
                });
              }
            }
          }
        );
      });
    }
  }, 1000);

  // Achievements Animation with scroll reversing
  gsap.utils.toArray('.achievement-badge').forEach((badge: any, index: number) => {
    gsap.fromTo(badge,
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: badge,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            // Achievement sparkle effect
            gsap.to(badge, {
              filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) saturate(1.2)",
              duration: 0.4,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeave: () => {
            gsap.to(badge, {
              filter: "drop-shadow(0 0 0px rgba(255, 215, 0, 0)) saturate(1)",
              duration: 0.3
            });
          },
          onEnterBack: () => {
            gsap.to(badge, {
              filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) saturate(1.2)",
              duration: 0.4,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeaveBack: () => {
            gsap.to(badge, {
              filter: "drop-shadow(0 0 0px rgba(255, 215, 0, 0)) saturate(1)",
              duration: 0.3
            });
          }
        }
      }
    );
  });

  // Initialize scroll-based animations for new components
  initializeScrollAnimations();
}

// Smooth scroll reveal animations (performance-focused)
const initializeScrollAnimations = () => {
  // Animate sections as they come into view with scroll-based reversing
  gsap.utils.toArray('.section-reveal').forEach((section: any) => {
    gsap.fromTo(section, 
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.ease.chakra,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Enhanced entry animation when scrolling down
            gsap.to(section, {
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              duration: 0.3,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeave: () => {
            // Reverse animation when scrolling past
            gsap.to(section, {
              boxShadow: "0 0 0px rgba(59, 130, 246, 0)",
              duration: 0.3,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onEnterBack: () => {
            // Re-trigger when scrolling back up
            gsap.to(section, {
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              duration: 0.3,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          },
          onLeaveBack: () => {
            // Fade out when scrolling back past
            gsap.to(section, {
              boxShadow: "0 0 0px rgba(59, 130, 246, 0)",
              duration: 0.3,
              ease: ANIMATION_CONFIG.ease.chakra
            });
          }
        }
      }
    );
  });

  // Certificate scrolls animation with bidirectional scroll behavior
  setTimeout(() => {
    const certCards = document.querySelectorAll('.cert-card');
    if (certCards.length > 0) {
      certCards.forEach((card: any, index: number) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, rotationY: -10, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: "play reverse play reverse",
              onEnter: () => {
                // Chakra glow effect on scroll down
                gsap.to(card, {
                  filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.4))",
                  duration: 0.5,
                  ease: ANIMATION_CONFIG.ease.chakra
                });
              },
              onLeave: () => {
                // Remove glow when scrolling past
                gsap.to(card, {
                  filter: "drop-shadow(0 0 0px rgba(255, 165, 0, 0))",
                  duration: 0.3
                });
              },
              onEnterBack: () => {
                // Re-apply glow when scrolling back
                gsap.to(card, {
                  filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.4))",
                  duration: 0.5,
                  ease: ANIMATION_CONFIG.ease.chakra
                });
              },
              onLeaveBack: () => {
                // Remove glow when leaving backward
                gsap.to(card, {
                  filter: "drop-shadow(0 0 0px rgba(255, 165, 0, 0))",
                  duration: 0.3
                });
              }
            }
          }
        );
      });
    }
  }, 500);
};

export function createChakraRipple(element: HTMLElement, x: number, y: number) {
  const ripple = document.createElement('div');
  ripple.classList.add('chakra-ripple');
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const rippleX = x - rect.left - size / 2;
  const rippleY = y - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${rippleX}px;
    top: ${rippleY}px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: scale(0);
    will-change: transform, opacity;
  `;
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  gsap.to(ripple, {
    scale: 4,
    opacity: 0,
    duration: 0.6,
    ease: ANIMATION_CONFIG.ease.chakra,
    onComplete: () => ripple.remove()
  });
}

// Chakra loading animation
export const animateChakraLoading = (element: HTMLElement, onComplete?: () => void) => {
  const tl = gsap.timeline({ onComplete });
  
  tl.fromTo(element,
    {
      scale: 0,
      rotation: -180,
      opacity: 0
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.duration.cinematic,
      ease: ANIMATION_CONFIG.ease.rasengan
    }
  )
  .to(element, {
    rotation: 360,
    repeat: 2,
    duration: ANIMATION_CONFIG.duration.normal,
    ease: "none"
  }, "-=0.5");

  return tl;
};

// Performance-friendly scroll parallax
export const initParallax = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Cleanup function for performance
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
  
  // Remove floating particles
  document.querySelectorAll('.floating-particle, .chakra-ripple').forEach(el => el.remove());
};
