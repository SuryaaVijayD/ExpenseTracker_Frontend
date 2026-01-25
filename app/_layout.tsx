import { AuthProvider, useAuth } from '@/context/AuthContext';
import ToastMessage from '@/utils/toast';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [appReady, setAppReady] = useState(false);

  // Wait until fonts are loaded before showing app
  useEffect(() => {
    if (fontsLoaded) {
      // Keep splash visible for at least 2 seconds
      const timer = setTimeout(() => setAppReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.name}>Developed By Suryaa D</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthGate />
        <Toast config={ToastMessage.config} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AuthGate() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/(auth)/login');
    }

    if (token && inAuthGroup) {
      router.replace('/(tabs)');
    }

    // Add a small delay to hide splash after auth is ready
    const timer = setTimeout(() => SplashScreen.hideAsync(), 500);
    return () => clearTimeout(timer);
  }, [token, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

// Styles for splash
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  name: {
    position: 'absolute',
    fontFamily: 'Nunito_600SemiBold',
    bottom: height * 0.1,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
