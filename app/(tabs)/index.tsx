import { useAuth } from '@/context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseGraph from '../../components/dashboard';
import RecentTranscation from "../../components/recentrans";
import "../../global.css";

export default function HomeScreen() {

  const user = "Suryaa";

  const { logout } = useAuth();

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const res = await api.get('/user/me');
  //       console.log(res.data);
  //     } catch (error) {
  //       console.error("Failed to fetch user details:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-950'>
      <ScrollView className='flex-1 py-8 px-5 pb-20'> 
        
        <View className='flex-row justify-between w-full items-center'>
          <TouchableOpacity>
            <AntDesign name="user" size={25} color="gray" className=''/>
          </TouchableOpacity>
          <Text className='text-white font-p text-4xl italic'>E<Text className='text-blue-400 font-p'>T</Text></Text>
          <TouchableOpacity className='mr-4' onPress={handleLogout}>
            <AntDesign name="logout" size={25} color="gray" className=''/>
          </TouchableOpacity>
        </View>

        <View className='py-8'>
          <Text className='text-[#EEEEEE]'>Hello, <Text>{'\n'}</Text><Text className='text-3xl font-p'>{user}</Text></Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          
            <ExpenseGraph />

            <Text className='text-white text-lg font-bold mt-4 mb-2'>Recent Transactions</Text>
            <View className='bg-[#111311] p-4 rounded-xl border border-gray-800'>
                <RecentTranscation />
            </View>

          </ScrollView>
        </View>

        <View className='flex-row justify-center items-center align-middle'>
          <Text className='text-gray-700 text-center'>It's an developmental Project. Mistakes may happen. Kindly ignore it</Text>
        </View>

        <TouchableOpacity >
          <Text className='text-blue-400 text-center mt-2' >Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}