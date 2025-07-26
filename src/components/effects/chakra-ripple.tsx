import { useEffect, useRef } from "react";

interface ChakraRippleProps {
  x: number;
  y: number;
  onComplete: () => void;
}

export default function ChakraRipple({ x, y, onComplete }: ChakraRippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ripple = rippleRef.current;
    if (!ripple) return;

    // Use GSAP for ripple animation
    if (window.gsap) {
      window.gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete
      });
    }
  }, [onComplete]);

  return (
    <div
      ref={rippleRef}
      className="chakra-ripple"
      style={{
        left: x - 25,
        top: y - 25,
        width: 50,
        height: 50,
      }}
    />
  );
}
