import React from 'react';
import { X, ChevronLeft, ChevronRight, Star, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!project) return null;

  const images = project.images || [project.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-7xl w-full max-h-[95vh] overflow-hidden rounded-2xl glass-dark shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-charcoal-900/80 backdrop-blur-sm rounded-full text-white hover:bg-charcoal-800/80 hover:text-gold-400 transition-all duration-300 border border-gold-500/20"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid lg:grid-cols-2 gap-0 h-full">
          {/* Media Section */}
          <div className="relative bg-black">
            {project.category === 'videography' && project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                className="w-full h-full object-contain"
                poster={project.imageUrl}
              />
            ) : (
              <div className="relative h-full">
                <img
                  src={images[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-charcoal-900/80 backdrop-blur-sm rounded-full text-white hover:bg-charcoal-800/80 hover:text-gold-400 transition-all duration-300 border border-gold-500/20"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-charcoal-900/80 backdrop-blur-sm rounded-full text-white hover:bg-charcoal-800/80 hover:text-gold-400 transition-all duration-300 border border-gold-500/20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-gold-400 shadow-lg shadow-gold-400/50' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-charcoal-900 to-black">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-4 py-2 text-sm font-inter font-medium rounded-full letter-spacing-wide ${
                  project.category === 'photography'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {project.category.toUpperCase()}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-inter font-medium rounded-full bg-gradient-to-r from-gold-400/20 to-gold-500/20 text-gold-400 border border-gold-500/30">
                    <Star className="h-4 w-4" />
                    FEATURED
                  </span>
                )}
              </div>

              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4 leading-tight">
                {project.title}
              </h2>
            </div>

            <p className="text-antique-200 text-lg mb-8 leading-relaxed-custom font-inter">
              {project.description}
            </p>

            {/* Project Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gold-400" />
                <div>
                  <p className="text-antique-400 text-sm font-inter">Date</p>
                  <p className="text-white font-inter font-medium">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-gold-400 mt-1" />
                <div>
                  <p className="text-antique-400 text-sm font-inter mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-charcoal-800/50 border border-gold-500/20 text-antique-300 rounded-lg hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300 font-inter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="glass rounded-xl p-6 border border-gold-500/20">
              <h4 className="text-xl font-playfair font-bold text-white mb-2">Interested in similar work?</h4>
              <p className="text-antique-300 text-sm mb-4 font-inter">
                Let's discuss how we can create something beautiful together.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 font-inter font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 letter-spacing-wide">
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};