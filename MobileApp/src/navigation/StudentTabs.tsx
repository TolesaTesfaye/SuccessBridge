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
  LearningCenterTab: undefined;
  ResourceHubTab: undefined;
  InfoTab: undefined;
  MenuTab: undefined;
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
        tabBarInactiveTintColor: '#8E9AAF',
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
        name="LearningCenterTab"
        component={ResourcesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} size={size} label="Learning" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ResourceHubTab"
        component={QuizzesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'ticket' : 'ticket-outline'} color={color} size={size} label="Resources" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="InfoTab"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={size} label="Info" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'menu' : 'menu-outline'} color={color} size={size} label="Menu" focused={focused} />
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
    backgroundColor: '#1A1D2E',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    minWidth: 50,
    position: 'relative',
  },
  tabIconActive: {
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
  },
  tabLabel: {
    fontSize: 9,
    fontFamily: 'Inter_500Medium',
    marginTop: 3,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9.5,
  },
  tabGlowDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#00D4AA',
    position: 'absolute',
    bottom: -2,
  },
});
