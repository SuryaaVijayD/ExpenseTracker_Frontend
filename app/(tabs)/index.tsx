import { useAuth } from '@/context/AuthContext';
import ToastMessage from '@/utils/toast';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseGraph from '../../components/dashboard';
import RecentTranscation from "../../components/recentrans";
import "../../global.css";

export default function HomeScreen() {
  const { user, logout } = useAuth();

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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-6">
          <TouchableOpacity>
            <AntDesign name="user" size={24} color="#38BDF8" />
          </TouchableOpacity>

          <Text className="text-white text-3xl italic font-p">
            E<Text className="text-blue-400">T</Text>
          </Text>

          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="logout" size={24} color="#38BDF8" />
          </TouchableOpacity>
        </View>

        <View className="px-5 mt-10 mb-6">
          <Text className="text-[#9CA3AF] text-sm font-p">
            Hello 👋
          </Text>
          <Text className="text-white text-5xl font-p mt-1">
            {user?.username ?? 'User'}
          </Text>
        </View>

        <View className="px-5">
          <ExpenseGraph salary={String(user?.salary ?? '0')} />
        </View>

        <View className="px-5 mt-6">
          <Text className="text-blue-400 text-xl font-pbold mb-3">
            Recent Transactions
          </Text>
          <View className="bg-bg-card p-4 rounded-xl border border-gray-800">
            <RecentTranscation />
          </View>
        </View>

        <View className="mt-10 px-6 items-center">
          <Text className="text-gray-700 text-center text-xs leading-5">
            It's a developmental project. Mistakes may happen. Kindly ignore it.
          </Text>

          <TouchableOpacity className="mt-3">
            <Text className="text-blue-400 text-sm">Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
