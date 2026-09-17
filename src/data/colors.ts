export interface AccentColor {
  id: string;
  name: string;
  hex: string;
  bgHex?: string;
  lightBgHex?: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'navy',
    name: 'Classic Navy',
    hex: '#0f2942',
    lightBgHex: '#f0f4f8',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    hex: '#0284c7',
    lightBgHex: '#f0f9ff',
  },
  {
    id: 'emerald',
    name: 'Forest Emerald',
    hex: '#047857',
    lightBgHex: '#ecfdf5',
  },
  {
    id: 'burgundy',
    name: 'Deep Burgundy',
    hex: '#881337',
    lightBgHex: '#fff1f2',
  },
  {
    id: 'bronze',
    name: 'Warm Bronze',
    hex: '#92400e',
    lightBgHex: '#fffbeb',
  },
  {
    id: 'charcoal',
    name: 'Graphite Charcoal',
    hex: '#334155',
    lightBgHex: '#f8fafc',
  },
];

export const DEFAULT_ACCENT_COLOR = ACCENT_COLORS[1]; // Ocean Blue

