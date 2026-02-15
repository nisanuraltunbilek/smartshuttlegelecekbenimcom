export const colors = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',
  accent: '#F59E0B',
  success: '#10B981',
  successLight: '#D1FAE5',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  warning: '#F97316',
  warningLight: '#FEF3C7',
  info: '#06B6D4',
  infoLight: '#CFFAFE',

  dark: '#0F172A',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  background: '#F1F5F9',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
