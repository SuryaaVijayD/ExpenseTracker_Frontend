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
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../api/Auth';

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !phone || !salary || !password) {
      ToastMessage.info('Missing Fields', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        username,
        email,
        phone,
        salary,
        password,
      });

      if (response.success) {
        ToastMessage.success('Registration successful', 'Welcome back 👋');
        setTimeout(() => {
          console.log();
        }, 2000);

        router.back();
      }
    } catch (error: any) {
      ToastMessage.error('Registration failed', error.message || 'Something went wrong');
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
            E<Text className="text-text-secondary2 font-nunitobold">T</Text>
          </Text>


          <View className="flex-1 justify-center">
            <Text className="text-text-primary font-nunitobold text-6xl mb-2">
              Create {'\n'}
              Account <Text className="text-text-secondary2">now</Text>
            </Text>

            <View className="flex-row items-center mb-6">
              <Text className="text-text-secondary text-lg">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-text-secondary2 text-lg">Login</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#6B7280"
              value={username}
              onChangeText={setUsername}
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow-lg mb-4 text-white font-nunito"
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow-lg mb-4 text-white font-nunito"
            />

            <TextInput
              placeholder="Phone"
              placeholderTextColor="#6B7280"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow-lg mb-4 text-white font-nunito"
            />

            <TextInput
              placeholder="Salary"
              placeholderTextColor="#6B7280"
              value={salary}
              onChangeText={setSalary}
              keyboardType="numeric"
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow-lg mb-4 text-white font-nunito"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="w-full px-3 py-6 text-xl rounded-lg bg-bg-lightWhite shadow-lg mb-10 text-white font-nunito"
            />

            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`bg-bg-secondary rounded-lg px-3 py-4 shadow ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center py-1 text-xl font-nunitobold">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
