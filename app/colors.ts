export interface ColorScheme {
  name: string;
  primary: string; // Hex color for main UI elements
  hex: number; // For Three.js (0x format) - default/center light
  rgb: string; // For rgba() usage
  leftLightColor?: number; // Optional: For left light (Three.js format)
  rightLightColor?: number; // Optional: For right light (Three.js format)
}

export const colorSchemes: ColorScheme[] = [
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
  },
  {
    name: 'violet-cyan',
    primary: '#ff00ff', // Use violet as primary for UI
    hex: 0x8080ff, // Average for center light
    rgb: '255, 0, 255',
    leftLightColor: 0xff00ff, // Violet
    rightLightColor: 0x00ffff // Cyan
  }
];

export function getRandomColorScheme(): ColorScheme {
  const randomIndex = Math.floor(Math.random() * colorSchemes.length);
  return colorSchemes[randomIndex];
}

