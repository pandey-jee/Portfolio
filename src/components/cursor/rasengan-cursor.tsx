import { useEffect, useRef } from "react";
import { useCursor } from "@/hooks/use-cursor";

export default function RasenganCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { isHovering } = useCursor(cursorRef);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
    />
  );
}
