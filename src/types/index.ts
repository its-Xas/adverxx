export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'photography' | 'videography';
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  date: string;
  featured: boolean;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

export interface CustomProjectRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectDuration: number; // in days
  qualityLevel: 'standard' | 'premium' | 'cinematic';
  soundEquipment: boolean;
  stabilizers: boolean;
  lighting: boolean;
  drones: boolean;
  additionalCameras: number;
  services: string[];
  message: string;
  estimatedPrice: number;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}