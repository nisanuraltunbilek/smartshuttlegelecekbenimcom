import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/theme';
import { Avatar } from '@/components';
import {
  userProfile,
  upcomingService,
  stopInfo,
  weatherInfo,
  latestNotification,
} from '@/constants/mockData';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Günaydın,';
  if (hour < 18) return 'İyi günler,';
  return 'İyi akşamlar,';
}

function formatDate(): string {
  const now = new Date();
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ];
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${days[now.getDay()]}`;
}

export default function PassengerDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const svc = upcomingService;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.white} />
        }
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={['#6366F1', '#4F46E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + spacing.md }]}
        >
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>
                  {userProfile.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </Text>
              </View>
              <View>
                <Text style={styles.greetingText}>{getGreeting()} {userProfile.name.split(' ')[0]}</Text>
                <Text style={styles.dateText}>{formatDate()}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/(passenger)/notifications')}>
              <Ionicons name="notifications" size={18} color={colors.white} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Content Area (overlaps header slightly) */}
        <View style={styles.contentArea}>

          {/* Upcoming Service Hero Card */}
          <View style={styles.heroCard}>
            <View style={styles.heroInner}>
              <View style={styles.heroTop}>
                <View>
                  <View style={styles.heroTitleRow}>
                    <LinearGradient
                      colors={['#6366F1', '#06B6D4']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.heroIcon}
                    >
                      <Ionicons name="bus" size={12} color={colors.white} />
                    </LinearGradient>
                    <Text style={styles.heroTitle}>Yaklaşan Servis</Text>
                  </View>
                  <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{svc.statusLabel}</Text>
                  </View>
                </View>
                {/* Countdown */}
                <LinearGradient
                  colors={['#6366F1', '#4F46E5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.countdownBox}
                >
                  <Text style={styles.countdownValue}>{svc.countdownMinutes}</Text>
                  <Text style={styles.countdownLabel}>dakika</Text>
                </LinearGradient>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={['#6366F1', '#06B6D4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${svc.progress * 100}%` }]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabelText}>{svc.routeFrom}</Text>
                  <Text style={styles.progressLabelText}>{svc.routeTo}</Text>
                </View>
              </View>

              {/* Route Detail Boxes */}
              <View style={styles.detailBoxes}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Kalkış</Text>
                  <Text style={styles.detailBoxValue}>{svc.departureTime}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Durak</Text>
                  <Text style={styles.detailBoxValue}>{svc.stopName}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Plaka</Text>
                  <Text style={styles.detailBoxValue}>{svc.vehiclePlate}</Text>
                </View>
              </View>
            </View>

            {/* Driver Info Bar */}
            <View style={styles.driverBar}>
              <View style={styles.driverInfo}>
                <LinearGradient
                  colors={['#06B6D4', '#6366F1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.driverAvatar}
                >
                  <Text style={styles.driverInitials}>{svc.driverInitials}</Text>
                </LinearGradient>
                <View>
                  <Text style={styles.driverName}>{svc.driverName}</Text>
                  <Text style={styles.driverRole}>{svc.driverRole}</Text>
                </View>
              </View>
              <View style={styles.driverActions}>
                <TouchableOpacity style={styles.driverActionBtn}>
                  <Ionicons name="call" size={13} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.driverActionBtn}>
                  <Ionicons name="chatbubble" size={13} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Stop & Weather Row */}
          <View style={styles.infoRow}>
            {/* Stop Info */}
            <View style={[styles.infoCard, { flex: 1.2 }]}>
              <View style={styles.infoCardTitle}>
                <Ionicons name="location" size={14} color={colors.primary} />
                <Text style={styles.infoCardTitleText}>Durağınız</Text>
              </View>
              <Text style={styles.stopName}>{stopInfo.name}</Text>
              <View style={styles.stopDistanceRow}>
                <Ionicons name="navigate" size={10} color={colors.textSecondary} />
                <Text style={styles.stopDistance}>{stopInfo.distanceText}</Text>
              </View>
            </View>
            {/* Weather */}
            <View style={[styles.infoCard, { flex: 1 }]}>
              <View style={styles.infoCardTitle}>
                <Ionicons name="sunny" size={14} color={colors.accent} />
                <Text style={styles.infoCardTitleText}>{weatherInfo.city}</Text>
              </View>
              <Text style={styles.weatherTemp}>{weatherInfo.temperature}</Text>
              <Text style={styles.weatherCondition}>{weatherInfo.condition}</Text>
            </View>
          </View>

          {/* Quick Actions Grid */}
          <View>
            <Text style={styles.quickActionsTitle}>Hızlı İşlemler</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionItem} onPress={() => router.push('/(passenger)/tracking')}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="location" size={18} color={colors.primary} />
                </View>
                <Text style={styles.quickActionLabel}>Canlı Takip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#FEF2F2' }]}>
                  <Ionicons name="close-circle" size={18} color={colors.danger} />
                </View>
                <Text style={styles.quickActionLabel}>Gelmiyorum</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="time" size={18} color={colors.success} />
                </View>
                <Text style={styles.quickActionLabel}>Geçmiş</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionItem} onPress={() => router.push('/(passenger)/notifications')}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="notifications" size={18} color={colors.accent} />
                </View>
                <Text style={styles.quickActionLabel}>Bildirimler</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Latest Notification */}
          <View style={styles.notifBanner}>
            <LinearGradient
              colors={['#6366F1', '#06B6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.notifStripe}
            />
            <View style={styles.notifContent}>
              <Text style={styles.notifTitle}>{latestNotification.title}</Text>
              <Text style={styles.notifSubtitle}>{latestNotification.subtitle}</Text>
            </View>
            <Text style={styles.notifTime}>{latestNotification.timeAgo}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },

  // Header
  header: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.xl + spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  greetingText: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  dateText: {
    fontSize: fontSize.tiny,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 1,
  },
  notifBtn: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    backgroundColor: colors.accent,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },

  // Content Area
  contentArea: {
    paddingHorizontal: spacing.md,
    marginTop: -spacing.base,
    gap: spacing.sm,
  },

  // Hero Card
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.elevated,
  },
  heroInner: {
    padding: spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 1,
    marginBottom: spacing.xs,
  },
  heroIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  countdownBox: {
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  countdownValue: {
    fontSize: 28,
    fontWeight: fontWeight.extrabold,
    color: colors.white,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  countdownLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: fontWeight.medium,
    marginTop: 1,
  },

  // Progress Bar
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressTrack: {
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabelText: {
    fontSize: 9,
    color: colors.textSecondary,
  },

  // Detail Boxes
  detailBoxes: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.sm + 2,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  detailBoxLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailBoxValue: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },

  // Driver Bar
  driverBar: {
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  driverAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInitials: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  driverName: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.dark,
  },
  driverRole: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  driverActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  driverActionBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stop & Weather Row
  infoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.cardLight,
  },
  infoCardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 1,
    marginBottom: spacing.sm,
  },
  infoCardTitleText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  stopName: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 3,
  },
  stopDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stopDistance: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  weatherTemp: {
    fontSize: 22,
    fontWeight: fontWeight.extrabold,
    color: colors.dark,
    lineHeight: 24,
  },
  weatherCondition: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Quick Actions
  quickActionsTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickActionItem: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md + 2,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    ...shadows.cardLight,
  },
  quickActionIcon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    fontSize: 10,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
  },

  // Latest Notification
  notifBanner: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md + 2,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.cardLight,
  },
  notifStripe: {
    width: 6,
    height: 34,
    borderRadius: 3,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  notifSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  notifTime: {
    fontSize: 9,
    color: colors.textMuted,
  },
});
