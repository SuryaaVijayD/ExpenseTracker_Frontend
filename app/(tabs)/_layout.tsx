import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const TAB_HEIGHT = 60;
  const TAB_BOTTOM = 15;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: '#18004D',
          borderTopWidth: 1,
          borderColor: 'black',
          borderWidth: 1.5,
          borderRadius: 15,

          position: 'absolute',
          height: TAB_HEIGHT,
          bottom: TAB_BOTTOM + insets.bottom,
          marginHorizontal: 20,

          paddingTop: 5,
          paddingVertical: 10,
          elevation: 0,
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#3C2669',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={20} name="chart-line" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="expense"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={20} name="wallet" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="income"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={20} name="coins" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
