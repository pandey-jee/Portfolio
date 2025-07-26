import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { Project } from "@/hooks/use-projects";

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const { playChakraSound } = useAudio();

  const handleCardClick = () => {
    playChakraSound();
    if (onViewDetails) {
      onViewDetails(project);
    }
  };

  const handleLiveDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChakraSound();
    window.open(project.liveLink, '_blank');
  };

  const handleGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChakraSound();
    window.open(project.githubLink, '_blank');
  };

  return (
    <div 
      className="mission-card rounded-xl p-6 chakra-glow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`${project.rankColor} px-3 py-1 rounded-full text-sm font-bold`}>
            {project.rank}
          </span>
          <i className={`${project.icon} text-2xl ${project.iconColor}`}></i>
        </div>
        <h3 className="font-orbitron text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-slate-300 text-sm mb-4">{project.subtitle}</p>
      </div>
      
      <img 
        src={project.image}
        alt={`${project.title} project screenshot`}
        className={`w-full h-48 object-cover rounded-lg mb-4 border ${project.iconColor.replace('text-', 'border-')}/30`}
      />
      
      <p className="text-sm text-slate-300 mb-4">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, techIndex) => (
          <span 
            key={techIndex}
            className={`bg-slate-700 ${project.techColor} px-2 py-1 rounded text-xs`}
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-3">
        <Button 
          className="flex-1 bg-primary hover:bg-blue-600 text-white py-2 px-4 text-sm font-bold"
          onClick={handleLiveDemo}
        >
          <i className="fas fa-eye mr-2"></i>Live Demo
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 text-sm font-bold"
          onClick={handleGithub}
        >
          <i className="fab fa-github mr-2"></i>Code
        </Button>
      </div>
    </div>
  );
}