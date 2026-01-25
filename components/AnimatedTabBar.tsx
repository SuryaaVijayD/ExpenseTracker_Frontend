import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TAB_COUNT = 3;
const TAB_WIDTH = (width - 40) / TAB_COUNT;

export default function AnimatedTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 260,
    });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const icons: Array<keyof typeof FontAwesome5.glyphMap> = [
    'chart-line',
    'wallet',
    'user-cog',
  ];

  return (
    <View className="absolute bottom-6 left-5 right-5 h-[60px] rounded-2xl bg-brand-primary overflow-hidden shadow-lg">
      {/* ACTIVE SLIDER */}
      <Animated.View
        className="absolute h-[60px] rounded-2xl bg-black/30 items-center justify-center"
        style={[
          { width: TAB_WIDTH },
          animatedStyle,
        ]}
      >
        <FontAwesome5
          name={icons[state.index]}
          size={22}
          color="#FFFFFF"
        />
      </Animated.View>

      {/* INACTIVE ICONS */}
      <View className="flex-row h-full">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              className="flex-1 items-center justify-center"
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
            >
              {!isFocused && (
                <FontAwesome5
                  name={icons[index]}
                  size={18}
                  color="#B8C1FF"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
