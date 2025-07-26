import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  rank: string;
  rankColor: string;
  icon: string;
  iconColor: string;
  image: string;
  description: string;
  technologies: string[];
  techColor: string;
  liveLink: string;
  githubLink: string;
  featured: boolean;
}

interface ProjectsData {
  projects: Project[];
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('./data/projects.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        
        const data: ProjectsData = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const allProjects = projects;

  return {
    projects: allProjects,
    featuredProjects,
    loading,
    error
  };
}

export type { Project };