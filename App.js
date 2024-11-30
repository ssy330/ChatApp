import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import ChatApp from './screens/ChatApp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '캐릭터 목록' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: '캐릭터 상세' }} />
        <Stack.Screen name="Chat" component={ChatApp} options={{ title: '채팅' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
