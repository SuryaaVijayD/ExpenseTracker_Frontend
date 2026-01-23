// components/AddTransactionModal.tsx
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

export default function AddTransactionModal({
  visible,
  onClose,
  onSave,
}: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount || !category) return;

    onSave({
      amount: Number(amount),
      category: category.trim(),
      description: description.trim(),
    });

    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Overlay */}
      <View className="flex-1 bg-black/30 justify-center items-center px-4">
        {/* Card */}
        <View className="w-full max-w-md bg-bg-main rounded-2xl px-5 py-6">
          {/* Title */}
          <Text className="text-4xl font-nunitoBold text-text-primary mb-8">
            Add Transaction
          </Text>

          {/* Amount */}
          <TextInput
            placeholder="Amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className="bg-bg-lightWhite text-text-primary px-4 py-5 rounded-xl mb-3"
          />

          {/* Category */}
          <TextInput
            placeholder="Category (e.g. Food)"
            placeholderTextColor="#9CA3AF"
            value={category}
            onChangeText={setCategory}
            className="bg-bg-lightWhite text-text-primary px-4 py-5 rounded-xl mb-3"
          />

          {/* Description */}
          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            className="bg-bg-lightWhite text-text-primary px-4 py-5 rounded-xl mb-6"
          />

          {/* Actions */}
          <View className="flex-row justify-end items-center space-x-10">
            <TouchableOpacity onPress={onClose} className='bg-bg-main px-5 py-2.5 rounded-xl shadow'>
              <Text className="text-text-muted text-sm">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className="bg-bg-secondary ml-5 px-5 py-2.5 rounded-xl shadow"
            >
              <Text className="text-white font-pbold text-sm">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
