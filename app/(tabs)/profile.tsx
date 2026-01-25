import { useAuth } from '@/context/AuthContext';
import {
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
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

/* ================= MENU ITEM ================= */
const MenuItem = ({ icon, label, onPress, highlight }: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className={`flex-row items-center justify-between px-5 py-6 rounded-xl mb-3 bg-bg-lightWhite ${
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

/* ================= DETAIL ROW ================= */
const DetailRow = ({
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

/* ================= SCREEN ================= */
export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-5 mt-6">
          <Text className="text-3xl font-nunitoBold text-text-primary">
            Profile
          </Text>

          <TouchableOpacity className="p-3 rounded-full bg-brand-primary">
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#FFFFFF"
            />
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

          <Text
            className="text-sm text-text-muted mt-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
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

          <MenuItem
            icon={<Feather name="bar-chart-2" size={22} color="#4B5563" />}
            label="Reports"
          />

          <MenuItem
            icon={<Feather name="settings" size={22} color="#4B5563" />}
            label="Settings"
          />

          <MenuItem
            icon={<Feather name="help-circle" size={22} color="#4B5563" />}
            label="Help"
          />

          <MenuItem
            icon={
              <MaterialIcons
                name="privacy-tip"
                size={22}
                color="#4B5563"
              />
            }
            label="Privacy & Policy"
            highlight
          />

          <MenuItem
            icon={<Feather name="log-out" size={22} color="#EF4444" />}
            label="Log out"
            onPress={logout}
          />
        </View>
      </ScrollView>

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
            <DetailRow label="Salary" value={`₹${user?.salary}`} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
