import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export type CategoryCard = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

type Props = {
  categories: CategoryCard[];
};

const screenWidth = Dimensions.get('window').width;
const GAP = 12;
const CARD_WIDTH = (screenWidth - 40 - GAP) / 2;

export default function CategoryCards({ categories }: Props) {
  if (!categories.length) return null;

  return (
    <View className="mt-8">
      <Text className="text-2xl font-nunitoBold text-text-primary mb-4">
        Categories
      </Text>

      <View className="flex-row flex-wrap">
        {categories.map((cat, index) => (
          <View
            key={cat.id}
            style={{
              width: CARD_WIDTH,
              marginRight: index % 2 === 0 ? GAP : 0,
              marginBottom: GAP,
            }}
            className="bg-bg-lightWhite rounded-xl p-4"
          >
            <View
              style={{ backgroundColor: cat.color }}
              className="h-1.5 rounded-full mb-3"
            />

            <Text className="text-text-primary font-nunitoBold text-lg">
              {cat.name}
            </Text>

            <Text className="text-text-secondary mt-1">
              ₹ {cat.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
