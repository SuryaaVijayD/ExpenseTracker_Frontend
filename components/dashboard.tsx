import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

type Props = {
  salary: string;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
type ViewMode = '1W' | '1M';

export default function StockExpenseChart({ salary }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('1W');
  const scrollViewRef = useRef<ScrollView>(null);

  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.toLocaleString('default', { month: 'short' });

  const labels = Array.from({ length: currentDay }, (_, i) => `${i + 1}`);
  const data = Array.from({ length: currentDay }, () => Math.floor(Math.random() * 500) + 100);

  const graphWidth =
    viewMode === '1M'
      ? SCREEN_WIDTH - 40
      : Math.max(SCREEN_WIDTH, currentDay * 50);

  useEffect(() => {
    if (viewMode === '1W') {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [viewMode]);

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#111311',
    backgroundGradientTo: '#111311',
    fillShadowGradientFrom: '#38BDF8',
    fillShadowGradientTo: '#111311',
    fillShadowGradientOpacity: 0.2,
    color: (o = 1) => `rgba(56, 189, 248, ${o})`,
    strokeWidth: 2,
    labelColor: () => '#6B7280',
    propsForDots: { r: '4', strokeWidth: '2', stroke: '#111311' },
    decimalPlaces: 0,
  };

  return (
    <View className="bg-[#111311] p-4 rounded-2xl border border-gray-800">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-gray-300 text-4xl font-bold">₹ {salary}</Text>
          <Text className="text-gray-400 text-xs tracking-wider mt-1">
            {currentMonth} Spend
          </Text>
        </View>

        <View className="flex-row bg-gray-800 rounded-lg p-1">
          {(['1W', '1M'] as ViewMode[]).map(mode => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-md ${
                viewMode === mode ? 'bg-gray-600' : ''
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  viewMode === mode ? 'text-white' : 'text-gray-400'
                }`}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chart */}
      <View style={{ height: 220 }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          scrollEnabled={viewMode === '1W'}
          showsHorizontalScrollIndicator={false}
        >
          <LineChart
            data={{ labels, datasets: [{ data }] }}
            width={graphWidth}
            height={220}
            yAxisLabel="$"
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </ScrollView>
      </View>

      <Text className="text-gray-600 text-xs text-center mt-2">
        {viewMode === '1W'
          ? 'Scroll left to see past history'
          : 'Showing entire month'}
      </Text>
    </View>
  );
}
