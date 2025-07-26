import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ChakraModeToggleProps {
  className?: string;
}

export default function ChakraModeToggle({ className = '' }: ChakraModeToggleProps) {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      const darkMode = savedTheme === 'dark';
      setIsDark(darkMode);
      applyTheme(darkMode);
    } else {
      setIsDark(prefersDark);
      applyTheme(prefersDark);
    }
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleToggle = () => {
    setIsTransitioning(true);
    const newMode = !isDark;
    setIsDark(newMode);
    applyTheme(newMode);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Chakra orb container */}
      <motion.button
        onClick={handleToggle}
        className={`
          relative w-16 h-16 rounded-full transition-all duration-500 
          ${isDark 
            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900' 
            : 'bg-gradient-to-br from-orange-400 via-yellow-400 to-red-400'
          }
          hover:scale-110 active:scale-95
          shadow-lg hover:shadow-2xl
          ${isDark ? 'shadow-blue-500/50' : 'shadow-orange-500/50'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Inner energy core */}
        <motion.div
          className={`
            absolute inset-2 rounded-full transition-all duration-500
            ${isDark 
              ? 'bg-gradient-to-br from-chakra-blue to-blue-600' 
              : 'bg-gradient-to-br from-chakra-orange to-yellow-500'
            }
          `}
          animate={{
            boxShadow: isDark 
              ? ['0 0 20px rgba(59, 130, 246, 0.8)', '0 0 40px rgba(59, 130, 246, 0.4)', '0 0 20px rgba(59, 130, 246, 0.8)']
              : ['0 0 20px rgba(255, 165, 0, 0.8)', '0 0 40px rgba(255, 165, 0, 0.4)', '0 0 20px rgba(255, 165, 0, 0.8)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Icon container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 180, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -180, scale: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMoon className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 180, scale: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaSun className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating particles */}
        <AnimatePresence>
          {isTransitioning && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`
                    absolute w-1 h-1 rounded-full
                    ${isDark ? 'bg-blue-400' : 'bg-orange-400'}
                  `}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    scale: 0, 
                    x: 0, 
                    y: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 40,
                    y: Math.sin((i * Math.PI * 2) / 8) * 40,
                    opacity: [0, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Energy aura */}
        <motion.div
          className={`
            absolute inset-0 rounded-full
            ${isDark 
              ? 'bg-gradient-to-br from-blue-400/20 to-indigo-600/20' 
              : 'bg-gradient-to-br from-orange-400/20 to-red-500/20'
            }
          `}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Mode label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className={`
          text-xs font-medium px-2 py-1 rounded-full transition-all duration-300
          ${isDark 
            ? 'text-blue-400 bg-blue-900/30' 
            : 'text-orange-600 bg-orange-100/30'
          }
        `}>
          {isDark ? 'Dark' : 'Light'}
        </span>
      </motion.div>
    </div>
  );
}
