import React from 'react';
import { Camera, Video, Award, Users } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { icon: Camera, label: 'Projects Completed', value: '200+' },
    { icon: Video, label: 'Videos Produced', value: '150+' },
    { icon: Users, label: 'Clients Served', value: '100+' },
    { icon: Award, label: 'Years Experience', value: '12+' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-8">
              About Adverx
            </h2>
            
            <div className="space-y-6 text-gray-600 font-inter leading-relaxed">
              <p className="text-lg">
                Adverx is a cutting-edge production company specializing in high-quality video and photo content 
                for businesses, brands, and individuals. Founded with a vision to transform how stories are told 
                through visual media, we combine technical expertise with creative innovation.
              </p>
              
              <p>
                Our comprehensive services include commercial video production, professional photography, 
                content distribution across multiple platforms, and specialized training programs for individuals 
                and organizations looking to enhance their visual storytelling capabilities.
              </p>
              
              <p>
                From concept to distribution, we handle every aspect of content creation, ensuring your message 
                reaches the right audience through the most effective channels.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Adverx team at work"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="h-8 w-8 text-gray-900 mx-auto mb-4" />
              <div className="text-3xl font-playfair font-medium text-gray-900 mb-2">{value}</div>
              <div className="text-gray-600 font-inter text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};