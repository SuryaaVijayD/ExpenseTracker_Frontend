import AnimatedTabBar from '@/components/AnimatedTabBar';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={props => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="expense" />
      <Tabs.Screen name="income" />
    </Tabs>
  );
}
