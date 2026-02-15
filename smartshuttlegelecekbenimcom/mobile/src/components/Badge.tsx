import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/theme';

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'primary';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: colors.successLight, text: colors.success },
  danger: { bg: colors.dangerLight, text: colors.danger },
  warning: { bg: colors.warningLight, text: colors.warning },
  info: { bg: colors.infoLight, text: colors.info },
  primary: { bg: '#EEF2FF', text: colors.primary },
};

export function Badge({ label, variant = 'primary' }: BadgeProps) {
  const { bg, text } = variantColors[variant];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.semibold,
    textTransform: 'capitalize',
  },
});
