import ToastMessage from '@/utils/toast';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../api/Auth';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      ToastMessage.info('Attention Required', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username, password });

      if (response.success && response.token) {
        await login(response.token);
        ToastMessage.success('Login successful', 'Welcome back 👋');
      } else {
        ToastMessage.error('Login failed', 'Token not received');
      }
    } catch (error: any) {
      ToastMessage.error('Login failed', error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO */}
          <Text className="text-brand-primary font-nunito italic text-3xl mb-12">
            E<Text className="font-nunitobold">T</Text>
          </Text>

          <View className="flex-1 justify-center">
            <Text className="text-text-primary font-nunitobold text-6xl mb-4">
              Hey, ✨ {'\n'}
              Login Now
            </Text>

            <View className="flex-row items-center mb-8">
              <Text className="text-text-secondary text-lg">
                Newbie? 
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-brand-primary text-lg ml-2 font-nunitobold">
                  Signup here
                </Text>
              </TouchableOpacity>
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
              className="bg-white px-4 py-5 rounded-xl text-lg text-text-primary shadow mb-4"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="bg-white px-4 py-5 rounded-xl text-lg text-text-primary shadow mb-6"
            />

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`bg-brand-primary py-4 rounded-xl shadow ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-xl font-nunitobold">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 text-[11px] text-center mt-10">
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
