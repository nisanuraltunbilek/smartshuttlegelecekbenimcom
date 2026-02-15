import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/theme';
import { notifications } from '@/constants/mockData';
import { Notification, NotificationType } from '@/types/passenger';

type FilterTab = 'all' | 'info' | 'warning' | 'success';

interface FilterOption {
  key: FilterTab;
  label: string;
}

const FILTER_TABS: FilterOption[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'info', label: 'Bilgi' },
  { key: 'warning', label: 'Uyarı' },
  { key: 'success', label: 'Başarılı' },
];

const TYPE_COLORS: Record<NotificationType, string> = {
  info: '#06B6D4',
  warning: '#F59E0B',
  success: '#10B981',
};

const TYPE_GRADIENTS: Record<NotificationType, [string, string]> = {
  info: ['#06B6D4', '#0891B2'],
  warning: ['#F59E0B', '#D97706'],
  success: ['#10B981', '#059669'],
};

const TYPE_ICONS: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  info: 'information-circle-outline',
  warning: 'alert-circle-outline',
  success: 'checkmark-circle-outline',
};

const TYPE_LABELS: Record<NotificationType, string> = {
  info: 'Bilgi',
  warning: 'Uyarı',
  success: 'Başarılı',
};

const GROUP_LABELS: Record<string, string> = {
  today: 'BUGÜN',
  earlier: 'DAHA ÖNCE',
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [notificationData, setNotificationData] = useState<Notification[]>(notifications);

  const unreadCount = useMemo(
    () => notificationData.filter((n) => !n.read).length,
    [notificationData]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notificationData;
    return notificationData.filter((n) => n.type === activeFilter);
  }, [activeFilter, notificationData]);

  const sections = useMemo(() => {
    const todayItems = filteredNotifications.filter((n) => n.group === 'today');
    const earlierItems = filteredNotifications.filter((n) => n.group === 'earlier');
    const result: { title: string; data: Notification[] }[] = [];
    if (todayItems.length > 0) {
      result.push({ title: 'today', data: todayItems });
    }
    if (earlierItems.length > 0) {
      result.push({ title: 'earlier', data: earlierItems });
    }
    return result;
  }, [filteredNotifications]);

  const handleMarkAllRead = useCallback(() => {
    setNotificationData((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleGoBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{GROUP_LABELS[section.title]}</Text>
    </View>
  );

  const renderNotificationCard = ({ item }: { item: Notification }) => {
    const typeColor = TYPE_COLORS[item.type];
    const gradient = TYPE_GRADIENTS[item.type];
    const icon = TYPE_ICONS[item.type];
    const typeLabel = TYPE_LABELS[item.type];

    return (
      <View
        style={[
          styles.notificationCard,
          { borderLeftColor: typeColor },
          item.read && styles.notificationCardRead,
        ]}
      >
        {/* Unread indicator dot */}
        {!item.read && <View style={styles.unreadDot} />}

        <View style={styles.notificationContent}>
          {/* Icon */}
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons name={icon} size={18} color={colors.white} />
          </LinearGradient>

          {/* Text content */}
          <View style={styles.textContent}>
            <Text style={styles.notificationTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.notificationBody} numberOfLines={2}>
              {item.body}
            </Text>

            <View style={styles.notificationMeta}>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: typeColor + '1A' },
                ]}
              >
                <Text style={[styles.typeBadgeText, { color: typeColor }]}>
                  {typeLabel}
                </Text>
              </View>
              <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderListFooter = () => (
    <View style={styles.bottomHint}>
      <Text style={styles.bottomHintText}>{'← Silmek için sola kaydırın'}</Text>
    </View>
  );

  const renderListEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="notifications-off-outline" size={48} color={colors.textMuted} />
      <Text style={styles.emptyText}>Bildirim bulunamadı</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bildirimler</Text>

          <View style={styles.headerRight}>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>

            <TouchableOpacity onPress={handleMarkAllRead}>
              <Text style={styles.markAllReadText}>Tümünü Okundu İşaretle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.filterTab,
                activeFilter === tab.key
                  ? styles.filterTabActive
                  : styles.filterTabInactive,
              ]}
              onPress={() => setActiveFilter(tab.key)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === tab.key
                    ? styles.filterTabTextActive
                    : styles.filterTabTextInactive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notification List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationCard}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={sections.length > 0 ? renderListFooter : null}
        ListEmptyComponent={renderListEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* ── Header ── */
  header: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    color: colors.text,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  markAllReadText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },

  /* ── Filter Tabs ── */
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabInactive: {
    backgroundColor: colors.background,
  },
  filterTabText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
  },
  filterTabTextActive: {
    color: colors.white,
  },
  filterTabTextInactive: {
    color: colors.textSecondary,
  },

  /* ── Section Headers ── */
  sectionHeader: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  sectionHeaderText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    letterSpacing: 1.2,
  },

  /* ── Notification Card ── */
  notificationCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.base,
    marginBottom: spacing.md,
    padding: spacing.base,
    borderLeftWidth: 4,
    ...shadows.card,
    position: 'relative',
    overflow: 'visible',
  },
  notificationCardRead: {
    opacity: 0.75,
  },
  unreadDot: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    zIndex: 1,
  },
  notificationContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  notificationBody: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  typeBadgeText: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.semibold,
  },
  timeAgo: {
    fontSize: fontSize.tiny,
    color: colors.textMuted,
  },

  /* ── List ── */
  listContent: {
    paddingBottom: spacing['3xl'],
  },

  /* ── Bottom Hint ── */
  bottomHint: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  bottomHintText: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  /* ── Empty State ── */
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    gap: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
});
