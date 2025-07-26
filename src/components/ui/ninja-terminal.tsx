import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaMinusSquare } from 'react-icons/fa';

interface Command {
  input: string;
  output: string | JSX.Element;
  timestamp: string;
}

interface NinjaTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = {
  help: `
Available commands:
• show skills    - Display ninja techniques
• show projects  - List completed missions
• open rasengan  - Trigger chakra animation
• whoami        - Learn about the ninja
• clear         - Clear the terminal
• konnichiwa    - Greeting in Japanese
• status        - Check ninja status
  `,
  
  'show skills': `
🥷 Ninja Techniques Mastered:
┌─────────────────────────────────────┐
│ Frontend Jutsu:                     │
│ ⚛️  React.js (Advanced)             │
│ 🎨 CSS/Tailwind (Expert)           │
│ 📱 Responsive Design (Expert)       │
│ 🎬 Framer Motion (Advanced)        │
│                                     │
│ Backend Ninjutsu:                   │
│ 🚀 Node.js/Express (Advanced)      │
│ 🍃 MongoDB (Intermediate)          │
│ 🔐 Authentication (Intermediate)    │
│                                     │
│ Special Abilities:                  │
│ 📊 Data Visualization              │
│ 🔧 Problem Solving                 │
│ 🎯 Project Management              │
└─────────────────────────────────────┘
  `,
  
  'show projects': `
🎯 Completed Missions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S-RANK: Chakra Art Gallery
        NFT showcase with animations
        
A-RANK: Rasengan Task Manager  
        Productivity enhancement tool
        
A-RANK: Ninja E-Commerce
        Full-stack marketplace
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use 'open project [name]' for details
  `,
  
  whoami: `
🥷 Ninja Profile:
Name: Frontend Shinobi
Rank: Chunin Developer
Village: Hidden Code Village
Specialty: React & Modern Web Jutsu
Mission: Creating amazing web experiences
Chakra Nature: JavaScript & TypeScript
  `,
  
  status: `
🟢 Ninja Status: ACTIVE
📊 Chakra Level: 95%
🎯 Missions Completed: 15+
💻 Current Focus: Portfolio Enhancement
🔥 Energy Level: Maximum
⚡ Ready for new challenges!
  `,
  
  konnichiwa: `
こんにちは! (Hello!)
Welcome to my ninja terminal!
May your code be bug-free and your deployments smooth! 🥷
  `,
  
  clear: 'CLEAR_COMMAND',
  
  'open rasengan': 'RASENGAN_ANIMATION',
};

export default function NinjaTerminal({ isOpen, onClose }: NinjaTerminalProps) {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    
    if (trimmedInput === '') return;

    // Add input to history
    const newCommand: Command = {
      input,
      output: '',
      timestamp,
    };

    setHistory(prev => [...prev, newCommand]);
    setCurrentInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let output: string | JSX.Element = '';

    if (trimmedInput in commands) {
      const commandOutput = commands[trimmedInput as keyof typeof commands];
      
      if (commandOutput === 'CLEAR_COMMAND') {
        setHistory([]);
        setIsTyping(false);
        return;
      } else if (commandOutput === 'RASENGAN_ANIMATION') {
        output = (
          <div className="flex items-center space-x-2 text-chakra-blue">
            <motion.div
              className="w-4 h-4 bg-chakra-blue rounded-full"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 3 }}
            />
            <span>🌀 Rasengan activated! Check the page for chakra effects!</span>
          </div>
        );
      } else {
        output = commandOutput;
      }
    } else {
      output = `Command not found: ${input}\nType 'help' for available commands.`;
    }

    // Update the last command with output
    setHistory(prev => 
      prev.map((cmd, index) => 
        index === prev.length - 1 
          ? { ...cmd, output }
          : cmd
      )
    );
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-4xl h-96 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <FaTerminal className="text-green-400" />
              <span className="text-green-400 font-mono text-sm">ninja-terminal</span>
              <div className="flex space-x-1 ml-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {/* minimize handler */}}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaMinusSquare />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="h-full bg-gray-900 p-4 font-mono text-sm text-green-400 overflow-y-auto"
            style={{ height: 'calc(100% - 48px)' }}
          >
            {/* Welcome message */}
            {history.length === 0 && (
              <div className="mb-4">
                <div className="text-chakra-blue">
                  ╔══════════════════════════════════════╗
                </div>
                <div className="text-chakra-blue">
                  ║     🥷 NINJA TERMINAL v2.0 🥷        ║
                </div>
                <div className="text-chakra-blue">
                  ╚══════════════════════════════════════╝
                </div>
                <div className="mt-2 text-gray-300">
                  Welcome, shinobi! Type 'help' to see available commands.
                </div>
              </div>
            )}

            {/* Command History */}
            {history.map((command, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-chakra-orange">ninja@portfolio:</span>
                  <span className="text-chakra-blue">~$</span>
                  <span className="text-white">{command.input}</span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {command.timestamp}
                  </span>
                </div>
                {command.output && (
                  <motion.div
                    className="mt-1 ml-4 whitespace-pre-line text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {command.output}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>Processing command</span>
                <motion.div
                  className="flex space-x-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div>.</div>
                  <div>.</div>
                  <div>.</div>
                </motion.div>
              </motion.div>
            )}

            {/* Current Input */}
            {!isTyping && (
              <div className="flex items-center space-x-2">
                <span className="text-chakra-orange">ninja@portfolio:</span>
                <span className="text-chakra-blue">~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                  placeholder="Type a command..."
                  autoComplete="off"
                />
                <motion.div
                  className="w-2 h-4 bg-green-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
