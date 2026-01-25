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
    <View className="mb-8 mt-6">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-text-primary text-3xl font-nunitoBold">
          Transactions
        </Text>

        <TouchableOpacity
          onPress={onAddPress}
          className="h-11 w-11 rounded-full bg-brand-primary items-center justify-center shadow-md"
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <View className="bg-bg-lightWhite rounded-xl p-4 border-l-2 border-bg-brand-primary">
          <Text className="text-text-muted text-center">
            No transactions yet. Add your first expense.
          </Text>
        </View>
      ) : (
        transactions.map(tx => (
          <View
            key={tx.id}
            className="bg-bg-lightWhite p-4 rounded-xl mb-3 border-l-2 border-bg-brand-primary"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-text-primary font-nunitoBold text-base">
                {tx.category}
              </Text>

              <Text className="text-brand-primary font-nunitoBold text-base">
                ₹ {tx.amount}
              </Text>
            </View>

            {tx.description ? (
              <Text className="text-text-secondary mt-1 text-sm">
                {tx.description}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}
