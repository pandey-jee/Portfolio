import { useState, useEffect, RefObject } from "react";

export function useCursor(cursorRef: RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interactiveElements = document.querySelectorAll('.chakra-glow, button, a');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return { isHovering };
}
