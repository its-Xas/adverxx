import React from 'react';

export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning director with 12+ years in commercial production.',
    },
    {
      name: 'Marcus Chen',
      role: 'Lead Cinematographer',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technical expert in cinematography and post-production.',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Senior Photographer',
      image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Fashion and commercial photographer specializing in editorial work.',
    },
    {
      name: 'David Kim',
      role: 'Training Coordinator',
      image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Experienced educator leading our training programs.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-6">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Meet the creative professionals behind Adverx's award-winning productions
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="text-center animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover mx-auto mb-4"
                />
              </div>
              
              <h3 className="text-xl font-playfair font-medium text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600 font-inter text-sm mb-4">
                {member.role}
              </p>
              <p className="text-gray-500 font-inter text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};