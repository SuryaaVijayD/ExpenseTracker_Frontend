import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#222831',
          borderTopWidth: 1,
          height: 60,
          paddingTop: 5,
          borderRadius: 15,
          position: 'absolute', 
          bottom: 15,
          elevation: 0,
          marginHorizontal: 20,
          borderWidth: 1.5,
          paddingVertical:10,
          borderColor: 'black',  
        },
        tabBarActiveTintColor: '#EEEEEE',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="chart-line" color={color} />,
        }}
      />

      <Tabs.Screen
        name="expense" 
        options={{
          title: 'Expense',
          tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="wallet" color={color} />,
        }}
      />

      <Tabs.Screen
        name="income" 
        options={{
          title: 'Income',
          tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="coins" color={color} />,
        }}
      />
      
    </Tabs>
  );
}