import ToastMessage from '@/utils/toast';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { updateSalary } from '../api/user';

interface Props {
  visible: boolean;
  onClose: () => void;
  currentSalary: number;
  onUpdateSuccess: (newSalary: number) => void;
}

const EditSalary = ({ visible, onClose, currentSalary, onUpdateSuccess }: Props) => {
  const [newSalary, setNewSalary] = useState(currentSalary ? currentSalary.toString() : '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const salaryNum = parseFloat(newSalary);
    
    if (isNaN(salaryNum) || salaryNum <= 0) {
      ToastMessage.info("Please enter a valid salary.");
      return;
    }

    setLoading(true);
    try {
      await updateSalary(salaryNum);      
      onUpdateSuccess(salaryNum);
      ToastMessage.success("Salary updated successfully.");
      onClose();
    } catch (error: any) {
      Alert.alert("Update Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View className="bg-white w-[85%] rounded-2xl p-6 shadow-lg">
          <Text className="text-xl font-nunitoBold text-text-primary mb-2">
            Edit Monthly Salary
          </Text>
          <Text className="text-text-secondary font-nunitoRegular mb-4">
            Enter your updated monthly income.
          </Text>

          <TextInput
            className="bg-gray-100 p-4 rounded-xl text-lg font-nunitoBold text-text-primary mb-6"
            placeholder="Amount (e.g. 50000)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={newSalary}
            onChangeText={setNewSalary}
            autoFocus
          />

          <View className="flex-row justify-end space-x-4">
            <TouchableOpacity 
              onPress={onClose}
              className="px-4 py-2"
            >
              <Text className="text-gray-500 font-nunitoBold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleUpdate}
              disabled={loading}
              className="bg-blue-600 px-6 py-2 rounded-lg items-center justify-center min-w-[100px]"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-nunitoBold">Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditSalary;