import { fetchTotalExpenseByMonth } from '@/api/expenseApi';
import { useAuth } from '@/context/AuthContext';
import ToastMessage from '@/utils/toast';
import { FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseGraph from '../../components/dashboard';
import RecentTranscation from '../../components/recentrans';
import '../../global.css';

export default function HomeScreen() {
  const { user, token, logout } = useAuth();
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    if (!token) return;

    const today = new Date();
    fetchTotalExpenseByMonth(token, today.getMonth(), today.getFullYear())
      .then(setTotalExpense)
      .catch(console.error);
  }, [token]);

  const remainingAmount = user ? user.salary - totalExpense : 0;

  const handleLogout = async () => {
    try {
      await logout();
      ToastMessage.success('Logged out', 'You have been logged out successfully');
    } catch {
      ToastMessage.error('Logout failed', 'Unable to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-5 mt-4 h-20">
          <View className="flex-row items-center">
            <TouchableOpacity className="h-12 w-12 rounded-full bg-brand-primary items-center justify-center">
              <FontAwesome name="user-o" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="ml-4">
              <Text className="text-text-primary text-xl font-nunitoBold capitalize">
                {user?.username ?? 'User'}
              </Text>
              <Text className="font-nunito text-text-muted text-xs">
                Welcome back
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity className="h-11 w-11 mr-3 rounded-full bg-brand-primaryMedium items-center justify-center">
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              className="h-11 w-11 rounded-full bg-brand-primaryMedium items-center justify-center"
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= BALANCE ================= */}
        <View className="mt-6 px-5">
          <View className="rounded-2xl py-7 px-5 items-center">
            <Text className="text-text-secondary text-xs uppercase tracking-wide">
              Remaining Balance
            </Text>

            <Text className="font-nunitoBold text-brand-primary text-5xl mt-2">
              ₹{remainingAmount.toFixed(2)}
            </Text>

            <View className="mt-3">
              <FontAwesome6 name="coins" size={18} color="#111827" />
            </View>
          </View>
        </View>

        {/* ================= GRAPH ================= */}
        <View className="px-5 mt-10">
          <ExpenseGraph salary={String(remainingAmount)} />
        </View>

        {/* ================= RECENT ================= */}
        <View className="px-5 mt-8">
          <Text className="text-text-primary text-3xl font-nunitoBold mb-5">
            Recent Transactions
          </Text>

          <View className="bg-bg-lightWhite p-4 rounded-2xl">
            <RecentTranscation />
          </View>
        </View>

        {/* ================= FOOTER ================= */}
        <View className="mt-12 px-6 items-center">
          <Text className="text-text-muted text-xs text-center leading-5">
            This is a developmental project. Minor issues may occur.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
