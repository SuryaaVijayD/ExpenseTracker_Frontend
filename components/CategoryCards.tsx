import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export type Category = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

type Props = {
  categories: Category[];
  onDelete: (id: string) => void;
  onUpdateAmount: (id: string, amount: number) => void;
};

const screenWidth = Dimensions.get('window').width;
const GAP = 12;
const CARD_WIDTH = (screenWidth - 40 - GAP) / 2;

export default function CategoryCards({
  categories,
  onDelete,
  onUpdateAmount,
}: Props) {
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [amount, setAmount] = useState('');

  const openEdit = (cat: Category) => {
    setSelected(cat);
    setAmount(cat.amount.toString());
    setEditModal(true);
  };

  const saveAmount = () => {
    if (!selected || !amount) return;
    onUpdateAmount(selected.id, Number(amount));
    setEditModal(false);
  };

  return (
    <>
      <View className="flex-row flex-wrap">
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.8}
            onPress={() => openEdit(cat)}
            style={{
              width: CARD_WIDTH,
              marginRight: index % 2 === 0 ? GAP : 0,
              marginBottom: GAP,
              borderColor: '#1A1F26',
              borderWidth: 1,
            }}
            className="bg-bg-card p-4 rounded-xl"
          >
            <View
              style={{ backgroundColor: cat.color }}
              className="h-1 rounded-full mb-2"
            />

            <Text className="text-text-primary font-pbold text-lg">
              {cat.name}
            </Text>

            <Text className="text-text-secondary mb-3">
              ₹ {cat.amount}
            </Text>

            <TouchableOpacity
              onPress={() => onDelete(cat.id)}
              className="self-end"
            >
              <Ionicons name="trash" size={18} color="#EF4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={editModal} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-bg-card w-[80%] rounded-2xl p-5">
            <Text className="text-text-primary text-2xl font-pbold mb-4">
              Edit Amount
            </Text>

            <Text className="text-text-secondary mb-2">
              {selected?.name}
            </Text>

            <TextInput
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              className="bg-bg-surface text-text-primary px-4 py-4 rounded-lg mb-4"
            />

            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setEditModal(false)}
                className="mr-4"
              >
                <Text className="text-text-secondary">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveAmount}>
                <Text className="text-accent font-pbold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
