import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { useAuthStore } from './src/store/authStore';
import { Colors } from './src/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { initialize, isLoading: authLoading } = useAuthStore();
  const [showApp, setShowApp] = useState(false);

  // Refs so callbacks always read latest value (no stale closures)
  const appReadyRef   = useRef(false);
  const splashDoneRef = useRef(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // When readiness changes, check if we can reveal the app
  useEffect(() => {
    const ready = fontsLoaded && !authLoading;
    appReadyRef.current = ready;
    if (ready && splashDoneRef.current) {
      setShowApp(true);
    }
  }, [fontsLoaded, authLoading]);

  const handleSplashFinish = () => {
    splashDoneRef.current = true;
    if (appReadyRef.current) {
      setShowApp(true);
    }
    // If not ready yet, the useEffect above will call setShowApp when ready
  };

  if (!showApp) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <RootNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
});
