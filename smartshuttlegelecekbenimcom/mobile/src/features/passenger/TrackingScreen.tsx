import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/theme';
import { upcomingService } from '@/constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PROGRESS_PERCENTAGE = 0.65;

export default function TrackingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const svc = upcomingService;

  return (
    <View style={styles.container}>
      {/* ───── Full-Screen Map Area ───── */}
      <View style={styles.mapArea}>
        <Text style={styles.mapPlaceholder}>Harita Alanı</Text>

        {/* Floating Back Button (top-left) */}
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + spacing.sm }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.dark} />
        </TouchableOpacity>

        {/* Floating ETA Badge (top-right) */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.etaBadge, { top: insets.top + spacing.sm }]}
        >
          <Text style={styles.etaLabel}>Tahmini Varış</Text>
          <Text style={styles.etaValue}>3 dk</Text>
        </LinearGradient>

        {/* Floating My-Location Button (bottom-right of map) */}
        <TouchableOpacity style={styles.myLocationButton} activeOpacity={0.7}>
          <Ionicons name="locate" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* ───── Bottom Sheet ───── */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + spacing.base }]}>
        {/* Drag Handle */}
        <View style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        {/* Status Row */}
        <View style={styles.statusRow}>
          <View style={styles.statusLeft}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Servis Yaklaşıyor</Text>
          </View>
          <LinearGradient
            colors={[colors.success, '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statusBadge}
          >
            <Text style={styles.statusBadgeText}>3 dk</Text>
          </LinearGradient>
        </View>

        {/* Progress Bar Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${PROGRESS_PERCENTAGE * 100}%` }]}
            />
            {/* Bus Indicator Circle */}
            <View
              style={[
                styles.busIndicator,
                { left: `${PROGRESS_PERCENTAGE * 100}%` },
              ]}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.busIndicatorInner}
              >
                <Ionicons name="bus" size={10} color={colors.white} />
              </LinearGradient>
            </View>
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelText}>Kalkış</Text>
            <Text style={styles.progressLabelText}>Durağınız</Text>
            <Text style={styles.progressLabelText}>Varış</Text>
          </View>
        </View>

        {/* Driver Info Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverInfoRow}>
            {/* Avatar */}
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.driverAvatar}
            >
              <Text style={styles.driverInitials}>{svc.driverInitials}</Text>
            </LinearGradient>

            {/* Name & Plate & Rating */}
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{svc.driverName}</Text>
              <View style={styles.driverMeta}>
                <Text style={styles.driverPlate}>{svc.vehiclePlate}</Text>
                <View style={styles.driverRatingRow}>
                  <Text style={styles.driverRatingStar}>★</Text>
                  <Text style={styles.driverRatingValue}>{svc.driverRating}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Ionicons name="call" size={18} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Ionicons name="chatbubble" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* ── Map Area ── */
  mapArea: {
    flex: 1,
    backgroundColor: '#E8F0EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
  },

  /* ── Floating Back Button ── */
  backButton: {
    position: 'absolute',
    left: spacing.base,
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },

  /* ── Floating ETA Badge ── */
  etaBadge: {
    position: 'absolute',
    right: spacing.base,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    ...shadows.elevated,
  },
  etaLabel: {
    fontSize: 9,
    fontWeight: fontWeight.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  etaValue: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.extrabold,
    color: colors.white,
    marginTop: 1,
  },

  /* ── Floating My-Location Button ── */
  myLocationButton: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },

  /* ── Bottom Sheet ── */
  bottomSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl + 4,
    borderTopRightRadius: borderRadius.xl + 4,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    ...shadows.elevated,
  },

  /* Drag Handle */
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },

  /* ── Status Row ── */
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  statusBadge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  statusBadgeText: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },

  /* ── Progress Section ── */
  progressSection: {
    marginBottom: spacing.base,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  busIndicator: {
    position: 'absolute',
    top: -9,
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  busIndicatorInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  progressLabelText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },

  /* ── Driver Info Card ── */
  driverCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.xl,
    padding: spacing.base,
  },
  driverInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInitials: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  driverDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  driverName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginBottom: 2,
  },
  driverMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  driverPlate: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  driverRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  driverRatingStar: {
    fontSize: fontSize.caption,
    color: colors.accent,
  },
  driverRatingValue: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  driverActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
