import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colorScheme: ColorSchemeName;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  colorScheme: Appearance.getColorScheme(),
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    if (mode === 'system') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
      });
      return () => subscription.remove();
    } else {
      setColorScheme(mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
