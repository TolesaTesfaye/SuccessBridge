import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { AuthStack } from './AuthStack';
import { StudentTabs } from './StudentTabs';
import { AdminStack } from './AdminStack';
import { Colors } from '../theme';

export type RootStackParamList = {
  Auth: undefined;
  StudentApp: undefined;
  AdminApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.primary,
    background: Colors.bgDark,
    card: Colors.bgCard,
    text: Colors.textPrimary,
    border: Colors.border,
    notification: Colors.error,
  },
};

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : user?.role === 'student' ? (
          <Stack.Screen name="StudentApp" component={StudentTabs} />
        ) : (
          <Stack.Screen name="AdminApp" component={AdminStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
