import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type Props = {
  categories: {
    name: string;
    amount: number;
    color: string;
  }[];
};

const width = Dimensions.get('window').width - 40;

export default function ExpensePieChart({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <View className="h-[220px] bg-bg-card rounded-2xl mb-6 flex justify-center items-center">
        <Text className="text-text-secondary">
          No data available
        </Text>
        <Text className="text-text-secondary text-sm mt-1">
          Please add expenses
        </Text>
      </View>
    );
  }

  return (
    <PieChart
      data={categories.map(c => ({
        name: c.name,
        population: c.amount,
        color: c.color,
        legendFontColor: '#9CA3AF',
        legendFontSize: 12,
      }))}
      width={width}
      height={220}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="10"
      absolute
      chartConfig={{
        backgroundGradientFrom: '#0B0F14',
        backgroundGradientTo: '#0B0F14',
        color: () => '#38BDF8',
      }}
    />
  );
}
