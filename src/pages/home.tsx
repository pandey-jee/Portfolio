import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import RasenganCursor from "@/components/cursor/rasengan-cursor";
import ParticleSystem from "@/components/effects/particle-system";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import AchievementsSection from "@/components/sections/achievements-section";
import CertificatesSection from "@/components/sections/certificates-section";
import ContactSection from "@/components/sections/contact-section";
import NinjaTerminal from "@/components/ui/ninja-terminal";
import { initializeGSAP } from "@/lib/gsap-utils";
import { FaTerminal } from "react-icons/fa";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    initializeGSAP();
  }, []);

  return (
    <div className="bg-dark-navy text-white min-h-screen relative">
      <RasenganCursor />
      <ParticleSystem />
      <Navigation />
      
      {/* Floating controls */}
      <div className="fixed top-20 right-6 z-40 flex flex-col space-y-4">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-green-400 hover:text-green-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          title="Open Ninja Terminal"
        >
          <FaTerminal className="text-xl" />
        </button>
      </div>
      
      <main>
        <HeroSection />
        <div className="section-divider"></div>
        <SkillsSection />
        <div className="section-divider"></div>
        <ProjectsSection />
        <div className="section-divider"></div>
        <CertificatesSection />
        <div className="section-divider"></div>
        <AchievementsSection />
        <div className="section-divider"></div>
        <ContactSection />
      </main>
      
      {/* Ninja Terminal */}
      <NinjaTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
      
      <footer className="bg-slate-900 py-8 border-t border-primary/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 mb-4">
            © 2024 Abhishek Kumar Pandey - Shinobi Engineer | Powered by Chakra & Code
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-primary hover:text-blue-400 transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-primary hover:text-blue-400 transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-primary hover:text-blue-400 transition-colors">
              <i className="fab fa-discord text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
