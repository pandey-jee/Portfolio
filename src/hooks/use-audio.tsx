import { useCallback, useRef } from "react";

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const createChakraSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    // Create a chakra-like sound effect
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Chakra sound frequencies (mystical, energy-like)
    oscillator.frequency.setValueAtTime(220, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(330, context.currentTime + 0.2);
    
    // Envelope for chakra effect
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
    
    oscillator.type = 'triangle';
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.3);
  }, []);

  const playChakraSound = useCallback(() => {
    try {
      createChakraSound();
      console.log('Chakra sound effect triggered');
    } catch (error) {
      console.log('Audio not available or blocked by browser');
    }
  }, [createChakraSound]);

  return { playChakraSound };
}
