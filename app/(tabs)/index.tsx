import { useAuth } from '@/context/AuthContext';
import ToastMessage from '@/utils/toast';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseGraph from '../../components/dashboard';
import RecentTranscation from '../../components/recentrans';
import '../../global.css';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      ToastMessage.success(
        'Logged out',
        'You have been logged out successfully'
      );
    } catch {
      ToastMessage.error(
        'Logout failed',
        'Unable to logout. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-5 mt-5 pb-2">
          <View className="flex-row items-center">
            <TouchableOpacity className="py-4 px-5 rounded-full bg-bg-secondary shadow-lg">
              <FontAwesome name="user-o" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="ml-4">
              <Text className="text-text-primary text-2xl font-nunitoBold">
                {user?.username ?? 'User'}
              </Text>
              <TouchableOpacity>
                <Text className="font-nunito text-text-muted text-xs mt-1">
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="p-4 rounded-full bg-bg-secondary shadow-lg"
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ================= TOTAL BALANCE ================= */}
        <View className="mt-8 px-5">
          <View className=" rounded-2xl py-6 px-4 items-center">
            <Text className="font-nunito text-text-secondary text-[11px] uppercase">
              Total Balance
            </Text>

            <Text className="font-nunitoBold text-text-primary text-5xl mt-2">
              {user?.salary ? `₹${user.salary}` : '₹0'}
            </Text>
          </View>
        </View>

        {/* ================= GRAPH ================= */}
        <View className="px-5 mt-10">
          <ExpenseGraph salary={String(user?.salary ?? '0')} />
        </View>

        {/* ================= RECENT TRANSACTIONS ================= */}
        <View className="px-5 mt-8">
          <Text className="text-text-primary text-3xl font-nunitoBold mb-6">
            Recent Transactions
          </Text>

          <View className="bg-bg-secondary p-4 rounded-2xl">
            <RecentTranscation />
          </View>
        </View>

        {/* ================= FOOTER ================= */}
        <View className="mt-12 px-6 items-center">
          <Text className="text-text-muted text-center text-xs leading-5">
            It's a developmental project. Mistakes may happen. Kindly ignore it.
          </Text>

          <TouchableOpacity className="mt-3">
            <Text className="text-accent text-sm font-nunito">
              Contact
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
