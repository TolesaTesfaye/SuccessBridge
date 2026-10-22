import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { notificationsApi } from '../../api/notifications';
import { Notification } from '../../types';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { useNotificationStore } from '../../store/notificationStore';

export const NotificationsScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const {
    data: notifications = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const data = await notificationsApi.getAll();
        return data || [];
      } catch (err) {
        // Fallback demo notifications for offline / fresh server
        return [
          {
            id: '1',
            title: 'Welcome to SuccessBridge Mobile!',
            message: 'Explore video lectures, curriculum notes, quizzes, and ask questions to the AI companion.',
            isRead: false,
            type: 'system',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Mathematics Quiz Ready',
            message: 'National exam practice quiz on Calculus is now active for Grade 12 students.',
            isRead: false,
            type: 'quiz',
            createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          },
          {
            id: '3',
            title: 'Weekly Study Reminder',
            message: 'Consistency is key to scoring top marks in the university entrance examination.',
            isRead: true,
            type: 'reminder',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ];
      }
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      setUnreadCount(0);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type?: string) => {
    switch (type) {
      case 'quiz':
        return { name: 'flash' as const, color: Colors.warning };
      case 'system':
        return { name: 'sparkles' as const, color: Colors.primary };
      case 'payment':
        return { name: 'card' as const, color: Colors.accent };
      default:
        return { name: 'notifications' as const, color: Colors.textMuted };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'You are all caught up!'}
          </Text>
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllBtn}
            onPress={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
          >
            <Ionicons name="checkmark-done" size={16} color={Colors.accent} />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, filter === 'all' && styles.activeTab]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.tabText, filter === 'all' && styles.activeTabText]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filter === 'unread' && styles.activeTab]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.tabText, filter === 'unread' && styles.activeTabText]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingSpinner message="Loading notifications..." />
      ) : filteredNotifications.length === 0 ? (
        <EmptyState
          icon="notifications-off-outline"
          title={filter === 'unread' ? 'No unread notifications' : 'No notifications'}
          message={
            filter === 'unread'
              ? 'Great job staying on top of your notifications!'
              : 'You will receive updates about quizzes, resources, and announcements here.'
          }
        />
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                refetch();
              }}
              tintColor={Colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const iconInfo = getIcon(item.type);
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (!item.isRead) markReadMutation.mutate(item.id);
                }}
              >
                <Card
                  variant={item.isRead ? 'default' : 'bordered'}
                  style={[styles.card, !item.isRead && styles.unreadCard]}
                >
                  <View style={styles.notificationRow}>
                    <View style={[styles.iconWrap, { backgroundColor: `${iconInfo.color}18` }]}>
                      <Ionicons name={iconInfo.name} size={22} color={iconInfo.color} />
                    </View>
                    <View style={styles.contentWrap}>
                      <View style={styles.titleRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {!item.isRead && <View style={styles.unreadDot} />}
                      </View>
                      <Text style={styles.itemMessage}>{item.message}</Text>
                      <Text style={styles.itemTime}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }) : 'Recent'}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    backgroundColor: `${Colors.accent}15`,
    borderRadius: BorderRadius.md,
  },
  markAllText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.accent,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[4],
    gap: Spacing[3],
  },
  tab: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: `${Colors.primary}25`,
    borderColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textMuted,
  },
  activeTabText: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
    gap: Spacing[3],
  },
  card: {
    padding: Spacing[4],
  },
  unreadCard: {
    borderColor: `${Colors.primary}50`,
    backgroundColor: '#1E1B38',
  },
  notificationRow: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginLeft: 6,
  },
  itemMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  itemTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
});
