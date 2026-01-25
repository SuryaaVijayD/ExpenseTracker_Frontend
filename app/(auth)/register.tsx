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
        ToastMessage.success('Account created', 'You can login now');
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
          <Text className="text-brand-primary font-nunito italic text-3xl mb-12">
            E<Text className="font-nunitobold">T</Text>
          </Text>

          <View className="flex-1 justify-center">
            <Text className="text-text-primary font-nunitobold text-6xl mb-4">
              Create{'\n'}
              Account
            </Text>

            <View className="flex-row items-center mb-8">
              <Text className="text-text-secondary text-lg">
                Already registered?
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-brand-primary text-lg ml-2 font-nunitobold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* INPUTS */}
            {[
              { placeholder: 'Username', value: username, setter: setUsername },
              { placeholder: 'Email', value: email, setter: setEmail },
              { placeholder: 'Phone', value: phone, setter: setPhone },
              { placeholder: 'Monthly Salary', value: salary, setter: setSalary },
              { placeholder: 'Password', value: password, setter: setPassword, secure: true },
            ].map((field, i) => (
              <TextInput
                key={i}
                placeholder={field.placeholder}
                placeholderTextColor="#9CA3AF"
                value={field.value}
                secureTextEntry={field.secure}
                onChangeText={field.setter}
                className="bg-white px-4 py-5 rounded-xl text-lg text-text-primary shadow mb-4"
              />
            ))}

            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`bg-brand-primary py-4 rounded-xl shadow mt-4 ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-xl font-nunitobold">
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
