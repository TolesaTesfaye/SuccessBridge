import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useAuthStore } from '../../store/authStore';
import { AdminStackParamList } from '../../navigation/AdminStack';

export const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
  const { user, logout } = useAuthStore();

  const stats = [
    { label: 'Students', value: '1,420', icon: 'people' as const, color: Colors.primary },
    { label: 'Resources', value: '384', icon: 'folder-open' as const, color: Colors.accent },
    { label: 'Active Quizzes', value: '56', icon: 'flash' as const, color: Colors.warning },
    { label: 'Pending Requests', value: '12', icon: 'alert-circle' as const, color: Colors.error },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Badge label="ADMIN PORTAL" variant="primary" />
            <Text style={styles.greeting}>Welcome, {user?.name || 'Administrator'}</Text>
            <Text style={styles.subGreeting}>Manage students, content, and curriculum operations</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, idx) => (
            <Card key={idx} variant="bordered" style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: `${s.color}18` }]}>
                <Ionicons name={s.icon} size={20} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>

        {/* Section: Management Tools */}
        <Text style={styles.sectionTitle}>Management Modules</Text>
        <View style={styles.menuList}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ManageUsers')}
          >
            <Card variant="surface" style={styles.menuCard}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${Colors.primary}20` }]}>
                  <Ionicons name="people" size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Manage Users & Students</Text>
                  <Text style={styles.menuDesc}>Verify accounts, approvals, student status</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ManageResources')}
          >
            <Card variant="surface" style={styles.menuCard}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${Colors.accent}20` }]}>
                  <Ionicons name="library" size={24} color={Colors.accent} />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Curriculum Resources</Text>
                  <Text style={styles.menuDesc}>Upload & manage PDFs, exam keys, notes</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile')}
          >
            <Card variant="surface" style={styles.menuCard}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${Colors.warning}20` }]}>
                  <Ionicons name="settings-sharp" size={24} color={Colors.warning} />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Admin Settings & Profile</Text>
                  <Text style={styles.menuDesc}>System configuration, preferences, password</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </Card>
          </TouchableOpacity>
        </View>

        {/* Quick System Status */}
        <View style={styles.statusBox}>
          <View style={styles.statusRow}>
            <View style={styles.greenPulse} />
            <Text style={styles.statusText}>API Service: Online (Render Cloud)</Text>
          </View>
          <Text style={styles.statusSub}>PostgreSQL connected • Cache active</Text>
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out of Admin Console</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[6],
  },
  greeting: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginTop: Spacing[2],
  },
  subGreeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
    maxWidth: 260,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  statCard: {
    width: '48%',
    padding: Spacing[4],
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  statValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  menuList: {
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing[4],
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  menuDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  statusBox: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing[6],
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  greenPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  statusText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  statusSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[3],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: `${Colors.error}40`,
    backgroundColor: `${Colors.error}10`,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.error,
  },
});
