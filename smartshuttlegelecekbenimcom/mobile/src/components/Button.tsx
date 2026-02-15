import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? colors.white : colors.primary}
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={sizeStyle.iconSize}
              color={variantStyle.textColor}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: variantStyle.textColor, fontSize: sizeStyle.fontSize }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  text: {
    fontWeight: fontWeight.semibold,
  },
  icon: {
    marginRight: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles: Record<ButtonVariant, { container: ViewStyle; textColor: string }> = {
  primary: {
    container: {
      backgroundColor: colors.primary,
    },
    textColor: colors.white,
  },
  secondary: {
    container: {
      backgroundColor: colors.transparent,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    textColor: colors.primary,
  },
  ghost: {
    container: {
      backgroundColor: colors.transparent,
    },
    textColor: colors.primary,
  },
  danger: {
    container: {
      backgroundColor: colors.danger,
    },
    textColor: colors.white,
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; fontSize: number; iconSize: number }> = {
  sm: {
    container: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    fontSize: fontSize.caption,
    iconSize: 14,
  },
  md: {
    container: { paddingVertical: spacing.md, paddingHorizontal: spacing.base },
    fontSize: fontSize.bodySmall,
    iconSize: 18,
  },
  lg: {
    container: { paddingVertical: spacing.base, paddingHorizontal: spacing.xl },
    fontSize: fontSize.body,
    iconSize: 20,
  },
};
