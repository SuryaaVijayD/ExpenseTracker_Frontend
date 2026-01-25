import { addExpenseApi, fetchExpensesByMonth } from '@/api/expenseApi';
import AddTransactionModal from '@/components/AddTransactionModal';
import CategoryCards from '@/components/CategoryCards';
import ExpensePieChart from '@/components/ExpensePieChart';
import TransactionsSection from '@/components/TransactionsSection';
import { useAuth } from '@/context/AuthContext';
import generateRandomColor from '@/utils/colorGenerator';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export type CategorySummary = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

const months = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export default function ExpensePage() {
  const today = new Date();
  const { user, token } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);

  const [monthIndex, setMonthIndex] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const categoryColorMap = useRef<Record<string, string>>({});

  const isCurrentMonth =
    monthIndex === today.getMonth() && year === today.getFullYear();

  // Prev month logic
  const prevMonth = () => {
    setMonthIndex(prev => {
      if (prev === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // Next month logic (blocked on current month)
  const nextMonth = () => {
    if (!isCurrentMonth) {
      setMonthIndex(prev => {
        if (prev === 11) {
          setYear(y => y + 1);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  // Fetch expenses
  useEffect(() => {
    if (!token) return;
    fetchExpensesByMonth(token, monthIndex, year)
      .then(setTransactions)
      .catch(console.error);
  }, [monthIndex, year, token]);

  // Category summary
  const categories = useMemo<CategorySummary[]>(() => {
    const map = new Map<string, CategorySummary>();

    transactions.forEach(tx => {
      if (!categoryColorMap.current[tx.category]) {
        categoryColorMap.current[tx.category] = generateRandomColor();
      }

      const existing = map.get(tx.category);
      if (existing) {
        existing.amount += tx.amount;
      } else {
        map.set(tx.category, {
          id: tx.category,
          name: tx.category,
          amount: tx.amount,
          color: categoryColorMap.current[tx.category],
        });
      }
    });

    return Array.from(map.values());
  }, [transactions]);

  const totalExpense = transactions.reduce((s, t) => s + t.amount, 0);
  const remainingAmount = user ? user.salary - totalExpense : 0;

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* TITLE */}
        <Text className="text-3xl text-text-primary font-nunitoBold text-center mt-8">
          Expense Overview
        </Text>

        {/* SUMMARY CARD */}
        <View className="mt-6 bg-brand-primary rounded-2xl px-6 py-6 flex-row justify-between items-center">
          {/* Total Expense */}
          <View className="flex-1 items-center">
            <Text className="text-gray-300 text-xs">Total Expense</Text>
            <Text className="text-white text-3xl font-nunitoBold mt-1">
              ₹{Number(totalExpense).toLocaleString()}
            </Text>
          </View>

          {/* Divider */}
          <View className="w-px bg-white h-12 opacity-40" />

          {/* Remaining Amount */}
          <View className="flex-1 items-center">
            <Text className="text-gray-300 text-xs">Remaining</Text>
            <Text className="text-white text-3xl font-nunitoBold mt-1">
              ₹{Number(remainingAmount).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* MONTH SWITCH */}
        <View className="flex-row justify-between items-center mt-8 px-6">
          {/* Prev */}
          <TouchableOpacity onPress={prevMonth} className="p-2">
            <Text className="text-2xl text-text-secondary">◀</Text>
          </TouchableOpacity>

          {/* Month Label */}
          <Text className="text-xl font-nunitoBold text-text-primary">
            {months[monthIndex]} {year}
          </Text>

          {/* Next */}
          <TouchableOpacity
            onPress={nextMonth}
            disabled={isCurrentMonth}
            className="p-2"
          >
            <Text className={`text-2xl ${isCurrentMonth ? 'text-gray-300' : 'text-text-secondary'}`}>
              ▶
            </Text>
          </TouchableOpacity>
        </View>

        {/* Charts */}
        <ExpensePieChart categories={categories} />
        <CategoryCards categories={categories} />

        {/* Transactions */}
        <TransactionsSection
          transactions={transactions}
          onAddPress={() => setOpen(true)}
        />
      </ScrollView>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={open}
        onClose={() => setOpen(false)}
        onSave={async data => {
          if (!token) return;
          const saved = await addExpenseApi(token, data);
          setTransactions(prev => [saved, ...prev]);
        }}
      />
    </SafeAreaView>
  );
}
