import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

const SCREEN_WIDTH = Dimensions.get("window").width;

type ViewMode = '1W' | '1M';

export default function StockExpenseChart() {
  const [viewMode, setViewMode] = useState<ViewMode>('1W');
  
  const scrollViewRef = useRef<ScrollView>(null);
  const spentMoney = "$1,250.00";

  const date = new Date();
  const currentDay = date.getDate(); 
  const currentMonth = date.toLocaleString('default', { month: 'short' });

  const allLabels: string[] = Array.from({ length: currentDay }, (_, i) => (i + 1).toString());
  const allData: number[] = Array.from({ length: currentDay }, () => Math.floor(Math.random() * 500) + 100);

  const graphWidth = viewMode === '1M' ? SCREEN_WIDTH - 48 : Math.max(SCREEN_WIDTH, currentDay * 50);

  useEffect(() => {
    if (viewMode === '1W' && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [viewMode]);

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#111311",
    backgroundGradientTo: "#111311",
    fillShadowGradientFrom: "#38BDF8",
    fillShadowGradientTo: "#111311",
    fillShadowGradientOpacity: 0.2,
    color: (opacity: number = 1) => `rgba(56, 189, 248, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    labelColor: () => `#6B7280`,
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#111311" },
    decimalPlaces: 0,
  };

  return (
    <View className="bg-[#111311] p-4 rounded-2xl my-4 border border-gray-800">
      
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Text className="text-white text-2xl font-bold">{spentMoney}</Text>
          <Text className="text-gray-400 text-xs font-bold tracking-wider">
            {currentMonth} Spend
          </Text>
        </View>

        <View className="flex-row bg-gray-800 rounded-lg p-1">
          <TouchableOpacity 
            onPress={() => setViewMode('1W')}
            className={`px-3 py-1 rounded-md ${viewMode === '1W' ? 'bg-gray-600' : ''}`}
          >
            <Text className={`text-xs font-bold ${viewMode === '1W' ? 'text-white' : 'text-gray-400'}`}>1W</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setViewMode('1M')}
            className={`px-3 py-1 rounded-md ${viewMode === '1M' ? 'bg-gray-600' : ''}`}
          >
            <Text className={`text-xs font-bold ${viewMode === '1M' ? 'text-white' : 'text-gray-400'}`}>1M</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 220 }}>
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          scrollEnabled={viewMode === '1W'}
        >
          <LineChart
            data={{
              labels: allLabels,
              datasets: [{ data: allData }]
            }}
            width={graphWidth}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            withInnerLines={false}
            withOuterLines={false}
            yAxisInterval={100} 
            chartConfig={chartConfig}
            bezier
            style={{
              paddingRight: viewMode === '1W' ? 50 : 0, 
              borderRadius: 16
            }}
            withVerticalLabels={true} 
            withHorizontalLabels={true} 
          />
        </ScrollView>
      </View>

      <Text className="text-gray-600 text-xs text-center mt-2">
        {viewMode === '1W' ? 'Scroll left to see past history' : 'Showing entire month'}
      </Text>
    </View>
  );
}