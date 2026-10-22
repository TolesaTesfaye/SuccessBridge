import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { resourcesApi } from '../../api/resources';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Resource } from '../../types';

type Nav = NativeStackNavigationProp<StudentStackParamList>;

const FILE_TYPE_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  pdf: 'document-text-outline',
  video: 'play-circle-outline',
  notes: 'create-outline',
  exam: 'school-outline',
  default: 'folder-outline',
};

const ResourceItem: React.FC<{ item: Resource; onPress: () => void }> = ({ item, onPress }) => {
  const icon = FILE_TYPE_ICON[item.fileType?.toLowerCase() || 'default'] || FILE_TYPE_ICON.default;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant="bordered" style={styles.resourceCard}>
        <View style={styles.resourceLeft}>
          <View style={[styles.iconContainer, item.isLocked && styles.lockedIcon]}>
            <Ionicons name={item.isLocked ? 'lock-closed-outline' : icon} size={22} color={item.isLocked ? Colors.warning : Colors.primary} />
          </View>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle} numberOfLines={2}>{item.title}</Text>
            {item.subject && <Text style={styles.resourceSubject}>{item.subject.name}</Text>}
            <View style={styles.resourceMeta}>
              {item.fileType && <Badge label={item.fileType.toUpperCase()} variant={item.isLocked ? 'warning' : 'primary'} />}
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward-outline" size={18} color={Colors.textMuted} />
      </Card>
    </TouchableOpacity>
  );
};

const FILTERS = ['All', 'PDF', 'Video', 'Notes', 'Exam'];

export const ResourcesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['resources', search, selectedFilter],
    queryFn: () => resourcesApi.getAll({
      search: search || undefined,
      type: selectedFilter === 'All' ? undefined : selectedFilter.toLowerCase(),
    }),
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Resources</Text>
        <Text style={styles.headerSubtitle}>Browse and download materials</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setSelectedFilter(f)}
            style={[styles.filterChip, selectedFilter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, selectedFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {isLoading ? (
        <LoadingSpinner fullScreen message="Loading resources..." />
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ResourceItem
              item={item}
              onPress={() => navigation.navigate('ResourceViewer', { resourceId: item.id, title: item.title })}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="folder-open-outline"
              title="No resources found"
              description="Try a different search or filter"
            />
          }
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingTop: 56, paddingHorizontal: Spacing[5], paddingBottom: Spacing[4] },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 26, color: Colors.textPrimary },
  headerSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing[5], marginBottom: Spacing[3],
    paddingHorizontal: Spacing[4], height: 48,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon: { marginRight: Spacing[2] },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textPrimary },
  filtersRow: { flexDirection: 'row', paddingHorizontal: Spacing[5], gap: Spacing[2], marginBottom: Spacing[4] },
  filterChip: {
    paddingHorizontal: Spacing[4], paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full, backgroundColor: Colors.bgCard,
    borderWidth: 1, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontFamily: 'Inter_500Medium', fontSize: 13, color: Colors.textSecondary },
  filterTextActive: { color: Colors.white },
  listContent: { paddingHorizontal: Spacing[5], gap: Spacing[2], paddingBottom: 100 },
  resourceCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing[4] },
  resourceLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], flex: 1 },
  iconContainer: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: `${Colors.primary}18`, alignItems: 'center', justifyContent: 'center',
  },
  lockedIcon: { backgroundColor: `${Colors.warning}18` },
  resourceInfo: { flex: 1, gap: 2 },
  resourceTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: Colors.textPrimary, lineHeight: 20 },
  resourceSubject: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted },
  resourceMeta: { flexDirection: 'row', gap: Spacing[2], marginTop: 4 },
});
