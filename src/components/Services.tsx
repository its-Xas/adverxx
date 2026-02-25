import React from 'react';
import { Video, Camera, Share2, GraduationCap } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Video,
      title: 'Video Production',
      description: 'Commercial videos, documentaries, and branded content from concept to final delivery.',
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Professional photography for commercial, editorial, and corporate needs.',
    },
    {
      icon: Share2,
      title: 'Content Distribution',
      description: 'Strategic distribution across multiple platforms to maximize reach and engagement.',
    },
    {
      icon: GraduationCap,
      title: 'Training & Workshops',
      description: 'Comprehensive training programs for individuals and organizations.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Comprehensive production and distribution services designed to elevate your brand
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="text-center p-6 hover-lift"
            >
              <service.icon className="h-12 w-12 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-playfair font-medium text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};