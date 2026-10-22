import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { User, UserRole } from '../../types';

export const ManageUsersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');

  // Realistic mock users list with Ethiopian students
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Abebe Kebede',
      email: 'abebe.k@gmail.com',
      role: 'student',
      studentType: 'high_school',
      highSchoolGrade: 'grade_12',
      highSchoolStream: 'natural',
      isApproved: true,
      approvalStatus: 'approved',
      isEmailVerified: true,
    },
    {
      id: '2',
      name: 'Selamawit Tadesse',
      email: 'selam.t@aau.edu.et',
      role: 'student',
      studentType: 'university',
      university: 'Addis Ababa University',
      department: 'Electrical Engineering',
      isApproved: true,
      approvalStatus: 'approved',
      isEmailVerified: true,
    },
    {
      id: '3',
      name: 'Yonas Haile',
      email: 'yonas.h@gmail.com',
      role: 'student',
      studentType: 'high_school',
      highSchoolGrade: 'grade_11',
      highSchoolStream: 'social',
      isApproved: false,
      approvalStatus: 'pending',
      isEmailVerified: true,
    },
    {
      id: '4',
      name: 'Meron Alemu',
      email: 'meron.alemu@astu.edu.et',
      role: 'student',
      studentType: 'university',
      university: 'ASTU',
      department: 'Computer Science',
      isApproved: true,
      approvalStatus: 'approved',
      isEmailVerified: true,
    },
    {
      id: '5',
      name: 'Dr. Tolesa Tesfaye',
      email: 'tolesa@successbridge.com',
      role: 'admin',
      isApproved: true,
      approvalStatus: 'approved',
      isEmailVerified: true,
    },
  ]);

  const handleApprove = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isApproved: true, approvalStatus: 'approved' } : u
      )
    );
    Alert.alert('Student Approved', 'The student can now access full study resources.');
  };

  const handleReject = (userId: string) => {
    Alert.alert(
      'Reject Student',
      'Are you sure you want to reject this student application?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === userId ? { ...u, isApproved: false, approvalStatus: 'rejected' } : u
              )
            );
          },
        },
      ]
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Users</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder="Search by student name or email..."
          placeholderTextColor={Colors.textMuted}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Role Filters */}
      <View style={styles.filterRow}>
        {(['all', 'student', 'admin'] as const).map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.filterChip, roleFilter === r && styles.filterChipActive]}
            onPress={() => setRoleFilter(r)}
          >
            <Text
              style={[
                styles.filterChipText,
                roleFilter === r && styles.filterChipTextActive,
              ]}
            >
              {r === 'all' ? 'All Accounts' : r === 'student' ? 'Students' : 'Admins'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card variant="bordered" style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userAvatar}>
                <Text style={styles.avatarInitial}>{item.name[0]}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
              <Badge
                label={item.role.toUpperCase()}
                variant={item.role === 'admin' ? 'warning' : 'primary'}
                size="sm"
              />
            </View>

            {/* Academic Info */}
            {item.role === 'student' && (
              <View style={styles.academicRow}>
                <Ionicons name="school-outline" size={16} color={Colors.accent} />
                <Text style={styles.academicText}>
                  {item.studentType === 'high_school'
                    ? `${item.highSchoolGrade?.replace('_', ' ').toUpperCase()} • ${item.highSchoolStream?.toUpperCase()} STREAM`
                    : `${item.university || 'University'} • ${item.department || 'Undergraduate'}`}
                </Text>
              </View>
            )}

            {/* Status & Actions */}
            <View style={styles.cardFooter}>
              <View style={styles.statusWrap}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Badge
                  label={item.approvalStatus?.toUpperCase() || (item.isApproved ? 'ACTIVE' : 'PENDING')}
                  variant={
                    item.approvalStatus === 'approved' || item.isApproved
                      ? 'accent'
                      : item.approvalStatus === 'rejected'
                      ? 'danger'
                      : 'warning'
                  }
                  size="sm"
                />
              </View>

              {item.approvalStatus === 'pending' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.approveBtn}
                    onPress={() => handleApprove(item.id)}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    <Text style={styles.btnText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleReject(item.id)}
                  >
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.textPrimary,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginHorizontal: Spacing[5],
    paddingHorizontal: Spacing[4],
    borderRadius: BorderRadius.lg,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing[3],
  },
  searchIcon: {
    marginRight: Spacing[3],
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing[5],
    gap: Spacing[2],
    marginBottom: Spacing[4],
  },
  filterChip: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: `${Colors.primary}25`,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  filterChipTextActive: {
    color: Colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  listContent: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
    gap: Spacing[3],
  },
  userCard: {
    padding: Spacing[4],
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    marginBottom: Spacing[2],
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: `${Colors.primary}30`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  userEmail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  academicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: Spacing[2],
    paddingBottom: Spacing[2],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}50`,
    marginTop: Spacing[2],
  },
  academicText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.accent,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[2],
    paddingTop: Spacing[2],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}50`,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing[2],
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing[3],
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
  },
  rejectBtn: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing[3],
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
