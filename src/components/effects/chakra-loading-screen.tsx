import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface ChakraLoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

export default function ChakraLoadingScreen({ isLoading, onComplete }: ChakraLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'charging' | 'complete' | 'disappearing'>('charging');

  useEffect(() => {
    if (!isLoading) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          setStage('complete');
          setTimeout(() => {
            setStage('disappearing');
            setTimeout(onComplete, 800);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  useEffect(() => {
    if (stage === 'complete') {
      // Rasengan completion animation
      gsap.to('.rasengan-core', {
        scale: 1.5,
        duration: 0.5,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    }
  }, [stage]);

  if (!isLoading && stage === 'disappearing') return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-dark-navy flex items-center justify-center"
        >
          {/* Background chakra particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-chakra-blue rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="text-center">
            {/* Ninja Avatar */}
            <motion.div
              className="mb-8 relative"
              animate={{
                y: stage === 'charging' ? [0, -10, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: stage === 'charging' ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-chakra-orange to-orange-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🥷
              </div>
              
              {/* Chakra aura */}
              <motion.div
                className="absolute inset-0 rounded-full bg-chakra-blue opacity-30"
                animate={{
                  scale: stage === 'charging' ? [1, 1.3, 1] : [1, 2, 0],
                  opacity: stage === 'charging' ? [0.3, 0.6, 0.3] : [0.6, 0, 0],
                }}
                transition={{
                  duration: stage === 'charging' ? 1.5 : 0.8,
                  repeat: stage === 'charging' ? Infinity : 0,
                }}
              />
            </motion.div>

            {/* Rasengan Formation */}
            <div className="relative mb-6">
              <motion.div
                className="rasengan-core w-16 h-16 mx-auto bg-gradient-to-r from-chakra-blue to-blue-400 rounded-full relative overflow-hidden"
                animate={{
                  rotate: 360,
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                  ],
                }}
                transition={{
                  rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                {/* Spiral pattern */}
                <div className="absolute inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full transform rotate-45" />
                <div className="absolute inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full transform -rotate-45" />
              </motion.div>
              
              {/* Energy particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 4) * (20 + progress * 0.3),
                    y: Math.sin((i * Math.PI) / 4) * (20 + progress * 0.3),
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Progress text */}
            <motion.div
              className="text-white"
              animate={{ opacity: stage === 'disappearing' ? 0 : 1 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-chakra-blue">
                {stage === 'charging' && 'Charging Chakra...'}
                {stage === 'complete' && 'Rasengan Complete!'}
              </h2>
              
              {/* Progress bar */}
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-chakra-blue to-chakra-orange"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <p className="text-sm opacity-75">
                {Math.round(progress)}% Complete
              </p>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-1 mt-4"
              animate={{ opacity: stage === 'disappearing' ? 0 : 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-chakra-blue rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
