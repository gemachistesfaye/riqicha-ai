export interface FontOption {
  id: string;
  name: string;
  category: 'Sans-Serif' | 'Serif';
  fontFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    category: 'Sans-Serif',
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'Sans-Serif',
    fontFamily: "'Roboto', sans-serif",
  },
  {
    id: 'times',
    name: 'Times New Roman',
    category: 'Serif',
    fontFamily: "'Times New Roman', Times, serif",
  },
  {
    id: 'georgia',
    name: 'Georgia',
    category: 'Serif',
    fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
  },
  {
    id: 'garamond',
    name: 'Garamond',
    category: 'Serif',
    fontFamily: "Garamond, 'Baskerville', 'Times New Roman', serif",
  },
];

export interface FontSizeOption {
  id: 'small' | 'standard' | 'large';
  name: string;
  scale: number;
}

export const FONT_SIZE_OPTIONS: Record<'small' | 'standard' | 'large', FontSizeOption> = {
  small: {
    id: 'small',
    name: 'Small',
    scale: 0.92,
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    scale: 1,
  },
  large: {
    id: 'large',
    name: 'Large',
    scale: 1.08,
  },
};

export interface SpacingOption {
  id: 'compact' | 'balanced' | 'spacious';
  name: string;
  sectionGapClass: string;
  itemGapClass: string;
}

export const SPACING_OPTIONS: Record<'compact' | 'balanced' | 'spacious', SpacingOption> = {
  compact: {
    id: 'compact',
    name: 'Compact',
    sectionGapClass: 'mb-4',
    itemGapClass: 'space-y-2',
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced',
    sectionGapClass: 'mb-6',
    itemGapClass: 'space-y-3.5',
  },
  spacious: {
    id: 'spacious',
    name: 'Spacious',
    sectionGapClass: 'mb-8',
    itemGapClass: 'space-y-5',
  },
};

export type SectionId =
  | 'summary'
  | 'work'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'achievements';

export interface SectionMeta {
  id: SectionId;
  label: string;
}

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  'summary',
  'work',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'achievements',
];

export const SECTION_METAS: Record<SectionId, SectionMeta> = {
  summary: { id: 'summary', label: 'Summary' },
  work: { id: 'work', label: 'Work Experience' },
  education: { id: 'education', label: 'Education' },
  skills: { id: 'skills', label: 'Skills' },
  projects: { id: 'projects', label: 'Projects' },
  certifications: { id: 'certifications', label: 'Certifications' },
  languages: { id: 'languages', label: 'Languages' },
  achievements: { id: 'achievements', label: 'Achievements' },
};
