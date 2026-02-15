import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/theme';
import { userProfile } from '@/constants/mockData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleSignOut = () => {
    Alert.alert('Oturumu Kapat', 'Oturumunuzu kapatmak istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Oturumu Kapat', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Gradient Header */}
      <LinearGradient
        colors={['#6366F1', '#4F46E5', '#4338CA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + spacing.base }]}
      >
        {/* Settings gear icon */}
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarOuter}>
            <Text style={styles.avatarText}>{userProfile.initials}</Text>
          </View>
          <View style={styles.editAvatarButton}>
            <Ionicons name="pencil" size={10} color={colors.primary} />
          </View>
        </View>

        {/* Name & Department */}
        <Text style={styles.headerName}>{userProfile.name}</Text>
        <Text style={styles.headerDepartment}>Yazılım Geliştirme Departmanı</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="pencil-outline" size={14} color="#FFFFFF" />
          <Text style={styles.editProfileText}>Profili Düzenle</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Content area overlapping header */}
      <View style={styles.contentArea}>
        {/* Kişisel Bilgiler Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>KİŞİSEL BİLGİLER</Text>

          {/* Email row */}
          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="mail-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.infoTexts}>
                <Text style={styles.infoLabel}>E-posta</Text>
                <Text style={styles.infoValue}>{userProfile.email}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Phone row */}
          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.iconBg}
              >
                <Ionicons name="call-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.infoTexts}>
                <Text style={styles.infoLabel}>Telefon</Text>
                <Text style={styles.infoValue}>{userProfile.phone}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Department row */}
          <View style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.iconBg}
              >
                <Ionicons name="business-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.infoTexts}>
                <Text style={styles.infoLabel}>Departman</Text>
                <Text style={styles.infoValue}>{userProfile.department}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bildirim Ayarlari Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>BİLDİRİM AYARLARI</Text>

          {/* Push Bildirimler */}
          <View style={styles.settingRow}>
            <View style={styles.settingRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="notifications-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Push Bildirimler</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: colors.border, true: '#6366F1' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={colors.border}
            />
          </View>

          <View style={styles.divider} />

          {/* E-posta Bildirimleri */}
          <View style={styles.settingRow}>
            <View style={styles.settingRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="mail-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.settingLabel}>E-posta Bildirimleri</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: colors.border, true: '#6366F1' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={colors.border}
            />
          </View>

          <View style={styles.divider} />

          {/* Sessiz Saatler */}
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="moon-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Sessiz Saatler</Text>
            </View>
            <View style={styles.settingRightWithChevron}>
              <Text style={styles.settingValue}>22:00 - 07:00</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Uygulama Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>UYGULAMA</Text>

          {/* Dil */}
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="language-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Dil</Text>
            </View>
            <View style={styles.settingRightWithChevron}>
              <Text style={styles.settingValue}>Türkçe</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Tema */}
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingRowLeft}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.iconBg}
              >
                <Ionicons name="sunny-outline" size={14} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Tema</Text>
            </View>
            <View style={styles.settingRightWithChevron}>
              <Text style={styles.settingValue}>Açık</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutCard} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Oturumu Kapat</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>DSOYS v2.1.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },
  headerGradient: {
    paddingBottom: spacing['3xl'] + spacing.base,
    alignItems: 'center',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  headerName: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  headerDepartment: {
    fontSize: fontSize.bodySmall,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.base,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  editProfileText: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.medium,
    color: '#FFFFFF',
  },
  contentArea: {
    marginTop: -14,
    paddingHorizontal: spacing.base,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionLabel: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconBg: {
    width: 26,
    height: 26,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTexts: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  settingRightWithChevron: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingValue: {
    fontSize: fontSize.bodySmall,
    color: colors.textSecondary,
  },
  signOutCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.base,
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  signOutText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.danger,
  },
  versionText: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    opacity: 0.6,
  },
});
