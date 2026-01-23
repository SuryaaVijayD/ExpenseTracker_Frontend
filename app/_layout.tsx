import { AuthProvider, useAuth } from '@/context/AuthContext';
import ToastMessage from '@/utils/toast';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
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

  if (!fontsLoaded) {
    return null;
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

    SplashScreen.hideAsync();
  }, [token, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}


// import { AuthProvider, useAuth } from '@/context/AuthContext';
// import ToastMessage from '@/utils/toast';
// import { Stack, useRouter, useSegments } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';


// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         <AuthGate />
//         <Toast config={ToastMessage.config} />
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }

// function AuthGate() {
//   const { token, isLoading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoading) return;

//     const inAuthGroup = segments[0] === '(auth)';

//     if (!token && !inAuthGroup) {
//       router.replace('/(auth)/login');
//     }

//     if (token && inAuthGroup) {
//       router.replace('/(tabs)');
//     }

//     SplashScreen.hideAsync();
//   }, [token, isLoading, segments]);

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" />
//       <Stack.Screen name="(tabs)" />
//     </Stack>
//   );
// }
