import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/theme';

type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: CardVariant;
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
});

const variantStyles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    ...shadows.elevated,
  },
});
