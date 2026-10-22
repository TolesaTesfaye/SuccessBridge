import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../theme';

// Screens
import { HomeScreen } from '../screens/student/HomeScreen';
import { ResourcesScreen } from '../screens/student/ResourcesScreen';
import { ResourceViewerScreen } from '../screens/student/ResourceViewerScreen';
import { QuizzesScreen } from '../screens/student/QuizzesScreen';
import { QuizPlayScreen } from '../screens/student/QuizPlayScreen';
import { QuizResultScreen } from '../screens/student/QuizResultScreen';
import { ProgressScreen } from '../screens/student/ProgressScreen';
import { AICompanionScreen } from '../screens/student/AICompanionScreen';
import { ProfileScreen } from '../screens/student/ProfileScreen';
import { NotificationsScreen } from '../screens/shared/NotificationsScreen';
import { PaymentsScreen } from '../screens/student/PaymentsScreen';
import { useNotificationStore } from '../store/notificationStore';

export type StudentTabParamList = {
  HomeTab: undefined;
  ResourcesTab: undefined;
  QuizzesTab: undefined;
  ProgressTab: undefined;
  ProfileTab: undefined;
};

export type StudentStackParamList = {
  Tabs: undefined;
  ResourceViewer: { resourceId: string; title: string };
  QuizPlay: { quizId: string; title: string };
  QuizResult: { resultId?: string; score: number; total: number; timeTaken?: number };
  AICompanion: undefined;
  Notifications: undefined;
  Payments: undefined;
};

const Tab = createBottomTabNavigator<StudentTabParamList>();
const Stack = createNativeStackNavigator<StudentStackParamList>();

const TabIcon = ({
  name,
  color,
  size,
  label,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  label: string;
  focused: boolean;
}) => (
  <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
    <Ionicons name={name} size={focused ? size + 1 : size} color={focused ? '#00D4AA' : color} />
    <Text style={[styles.tabLabel, { color: focused ? '#00D4AA' : color }, focused && styles.tabLabelActive]}>
      {label}
    </Text>
    {focused && <View style={styles.tabGlowDot} />}
  </View>
);

const StudentTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#00D4AA',
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} size={size} label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ResourcesTab"
        component={ResourcesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'book' : 'book-outline'} color={color} size={size} label="Resources" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="QuizzesTab"
        component={QuizzesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'flash' : 'flash-outline'} color={color} size={size} label="Quizzes" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} size={size} label="Progress" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} size={size} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const StudentTabs: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={StudentTabNavigator} />
      <Stack.Screen
        name="ResourceViewer"
        component={ResourceViewerScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="QuizPlay"
        component={QuizPlayScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="AICompanion"
        component={AICompanionScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0F1322',
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
    minWidth: 58,
    position: 'relative',
  },
  tabIconActive: {
    backgroundColor: 'rgba(0, 212, 170, 0.12)',
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontFamily: 'Inter_700Bold',
  },
  tabGlowDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00D4AA',
    position: 'absolute',
    bottom: 0,
  },
});
