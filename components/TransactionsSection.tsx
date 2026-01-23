// components/TransactionsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Transaction } from '../utils/types';

type Props = {
  transactions: Transaction[];
  onAddPress: () => void;
};

export default function TransactionsSection({
  transactions,
  onAddPress,
}: Props) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-text-primary text-3xl font-nunitobold">
          Transactions
        </Text>

        <TouchableOpacity onPress={onAddPress} className='py-2 px-4 rounded-full bg-bg-secondary shadow-lg'>
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <Text className="text-text-muted">
          No data available, please add
        </Text>
      ) : (
        transactions.map(tx => (
          <View
            key={tx.id}
            className="bg-bg-card p-4 rounded-xl mb-3 border border-bg-surface"
          >
            <View className="flex-row justify-between">
              <Text className="text-text-primary font-nunitobold">
                {tx.category}
              </Text>
              <Text className="text-text-primary">
                ₹ {tx.amount}
              </Text>
            </View>

            {tx.description ? (
              <Text className="text-text-secondary mt-1">
                {tx.description}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}
