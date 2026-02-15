import { Platform } from 'react-native';

export const fontFamily = Platform.select({
  ios: 'Inter',
  android: 'Inter',
  default: 'Inter',
}) as string;

export const fontSize = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  tiny: 10,
} as const;

export const fontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const lineHeight = {
  h1: 36,
  h2: 32,
  h3: 28,
  h4: 24,
  body: 24,
  bodySmall: 20,
  caption: 16,
  tiny: 14,
} as const;
