import { addExpenseApi, fetchExpensesByMonth } from '@/api/expenseApi';
import AddTransactionModal from '@/components/AddTransactionModal';
import CategoryCards from '@/components/CategoryCards';
import ExpensePieChart from '@/components/ExpensePieChart';
import TransactionsSection from '@/components/TransactionsSection';
import { useAuth } from '@/context/AuthContext';
import generateRandomColor from '@/utils/colorGenerator';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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

const isSameMonth = (dateStr: string, month: number, year: number) => {
  const d = new Date(dateStr);
  return d.getMonth() === month && d.getFullYear() === year;
};


export default function ExpensePage() {
  const today = new Date();

  const { user, token } = useAuth();

  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);

  const [monthIndex, setMonthIndex] = useState(todayMonth);
  const [year, setYear] = useState(todayYear);

  const categoryColorMap = useRef<Record<string, string>>({});

  const isCurrentMonth =
    monthIndex === todayMonth && year === todayYear;

  const isPreviousMonth =
    (todayMonth === 0 &&
      monthIndex === 11 &&
      year === todayYear - 1) ||
    (monthIndex === todayMonth - 1 &&
      year === todayYear);

  const prevMonth = () => {
    if (isPreviousMonth) return; 

    setMonthIndex(prev => {
      if (prev === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    if (isCurrentMonth) return;

    setMonthIndex(prev => {
      if (prev === 11) {
        setYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  

  const addTransaction = async (data: {
    amount: number;
    category: string;
    description: string;
  }) => {
    if (!token) return;

    try {
      console.log("Expense adding in progress...");
      const savedExpense = await addExpenseApi(token, data);
      setTransactions(prev => [savedExpense, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };


  const filteredTransactions = transactions;

  const categories = useMemo<CategorySummary[]>(() => {
    const map = new Map<string, CategorySummary>();

    filteredTransactions.forEach(tx => {
      if (!categoryColorMap.current[tx.category]) {
        categoryColorMap.current[tx.category] = generateRandomColor();
      }

      if (map.has(tx.category)) {
        map.get(tx.category)!.amount += tx.amount;
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
  }, [filteredTransactions]);


  const totalExpense = useMemo(
    () => filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0),
    [filteredTransactions]
  );

  const remainingAmount = user ? user.salary - totalExpense : 0;



  useEffect(() => {
  if (!token) return;

  fetchExpensesByMonth(token, monthIndex, year)
    .then(setTransactions)
    .catch(err => console.error(err));
}, [monthIndex, year, token]);



  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView className="px-5 py-2">

        <View className="py-8">
          <Text className="text-text-primary text-3xl text-center font-nunitoBold">
            Your <Text>Expense</Text>
          </Text>
        </View>

        <View className="flex-row items-center mb-6 px-4 py-4 bg-bg-secondary rounded-2xl">
            <View className="flex-1 items-center">
              <View className="flex-1 items-end">
                <Text className="text-text-muted text-sm">Exp</Text>
                <Text
                  className="text-text-primary2 text-3xl font-nunito font-semibold"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ₹{totalExpense}
                </Text>
              </View>
            </View>

            <View className="mx-3 h-10 w-[1px] bg-text-secondary/30" />

            <View className="flex-1 items-center">
              <View className='flex-1 items-end'>
                <Text className="text-text-muted text-sm">Rem</Text>
                <Text
                  className="text-text-primary2 text-3xl font-nunito font-semibold"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ₹{remainingAmount}
                </Text>
              </View>
            </View>

        </View>


        <View className="flex-row justify-between items-center px-6 mb-6">
          <Text
            onPress={isPreviousMonth ? undefined : prevMonth}
            className={`text-2xl ${
              isPreviousMonth ? 'text-gray-400' : 'text-text-primary'
            }`}
          >
            ◀
          </Text>

          <Text className="text-text-primary text-2xl font-nunitoBold">
            {months[monthIndex]} <Text className='font-nunitoBold'>{year}</Text>
          </Text>

          <Text
            onPress={isCurrentMonth ? undefined : nextMonth}
            className={`text-2xl ${
              isCurrentMonth ? 'text-gray-400' : 'text-text-primary'
            }`}
          >
            ▶
          </Text>
        </View>

        <ExpensePieChart categories={categories} />

        <CategoryCards categories={categories} />

        <TransactionsSection
          transactions={filteredTransactions}
          onAddPress={() => setOpen(true)}
        />

        

      </ScrollView>

      <AddTransactionModal
        visible={open}
        onClose={() => setOpen(false)}
        onSave={addTransaction}
      />
    </SafeAreaView>
  );
}
