import EditSalary from '@/components/EditSalary';
import SettingsModal from '@/components/SettingsModal';
import { useAuth } from '@/context/AuthContext';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ================= TYPES ================= */
type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  highlight?: boolean;
};

/* ================= MENU ITEM COMPONENT ================= */
const MenuItem = ({ icon, label, onPress, highlight }: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className={`flex-row items-center justify-between px-5 py-6 rounded-xl mb-3 bg-bg-lightWhite border-l-2 border-bg-brand-primary ${
      highlight ? 'border border-brand-primary/20' : ''
    }`}
  >
    <View className="flex-row items-center">
      {icon}
      <Text className="text-text-primary font-nunito text-base ml-4">
        {label}
      </Text>
    </View>

    <Feather name="chevron-right" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

/* ================= DETAIL ROW COMPONENT ================= */
export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <View className="mb-5">
    <Text className="text-xs text-text-muted">{label}</Text>
    <Text className="text-base font-nunito text-text-primary mt-1">
      {value ?? '—'}
    </Text>
  </View>
);

/* ================= MAIN PROFILE SCREEN ================= */
export default function ProfileScreen() {
  // 1. Get user AND setUser from AuthContext
  const { user, logout, setUser } = useAuth(); 
  
  // Modal States
  const [openDetails, setOpenDetails] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  
  // Salary Modal State
  const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);

  // Under Development Modal State
  const [underDevModal, setUnderDevModal] = useState(false);
  const [underDevTitle, setUnderDevTitle] = useState('');

  // Helper to show "Under Development" modal
  const showUnderDevelopment = (title: string) => {
    setUnderDevTitle(title);
    setUnderDevModal(true);
  };

  // 2. Handler: Updates global state instantly after API success
  const handleSalaryUpdateSuccess = (newSalary: number) => {
    if (user && setUser) {
      // Create a new user object with the updated salary
      setUser({ ...user, salary: newSalary });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-5 mt-6">
          <Text className="text-3xl font-nunitoBold text-text-primary">
            Profile
          </Text>

          <TouchableOpacity
            onPress={() => showUnderDevelopment('Notifications')}
            className="p-3 rounded-full bg-brand-primary"
          >
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ================= PROFILE INFO ================= */}
        <View className="items-center mt-16 mb-10">
          <View className="h-28 w-28 rounded-full bg-bg-surface items-center justify-center shadow-sm">
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              className="h-28 w-28 rounded-full"
            />
          </View>

          <Text className="mt-8 text-4xl font-nunitoBold text-text-primary capitalize">
            {user?.username ?? 'User'}
          </Text>

          <Text className="text-sm text-text-muted mt-1">
            {user?.email ?? 'No data available'}
          </Text>
        </View>

        {/* ================= MENU ================= */}
        <View className="px-4">
          <MenuItem
            icon={<Ionicons name="person-outline" size={22} color="#4B5563" />}
            label="Personal Details"
            onPress={() => setOpenDetails(true)}
          />

          {/* NEW UPDATE SALARY TAB */}
          <MenuItem
            icon={<MaterialIcons name="attach-money" size={22} color="#4B5563" />}
            label="Update Salary"
            onPress={() => setIsSalaryModalVisible(true)}
          />

          <MenuItem
            icon={<Feather name="bar-chart-2" size={22} color="#4B5563" />}
            label="Reports"
            onPress={() => showUnderDevelopment('Reports')}
          />

          <MenuItem
            icon={<Feather name="settings" size={22} color="#4B5563" />}
            label="Settings"
            onPress={() => setOpenSettings(true)}
          />

          <MenuItem
            icon={<Feather name="help-circle" size={22} color="#4B5563" />}
            label="Help"
            onPress={() => setOpenHelp(true)}
          />

          <MenuItem
            icon={<MaterialIcons name="privacy-tip" size={22} color="#4B5563" />}
            label="Privacy & Policy"
            highlight
            onPress={() => setOpenPrivacy(true)}
          />

          <MenuItem
            icon={<Feather name="log-out" size={22} color="#4B5563" />}
            label="Log out"
            onPress={logout}
          />
        </View>
      </ScrollView>

      {/* ================= EDIT SALARY MODAL ================= */}
      {/* 3. Pass handleSalaryUpdateSuccess to the modal */}
      {user && (
        <EditSalary 
          visible={isSalaryModalVisible}
          currentSalary={user.salary}
          onClose={() => setIsSalaryModalVisible(false)}
          onUpdateSuccess={handleSalaryUpdateSuccess} 
        />
      )}

      {/* ================= PERSONAL DETAILS MODAL ================= */}
      <Modal visible={openDetails} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-bg-main rounded-t-3xl px-6 py-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-nunitoBold text-text-primary">
                Personal Details
              </Text>
              <TouchableOpacity onPress={() => setOpenDetails(false)}>
                <Ionicons name="close" size={26} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <DetailRow label="Username" value={user?.username} />
            <DetailRow label="Email" value={user?.email} />
            <DetailRow label="Phone" value={user?.phoneNumber} />
            
            {/* 4. Display salary directly from global state */}
            <DetailRow label="Salary" value={`₹${user?.salary}`} />
          </View>
        </View>
      </Modal>

      {/* ================= SETTINGS MODAL ================= */}
      <SettingsModal
        visible={openSettings}
        onClose={() => setOpenSettings(false)}
      />

      {/* ================= HELP MODAL ================= */}
      <Modal visible={openHelp} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-bg-main rounded-t-3xl px-6 py-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-nunitoBold text-text-primary">
                Help & Contact
              </Text>
              <TouchableOpacity onPress={() => setOpenHelp(false)}>
                <Ionicons name="close" size={26} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <DetailRow label="Contact Email" value="suryaa.profesion@gmail.com" />
            <DetailRow label="Phone Number" value="+91 6380596461" />
            <DetailRow label="Working Hours" value="Mon-Fri, 10am-6pm" />
            <DetailRow label="Notes" value="You can reach out anytime for assistance." />
          </View>
        </View>
      </Modal>

      {/* ================= PRIVACY MODAL ================= */}
      <Modal visible={openPrivacy} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-bg-main rounded-t-3xl px-6 py-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-nunitoBold text-text-primary">
                Privacy & Policy
              </Text>
              <TouchableOpacity onPress={() => setOpenPrivacy(false)}>
                <Ionicons name="close" size={26} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-text-primary text-sm mb-4">
                We respect your privacy and are committed to protecting your personal information. 
                All the data you provide is securely stored and will not be shared with third parties 
                without your consent. We may collect basic usage statistics to improve app functionality. 
                By using this app, you agree to our privacy and policy terms.
              </Text>
              <Text className="text-text-primary text-sm">
                For more details, contact support anytime. Your trust and security are our top priorities.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= UNDER DEVELOPMENT MODAL ================= */}
      <Modal visible={underDevModal} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-bg-main rounded-t-3xl px-6 py-6 max-h-[40%] items-center justify-center">
            <Text className="text-xl font-nunitoBold text-text-primary mb-4">
              🚧 {underDevTitle}
            </Text>
            <Text className="text-text-primary text-center">
              This feature is under development. Stay tuned for updates!
            </Text>
            <TouchableOpacity
              onPress={() => setUnderDevModal(false)}
              className="mt-6 bg-brand-primary px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-nunitoBold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}