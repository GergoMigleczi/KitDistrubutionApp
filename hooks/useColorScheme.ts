import { useTheme } from '../theme/ThemeProvider';

export function useColorScheme() {
  const { colorScheme } = useTheme();
  return colorScheme ?? 'light';
}
