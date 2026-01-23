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
  if (categories.length === 0) return null;

  return (
    <View>
      <Text className="text-text-primary text-2xl font-nunitobold mb-4">
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
              borderColor: '#1A1F26',
              borderWidth: 1,
            }}
            className="bg-bg-card p-4 rounded-xl"
          >
            <View
              style={{ backgroundColor: cat.color }}
              className="h-1 rounded-full mb-2"
            />

            <Text className="text-text-primary font-nunitobold text-lg">
              {cat.name}
            </Text>

            <Text className="text-text-secondary">
              ₹ {cat.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
