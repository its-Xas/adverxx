import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Corporate Brand Campaign',
    description: 'Complete visual identity campaign for Fortune 500 company including photography, videography, and multi-platform content distribution.',
    category: 'photography',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    date: '2024-01-15',
    featured: true,
    tags: ['corporate', 'branding', 'campaign', 'distribution']
  },
  {
    id: '2',
    title: 'Product Launch Video',
    description: 'High-end commercial video production for tech startup product launch, distributed across social media platforms and streaming services.',
    category: 'videography',
    imageUrl: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    date: '2024-02-20',
    featured: true,
    tags: ['commercial', 'product', 'launch', 'distribution']
  },
  {
    id: '3',
    title: 'Fashion Editorial Series',
    description: 'Complete fashion photography series for luxury brand, including studio and location shoots with comprehensive post-production.',
    category: 'photography',
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1040946/pexels-photo-1040946.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1040947/pexels-photo-1040947.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    date: '2024-03-10',
    featured: false,
    tags: ['fashion', 'editorial', 'luxury', 'studio']
  },
  {
    id: '4',
    title: 'Documentary Film Project',
    description: 'Award-winning documentary production covering social impact stories, with full post-production and distribution strategy.',
    category: 'videography',
    imageUrl: 'https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    date: '2024-04-05',
    featured: true,
    tags: ['documentary', 'social impact', 'storytelling', 'awards']
  },
  {
    id: '5',
    title: 'Event Coverage Package',
    description: 'Comprehensive event documentation including live streaming, photography, and same-day content delivery for social media.',
    category: 'photography',
    imageUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2747450/pexels-photo-2747450.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    date: '2024-05-12',
    featured: false,
    tags: ['events', 'live streaming', 'social media', 'coverage']
  }
];