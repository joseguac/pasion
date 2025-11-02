export interface ColorScheme {
  name: string;
  primary: string; // Hex color for main UI elements
  hex: number; // For Three.js (0x format)
  rgb: string; // For rgba() usage
}

export const colorSchemes: ColorScheme[] = [
  {
    name: 'green',
    primary: '#00ff00',
    hex: 0x00ff00,
    rgb: '0, 255, 0'
  },
  {
    name: 'cyan',
    primary: '#00ffff',
    hex: 0x00ffff,
    rgb: '0, 255, 255'
  },
  {
    name: 'blue',
    primary: '#0080ff',
    hex: 0x0080ff,
    rgb: '0, 128, 255'
  },
  {
    name: 'purple',
    primary: '#8000ff',
    hex: 0x8000ff,
    rgb: '128, 0, 255'
  },
  {
    name: 'violet',
    primary: '#ff00ff',
    hex: 0xff00ff,
    rgb: '255, 0, 255'
  }
];

export function getRandomColorScheme(): ColorScheme {
  const randomIndex = Math.floor(Math.random() * colorSchemes.length);
  return colorSchemes[randomIndex];
}

