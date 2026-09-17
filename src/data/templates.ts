import { TemplateDefinition } from '../types/cv';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional single-column layout centered around clarity and chronological work experience.',
    category: 'Traditional',
    badge: 'Popular',
    recommendedFor: 'Executive, Finance, Legal & Corporate Roles',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean two-column header balance with distinct section hierarchy and contemporary typography.',
    category: 'Contemporary',
    badge: 'Featured',
    recommendedFor: 'Tech, Software Engineering & Marketing Professionals',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Structured sidebar format ideal for highlighting skills alongside key career milestones.',
    category: 'Corporate',
    recommendedFor: 'Management, Business Analysts & Operations',
  },
  {
    id: 'graduate',
    name: 'Graduate',
    description: 'Emphasizes education, academic projects, and early career technical achievements.',
    category: 'Entry-Level',
    recommendedFor: 'Students, Recent Graduates & Career Changers',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Monochrome, ultra-clean aesthetic focusing purely on impact, content, and high readability.',
    category: 'Minimalist',
    recommendedFor: 'Designers, Authors, Researchers & Specialists',
  },
];

