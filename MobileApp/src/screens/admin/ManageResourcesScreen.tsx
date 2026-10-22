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
import { Resource } from '../../types';

export const ManageResourcesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'pdf' | 'video' | 'exam'>('all');

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'res-1',
      title: 'Grade 12 Mathematics: Calculus & Limits',
      description: 'Comprehensive curriculum reference module with worked examples.',
      fileType: 'pdf',
      subject: { id: 'sub-1', name: 'Mathematics' },
      isLocked: false,
      createdAt: '2026-10-15',
    },
    {
      id: 'res-2',
      title: 'Grade 12 Physics: Electromagnetism & Optics',
      description: 'Full lecture presentation with practice problems.',
      fileType: 'pdf',
      subject: { id: 'sub-2', name: 'Physics' },
      isLocked: false,
      createdAt: '2026-10-12',
    },
    {
      id: 'res-3',
      title: 'University Freshman: Emerging Technologies Guide',
      description: 'AI, IoT, Blockchain fundamentals for engineering & science students.',
      fileType: 'pdf',
      subject: { id: 'sub-3', name: 'Emerging Tech' },
      isLocked: true,
      createdAt: '2026-10-10',
    },
    {
      id: 'res-4',
      title: 'National Exam Model Paper & Solutions 2026',
      description: 'Authentic previous year national examination paper with detailed step solutions.',
      fileType: 'exam',
      subject: { id: 'sub-4', name: 'Exam Prep' },
      isLocked: true,
      createdAt: '2026-10-08',
    },
    {
      id: 'res-5',
      title: 'Organic Chemistry Reactions Masterclass',
      description: 'Video walkthrough breaking down complex aliphatic and aromatic mechanisms.',
      fileType: 'video',
      subject: { id: 'sub-5', name: 'Chemistry' },
      isLocked: false,
      createdAt: '2026-10-05',
    },
  ]);

  const toggleLock = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isLocked: !r.isLocked } : r))
    );
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Resource',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setResources((prev) => prev.filter((r) => r.id !== id));
          },
        },
      ]
    );
  };

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject?.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || r.fileType === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type?: string) => {
    switch (type) {
      case 'video':
        return { name: 'play-circle' as const, color: Colors.warning };
      case 'exam':
        return { name: 'ribbon' as const, color: Colors.accent };
      default:
        return { name: 'document-text' as const, color: Colors.primary };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Curriculum Resources</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => Alert.alert('Upload Resource', 'File upload modal will open.')}
        >
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder="Search by topic or subject..."
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

      {/* Type Filters */}
      <View style={styles.filterRow}>
        {(['all', 'pdf', 'video', 'exam'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.filterChip, typeFilter === t && styles.filterChipActive]}
            onPress={() => setTypeFilter(t)}
          >
            <Text
              style={[
                styles.filterChipText,
                typeFilter === t && styles.filterChipTextActive,
              ]}
            >
              {t === 'all'
                ? 'All'
                : t === 'pdf'
                ? 'PDFs'
                : t === 'video'
                ? 'Videos'
                : 'Exams'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resource List */}
      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const fileIcon = getFileIcon(item.fileType);
          return (
            <Card variant="bordered" style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.iconWrap, { backgroundColor: `${fileIcon.color}15` }]}>
                  <Ionicons name={fileIcon.name} size={24} color={fileIcon.color} />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.resourceTitle}>{item.title}</Text>
                  <Text style={styles.resourceSubject}>{item.subject?.name || 'General'}</Text>
                </View>
              </View>

              {item.description && (
                <Text style={styles.resourceDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              )}

              <View style={styles.cardFooter}>
                <View style={styles.metaRow}>
                  <Badge
                    label={item.fileType?.toUpperCase() || 'FILE'}
                    variant="outline"
                    size="sm"
                  />
                  <Badge
                    label={item.isLocked ? 'PREMIUM ONLY' : 'FREE ACCESS'}
                    variant={item.isLocked ? 'warning' : 'accent'}
                    size="sm"
                  />
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.iconAction}
                    onPress={() => toggleLock(item.id)}
                  >
                    <Ionicons
                      name={item.isLocked ? 'lock-closed' : 'lock-open'}
                      size={18}
                      color={item.isLocked ? Colors.warning : Colors.accent}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconAction}
                    onPress={() => handleDelete(item.id, item.title)}
                  >
                    <Ionicons name="trash-outline" size={18} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          );
        }}
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    padding: Spacing[4],
  },
  cardTop: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginBottom: Spacing[2],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  resourceSubject: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  resourceDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing[3],
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing[2],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}40`,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  iconAction: {
    padding: Spacing[1],
  },
});
