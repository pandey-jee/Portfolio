import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import RasenganCursor from "@/components/cursor/rasengan-cursor";
import ParticleSystem from "@/components/effects/particle-system";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import AchievementsSection from "@/components/sections/achievements-section";
import ContactSection from "@/components/sections/contact-section";
import { initializeGSAP } from "@/lib/gsap-utils";

export default function Home() {
  useEffect(() => {
    initializeGSAP();
  }, []);

  return (
    <div className="bg-dark-navy text-white min-h-screen">
      <RasenganCursor />
      <ParticleSystem />
      <Navigation />
      
      <main>
        <HeroSection />
        <div className="section-divider"></div>
        <SkillsSection />
        <div className="section-divider"></div>
        <ProjectsSection />
        <div className="section-divider"></div>
        <AchievementsSection />
        <div className="section-divider"></div>
        <ContactSection />
      </main>
      
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
