import { useState } from "react";
import { useAudio } from "@/hooks/use-audio";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";
import LoadingScroll from "@/components/ui/loading-scroll";

export default function ProjectsSection() {
  const { featuredProjects, projects, loading, error } = useProjects();
  const { playChakraSound } = useAudio();
  const [showAll, setShowAll] = useState(false);

  const handleToggleProjects = () => {
    playChakraSound();
    
    // Add jutsu transition effect
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      projectsGrid.classList.add('animate-jutsu-transition');
      setTimeout(() => {
        projectsGrid.classList.remove('animate-jutsu-transition');
      }, 1000);
    }
    
    setShowAll(!showAll);
  };

  const displayedProjects = showAll ? projects : featuredProjects;

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-dark-navy relative">
        <div className="container mx-auto px-6">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-4 tech-glow">
            MISSION ARCHIVES
          </h2>
          <p className="text-center text-slate-300 mb-16 text-lg">S-Rank Development Missions Completed</p>
          <LoadingScroll />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-dark-navy relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 tech-glow">
            MISSION ARCHIVES
          </h2>
          <div className="skill-scroll rounded-xl p-8 max-w-md mx-auto">
            <i className="fas fa-exclamation-triangle text-4xl text-orange-500 mb-4"></i>
            <h3 className="font-orbitron text-xl font-bold text-orange-500 mb-2">
              Scroll Loading Failed
            </h3>
            <p className="text-slate-300 text-sm">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-dark-navy relative">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-4 animate-text-glow">
          MISSION ARCHIVES
        </h2>
        <p className="text-center text-slate-300 mb-16 text-lg animate-slide-in-right">
          {showAll ? 'Complete Mission Database' : 'Featured S-Rank Development Missions'}
        </p>
        
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {/* More Projects / Less Projects Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleToggleProjects}
            className="chakra-glow bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300"
          >
            <i className={`fas ${showAll ? 'fa-scroll' : 'fa-plus-circle'} mr-2`}></i>
            {showAll ? 'Show Featured Only' : `View All ${projects.length} Projects`}
          </Button>
          
          {/* Jutsu effect indicator */}
          <p className="text-sm text-slate-400 mt-2">
            {showAll ? 'Sealing jutsu activated' : 'Summoning scroll ready'}
          </p>
        </div>
        
        {/* Floating chakra particles for enhanced anime effect */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-primary rounded-full animate-float opacity-40"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-orange-500 rounded-full animate-float opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-primary rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
}
