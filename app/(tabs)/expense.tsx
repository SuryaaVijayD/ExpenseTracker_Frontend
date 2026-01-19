import CategoryCards, { Category } from '@/components/CategoryCards';
import generateRandomColor from '@/utils/colorGenerator';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const screenWidth = Dimensions.get('window').width;

export default function ExpensePage() {
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Food', amount: 300, color: '#38BDF8' },
    { id: '2', name: 'Transport', amount: 150, color: '#FACC15' },
    { id: '3', name: 'Shopping', amount: 100, color: '#EF4444' },
  ]);

  // modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addCategory = () => {
    if (!newName || !newAmount) return;

    setCategories(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        amount: Number(newAmount),
        color: generateRandomColor(),
      },
    ]);

    setNewName('');
    setNewAmount('');
    setModalVisible(false);
  };

  const updateCategoryAmount = (id: string, amount: number) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, amount } : c))
    );
  };



  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const pieData = categories.map(c => ({
    name: c.name,
    population: c.amount,
    color: c.color,
    legendFontColor: '#9CA3AF',
    legendFontSize: 12,
  }));

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <View className="py-10 px-4">
        <Text className="text-text-primary text-3xl text-center font-p">
          Your Expense
        </Text>
      </View>

      {/* Month Carousel */}
      <View className="flex-row justify-between items-center px-5 mb-6">
        <TouchableOpacity onPress={() => setCurrentMonthIndex(p => p === 0 ? 11 : p - 1)}>
          <View className="bg-bg-surface rounded-full p-4">
            <AntDesign name="left" size={18} color="#38BDF8" />
          </View>
        </TouchableOpacity>

        <Text className="text-accent text-2xl font-pbold">
          {months[currentMonthIndex]} {currentYear}
        </Text>

        <TouchableOpacity onPress={() => setCurrentMonthIndex(p => p === 11 ? 0 : p + 1)}>
          <View className="bg-bg-surface rounded-full p-4">
            <AntDesign name="right" size={18} color="#38BDF8" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Pie Chart */}
      {/* Pie Chart / Empty State */}
      <View className="px-5 mb-6">
        {categories.length > 0 ? (
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            chartConfig={{
              backgroundColor: '#0B0F14',
              backgroundGradientFrom: '#0B0F14',
              backgroundGradientTo: '#0B0F14',
              color: () => '#38BDF8',
              labelColor: () => '#9CA3AF',
            }}
          />
        ) : (
          <View className="h-[220px] bg-bg-card rounded-2xl flex justify-center items-center border border-bg-surface">
            <Text className="text-text-secondary text-lg text-center">
              No data available
            </Text>
            <Text className="text-text-secondary text-sm mt-2 text-center">
              Please add 
            </Text>
          </View>
        )}
      </View>


      <ScrollView className="px-5">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-text-primary text-3xl font-pbold">
            Categories
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-3 bg-bg-surface rounded-full"
          >
            <Ionicons name="add" size={24} color="#38BDF8" />
          </TouchableOpacity>
        </View>

       <CategoryCards
          categories={categories}
          onDelete={deleteCategory}
          onUpdateAmount={updateCategoryAmount}
        />

      </ScrollView>


      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-bg-card w-[85%] rounded-2xl p-5">
            <Text className="text-text-primary text-4xl font-pbold mb-4">
              Add Category
            </Text>

            <TextInput
              placeholder="Category name"
              placeholderTextColor="#6B7280"
              value={newName}
              onChangeText={setNewName}
              className="bg-bg-surface text-text-primary px-4 py-4 rounded-lg mb-4"
            />

            <TextInput
              placeholder="Amount"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              value={newAmount}
              onChangeText={setNewAmount}
              className="bg-bg-surface text-text-primary px-4 py-4 rounded-lg mb-4"
            />

            <View className="flex-row justify-end items-center mt-4">
              <TouchableOpacity onPress={() => setModalVisible(false)} className="mr-4">
                <Text className="text-text-secondary text-lg">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addCategory} className='bg-accent rounded-lg px-4 py-1'>
                <Text className="text-text-primary font-pbold text-xl">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
