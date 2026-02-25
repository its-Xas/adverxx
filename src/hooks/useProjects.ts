import { useState, useEffect } from 'react';
import { Project } from '../types';
import { initialProjects } from '../data/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('portfolio-projects', JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio-projects', JSON.stringify(newProjects));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    const newProjects = [...projects, newProject];
    saveProjects(newProjects);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const newProjects = projects.map(project =>
      project.id === id ? { ...project, ...updates } : project
    );
    saveProjects(newProjects);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    saveProjects(newProjects);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
};