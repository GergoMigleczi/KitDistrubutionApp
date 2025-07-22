/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors as CustomColors } from '../theme/colors.ts';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme() ?? 'light';

  // Use provided props if available
  if (props.light && props.dark) {
    return theme === 'dark' ? props.dark : props.light;
  }

  // Use CustomColors as primary, imported Colors as fallback
  const customColor = CustomColors?.[theme]?.[colorName];
  const fallbackColor = Colors[theme]?.[colorName];

  console.log('theme: ', theme);
  console.log('colorName: ', colorName);
  console.log('CustomColors: ', CustomColors);

  if (customColor) {
    console.log('Using CustomColor: ', customColor);
    return customColor;
  }

  if (fallbackColor) {
    console.log('Using fallback color from @/constants/Colors: ', fallbackColor);
    return fallbackColor;
  }

  console.warn(`Color "${colorName}" not found in CustomColors or Colors for theme "${theme}"`);
  return theme === 'dark' ? '#ffffff' : '#000000';
}

export { Colors };