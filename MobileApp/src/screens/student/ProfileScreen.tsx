import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

const MenuItem: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
  badge?: string;
}> = ({ icon, label, onPress, color = Colors.primary, badge }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={styles.menuItem}>
      <View style={[styles.menuIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      {badge && <Badge label={badge} variant="primary" />}
      <Ionicons name="chevron-forward-outline" size={16} color={Colors.textMuted} />
    </View>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  const studentTypeLabel = user?.studentType === 'high_school'
    ? (user.highSchoolGrade?.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'High School Student')
    : (user?.universityLevel?.charAt(0).toUpperCase() + (user?.universityLevel?.slice(1) || '') + ' Student' || 'University Student');

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={['#6C63FF', '#1A1D2E']} style={styles.hero}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={['#8B5CF6', '#6C63FF']} style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatar}>
              <Ionicons name="camera-outline" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Badge label={studentTypeLabel} variant="primary" size="md" />
        </LinearGradient>

        {/* Subscription status */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Payments' as never)}
          style={styles.subBanner}
        >
          <LinearGradient colors={['#242740', '#1A1D2E']} style={styles.subBannerGradient}>
            <Ionicons name="diamond-outline" size={22} color={Colors.warning} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Free Plan</Text>
              <Text style={styles.subSubtitle}>Upgrade to unlock all features</Text>
            </View>
            <Text style={styles.upgradeBtn}>Upgrade →</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Account section */}
        <Card variant="bordered" style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <MenuItem icon="person-outline" label="Edit Profile" onPress={() => {}} />
          <MenuItem icon="lock-closed-outline" label="Change Password" onPress={() => {}} />
          <MenuItem icon="notifications-outline" label="Notifications" onPress={() => navigation.navigate('Notifications' as never)} />
          <MenuItem icon="card-outline" label="Payments & Billing" onPress={() => navigation.navigate('Payments' as never)} />
        </Card>

        {/* Academic section */}
        <Card variant="bordered" style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Academic Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Student Type</Text>
            <Text style={styles.infoValue}>{user?.studentType === 'high_school' ? 'High School' : 'University'}</Text>
          </View>
          {user?.highSchoolGrade && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Grade</Text>
              <Text style={styles.infoValue}>{user.highSchoolGrade.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</Text>
            </View>
          )}
          {user?.highSchoolStream && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Stream</Text>
              <Text style={styles.infoValue}>{user.highSchoolStream === 'natural' ? 'Natural Science' : 'Social Science'}</Text>
            </View>
          )}
          {user?.universityLevel && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Level</Text>
              <Text style={styles.infoValue}>{user.universityLevel.charAt(0).toUpperCase() + user.universityLevel.slice(1)}</Text>
            </View>
          )}
          {user?.university && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>University</Text>
              <Text style={styles.infoValue}>{user.university}</Text>
            </View>
          )}
        </Card>

        {/* Support */}
        <Card variant="bordered" style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Support</Text>
          <MenuItem icon="help-circle-outline" label="Help & FAQ" onPress={() => {}} />
          <MenuItem icon="document-text-outline" label="Terms of Service" onPress={() => {}} />
          <MenuItem icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => {}} />
          <MenuItem icon="star-outline" label="Rate the App" onPress={() => {}} color={Colors.warning} />
        </Card>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>SuccessBridge v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  hero: { paddingTop: 60, paddingBottom: Spacing[8], alignItems: 'center', gap: Spacing[3] },
  avatarContainer: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  avatarText: { fontFamily: 'Inter_700Bold', fontSize: 32, color: Colors.white },
  editAvatar: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.bgDark,
  },
  userName: { fontFamily: 'Inter_700Bold', fontSize: 22, color: Colors.white },
  userEmail: { fontFamily: 'Inter_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  subBanner: { marginHorizontal: Spacing[5], marginTop: Spacing[4] },
  subBannerGradient: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4], borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Colors.border },
  subTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: Colors.textPrimary },
  subSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textSecondary },
  upgradeBtn: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: Colors.primary },
  menuSection: { marginHorizontal: Spacing[5], marginTop: Spacing[4], padding: Spacing[4] },
  menuSectionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing[3] },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingVertical: Spacing[3] },
  menuIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textPrimary },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing[3], borderBottomWidth: 1, borderBottomColor: Colors.border },
  infoLabel: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary },
  infoValue: { fontFamily: 'Inter_500Medium', fontSize: 14, color: Colors.textPrimary },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[2], margin: Spacing[5], padding: Spacing[4], backgroundColor: `${Colors.error}15`, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: `${Colors.error}30` },
  logoutText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.error },
  version: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
});
