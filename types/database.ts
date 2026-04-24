export type UserRole = 'superadmin' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url?: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

export interface Alumni {
  id: string;
  name: string;
  phone: string;
  batch: string;
  job: string;
  company: string;
  social_link: string;
  status: 'pending' | 'approved';
}
