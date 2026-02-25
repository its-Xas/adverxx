import React from 'react';
import { Play, Eye } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView }) => {
  return (
    <div 
      className="group relative overflow-hidden bg-white cursor-pointer hover-lift"
      onClick={() => onView(project)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.category === 'videography' ? (
              <Play className="h-12 w-12 text-white" />
            ) : (
              <Eye className="h-12 w-12 text-white" />
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-inter font-medium bg-white/90 text-gray-900 rounded">
            {project.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-playfair font-medium text-gray-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-sm font-inter mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="text-xs text-gray-500 font-inter">
          {new Date(project.date).getFullYear()}
        </div>
      </div>
    </div>
  );
};