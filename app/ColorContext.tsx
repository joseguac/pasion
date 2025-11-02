"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorScheme, getRandomColorScheme } from './colors';

interface ColorContextType {
  colorScheme: ColorScheme;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(null);

  useEffect(() => {
    // Only set color scheme on client side to ensure randomness per user
    setColorScheme(getRandomColorScheme());
  }, []);

  // Don't render children until color scheme is set
  if (!colorScheme) {
    return null;
  }

  return (
    <ColorContext.Provider value={{ colorScheme }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorProvider');
  }
  return context.colorScheme;
}

