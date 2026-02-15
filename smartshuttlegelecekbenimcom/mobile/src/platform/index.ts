import { Platform, StatusBar } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const statusBarHeight = StatusBar.currentHeight ?? 0;

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

/**
 * Normalizes font weight for Android, which doesn't support all
 * numeric weights consistently.
 */
export function fontWeight(weight: string): string {
  if (isAndroid) {
    const num = parseInt(weight, 10);
    if (num <= 400) return '400';
    if (num <= 600) return '700';
    return '700';
  }
  return weight;
}
