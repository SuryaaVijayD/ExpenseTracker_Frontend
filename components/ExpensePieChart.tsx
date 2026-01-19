import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type PieChartProps = {
  data: { name: string; amount: number; color: string }[];
};

const screenWidth = Dimensions.get('window').width;

const ExpensePieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    name: d.name,
    population: d.amount,
    color: d.color,
    legendFontColor: '#9CA3AF', // Secondary
    legendFontSize: 12,
  }));

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#0B0F14', // Main dark bg
          backgroundGradientFrom: '#0B0F14',
          backgroundGradientTo: '#0B0F14',
          color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`, // Accent color
          labelColor: () => '#FFFFFF',
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default ExpensePieChart;
