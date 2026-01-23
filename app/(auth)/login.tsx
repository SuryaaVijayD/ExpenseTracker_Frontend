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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 40,
            paddingBottom: 120, 
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <Text className="text-text-primary font-nunito text-3xl italic mb-10">
            E<Text className="text-text-secondary2 font-nunitoBold">T</Text>
          </Text>

          <View className="flex-1 justify-center">
            <Text className="text-text-primary font-nunitoBold text-6xl mb-4">
              Hey, {'\n'}
              Login <Text className="text-text-secondary2 font-nunitoBold">now</Text>
            </Text>

            <View className="flex-row items-center mb-8">
              <Text className="text-text-secondary font-nunito text-xl">
                If you are new?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-text-secondary2 font-nunito text-lg">
                  Create New
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow mb-4 text-text-primary font-nunito"
            />

            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow mb-6 text-text-primary font-nunito"
            />

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`bg-bg-secondary px-3 py-4 rounded-lg shadow ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-text-primary2 text-2xl font-nunitobold text-center">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 font-nunito text-center text-[10px] mt-10">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
