// components/DetailRow.tsx
import React from 'react';
import { Text, View } from 'react-native';

type DetailRowProps = {
  label: string;
  value?: string | number;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <View className="mb-5">
    <Text className="text-xs text-text-muted">{label}</Text>
    <Text className="text-base font-nunito text-text-primary mt-1">
      {value ?? '—'}
    </Text>
  </View>
);

export default DetailRow;
