import { fetchExpensesByMonth } from '@/api/expenseApi';
import { useAuth } from '@/context/AuthContext';
import { Transaction } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const RecentTransactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const today = new Date();
        const allTransactions = await fetchExpensesByMonth(
          token,
          today.getMonth(),
          today.getFullYear()
        );

        // Top 5 most recent
        const top5 = allTransactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setTransactions(top5);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <View className="px-5 py-4">
        <Text className="text-text-primary2 font-nunito">Loading...</Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View className="px-5 py-4">
        <Text className="text-text-primary2 font-nunito">No Recent Transactions</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactions}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 100 }} // safe space for bottom tabs
      scrollEnabled={false} // disables internal scrolling to prevent nesting issues
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-center border-l-2 border-bg-brand-primary bg-white rounded-xl p-4 mb-3 shadow-sm">
          {/* Left: category + description */}
          <View className="flex-1">
            <Text className="text-text-primary font-nunitoBold text-lg">{item.category}</Text>
            <Text className="text-text-secondary font-nunito text-sm mt-1">{item.description}</Text>
          </View>

          {/* Right: amount */}
          <Text className="text-red-500 font-nunitoBold text-lg">-₹{item.amount}</Text>
        </View>
      )}
    />
  );
};

export default RecentTransactions;
