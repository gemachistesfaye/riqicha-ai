export type TemplateId = 'classic' | 'modern' | 'professional' | 'graduate' | 'minimal';

export type AppStep = 'landing' | 'templates' | 'form' | 'preview';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: string; // e.g. 'Beginner', 'Intermediate', 'Advanced', 'Expert'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g. 'Native', 'Fluent', 'Intermediate', 'Basic'
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  badge?: string;
  recommendedFor: string;
}

