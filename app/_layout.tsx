import React from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider } from '../theme/ThemeProvider';

export default function Layout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}