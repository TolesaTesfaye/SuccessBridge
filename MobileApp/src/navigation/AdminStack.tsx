import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminHomeScreen } from '../screens/admin/AdminHomeScreen';
import { ManageUsersScreen } from '../screens/admin/ManageUsersScreen';
import { ManageResourcesScreen } from '../screens/admin/ManageResourcesScreen';
import { ProfileScreen } from '../screens/student/ProfileScreen';
import { NotificationsScreen } from '../screens/shared/NotificationsScreen';

export type AdminStackParamList = {
  AdminHome: undefined;
  ManageUsers: undefined;
  ManageResources: undefined;
  Profile: undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Stack.Screen name="ManageResources" component={ManageResourcesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};
