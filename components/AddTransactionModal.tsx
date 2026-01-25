import ToastMessage from '@/utils/toast';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    amount: number;
    category: string;
    description: string;
  }) => void;
};

export default function AddTransactionModal({ visible, onClose, onSave }: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({
    amount: false,
    category: false,
    description: false,
  });

  const handleSave = () => {
    const newErrors = {
      amount: !amount,
      category: !category,
      description: !description,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      ToastMessage.info('Attention Required', 'Please fill in all fields');
      return;
    }

    onSave({
      amount: Number(amount),
      category,
      description,
    });

    setAmount('');
    setCategory('');
    setDescription('');
    setErrors({ amount: false, category: false, description: false });
    onClose();
  };

  const inputStyle = (hasError: boolean) =>
    `rounded-xl px-4 py-4 mb-3 text-text-primary ${
      hasError ? 'border border-red-500 bg-bg-lightWhite' : 'bg-bg-lightWhite'
    }`;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center px-4">
        <View className="bg-bg-main rounded-2xl px-6 py-6">
          <Text className="text-2xl font-nunitoBold text-text-primary mb-6">
            Add Expense
          </Text>

          {/* Amount */}
          <TextInput
            placeholder="Amount"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className={inputStyle(errors.amount)}
          />

          {/* Category */}
          <TextInput
            placeholder="Category"
            placeholderTextColor="#A0A0A0"
            value={category}
            onChangeText={setCategory}
            className={inputStyle(errors.category)}
          />

          {/* Description */}
          <TextInput
            placeholder="Description"
            placeholderTextColor="#A0A0A0"
            value={description}
            onChangeText={setDescription}
            className={inputStyle(errors.description)}
          />

          {/* Buttons */}
          <View className="flex-row justify-end space-x-4 mt-4">
            {/* Cancel */}
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 justify-center items-center"
            >
              <Text className="text-text-muted font-nunitoBold">Cancel</Text>
            </TouchableOpacity>

            {/* Save */}
            <TouchableOpacity
              onPress={handleSave}
              className="bg-brand-primary px-6 py-3 ml-3 rounded-xl justify-center items-center"
            >
              <Text className="text-white font-nunitoBold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
