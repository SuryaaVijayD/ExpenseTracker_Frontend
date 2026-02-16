import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DetailRow from './DetailRow';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-bg-main rounded-t-3xl px-6 py-6 max-h-[80%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-nunitoBold text-text-primary">
              Settings
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={26} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <DetailRow label="Theme" value="Light" />
            <DetailRow label="Notifications" value="Disabled" />
            <DetailRow label="Language" value="English" />
            <DetailRow label="Security" value="SHA-256" />
            <DetailRow label="App Version" value="v1.0.1" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
