import { useState } from "react";
import { useAudio } from "@/hooks/use-audio";
import { Button } from "@/components/ui/button";
import ResumePreviewModal from "@/components/ui/resume-preview-modal";

export default function HeroSection() {
  const { playChakraSound } = useAudio();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleProjectsClick = () => {
    playChakraSound();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResumeClick = () => {
    playChakraSound();
    setIsResumeModalOpen(true);
  };

  return (
    <section id="home" className="min-h-screen hero-bg flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center z-10">
        <div className="mb-8">
          <img 
            src="/portfolio.png" 
            alt="Abhishek Kumar Pandey - Portfolio Photo" 
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 mx-auto rounded-full border-4 border-primary shadow-lg shadow-primary/50 animate-pulse-glow hover:animate-chakra-spin transition-all duration-500 chakra-glow object-cover" 
          />
        </div>
        
        <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-4 animate-text-glow hover:animate-glitch transition-all duration-300">
          ABHISHEK KUMAR PANDEY
        </h1>
        <h2 className="text-2xl md:text-3xl mb-6 text-orange-500 font-semibold animate-slide-in-left">
          Shinobi Engineer • Chakra-Powered Developer
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-slate-300 animate-text-reveal">
          A 4th-year Computer Science student from Chandigarh University — a ninja coder blending logic, code, and creativity to build the future of web technology.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleProjectsClick}
            className="chakra-glow bg-primary hover:bg-blue-600 px-8 py-4 text-lg font-bold transform hover:scale-105"
          >
            <i className="fas fa-scroll mr-2"></i>View Projects
          </Button>
          <Button 
            onClick={handleResumeClick}
            variant="outline"
            className="chakra-glow border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-bold"
          >
            <i className="fas fa-download mr-2"></i>Download Resume
          </Button>
        </div>
      </div>
      
      {/* Floating chakra orbs */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-orange-500 rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-primary rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
      
      {/* Resume Preview Modal */}
      <ResumePreviewModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </section>
  );
}
