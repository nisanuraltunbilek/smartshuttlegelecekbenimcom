import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSize, fontWeight } from '@/theme';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, { container: number; fontSize: number }> = {
  sm: { container: 32, fontSize: fontSize.caption },
  md: { container: 44, fontSize: fontSize.body },
  lg: { container: 80, fontSize: fontSize.h1 },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const dim = sizeMap[size];
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        { width: dim.container, height: dim.container, borderRadius: dim.container / 2 },
      ]}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { borderRadius: dim.container / 2 },
        ]}
      >
        <Text style={[styles.initials, { fontSize: dim.fontSize }]}>{initials}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
});
