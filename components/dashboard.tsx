import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

type Props = { salary: string };
type ViewMode = '1W' | '1M';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ExpenseGraph({ salary }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('1W');
  const scrollViewRef = useRef<ScrollView>(null);

  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.toLocaleString('default', { month: 'short' });

  const labels = Array.from({ length: currentDay }, (_, i) => `${i + 1}`);
  const data = Array.from({ length: currentDay }, () => Math.floor(Math.random() * 500) + 100);

  const graphWidth =
    viewMode === '1M'
      ? SCREEN_WIDTH - 48
      : Math.max(SCREEN_WIDTH, currentDay * 48);

  useEffect(() => {
    if (viewMode === '1W') {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [viewMode]);

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    fillShadowGradientFrom: '#4DA3FF',
    fillShadowGradientTo: '#4DA3FF',
    fillShadowGradientOpacity: 0.12,
    color: (opacity = 1) => `rgba(77,163,255,${opacity})`,
    strokeWidth: 2.5,
    labelColor: () => '#6B7280',
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#393D7E',
    },
    decimalPlaces: 0,
  };

  return (
    <View className="bg-bg-lightWhite rounded-2xl px-4 pt-4 pb-3">
      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-text-muted text-xs uppercase tracking-wide">
            {currentMonth} Spending
          </Text>
          <Text className="text-text-primary font-nunitoBold text-lg mt-1">
            Expense Overview
          </Text>
        </View>

        <View className="flex-row bg-white rounded-xl p-1">
          {(['1W', '1M'] as ViewMode[]).map(mode => {
            const active = viewMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                onPress={() => setViewMode(mode)}
                className={`px-4 py-1.5 rounded-lg ${
                  active ? 'bg-brand-primarySoft' : ''
                }`}
              >
                <Text
                  className={`text-xs font-nunitoBold ${
                    active ? 'text-brand-primary' : 'text-text-muted'
                  }`}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* CHART */}
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
          yAxisLabel="₹"
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 16 }}
        />
      </ScrollView>

      <Text className="text-text-muted text-xs text-center mt-3">
        {viewMode === '1W'
          ? 'Scroll to see previous days'
          : 'Monthly summary view'}
      </Text>
    </View>
  );
}
