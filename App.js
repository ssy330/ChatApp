import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import OldScreen from './screens/OldScreen';
import NewScreen from './screens/NewScreen';
import HumorScreen from './screens/HumorScreen';
import ChatApp from './screens/ChatApp';


const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ 
            headerShown: false, // Welcome 헤더 숨김
          }} />
        <Stack.Screen name="MainScreen" component={MainScreen} 
          options={({ navigation }) => ({ // options를 함수로 정의
            title: 'Choose Your Character',
            headerStyle: styles.headerStyle, // 헤더 스타일 참조
            headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
            headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>←</Text>
              </TouchableOpacity>
            ),
          })} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen}
          
          options={({ navigation }) => ({ // options를 함수로 정의
            title: '캐릭터 상세',
            headerStyle: styles.headerStyle, // 헤더 스타일 참조
            headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
            headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
            headerLeft: () => (
              <TouchableOpacity onPress={()  => navigation.goBack()}>
                <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>←</Text>
              </TouchableOpacity>
            ),
          })}/>
        <Stack.Screen
        name="OldScreen"
        component={OldScreen}
        options={({ navigation }) => ({ // options를 함수로 정의
          title: '기존 캐릭터',
          headerStyle: styles.headerStyle, // 헤더 스타일 참조
          headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
          headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
              <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>←</Text>
            </TouchableOpacity>
          ),
        })}
      />

        <Stack.Screen
              name="NewScreen"
              component={NewScreen}
              options={({ navigation }) => ({ // options를 함수로 정의
              title: '창작 캐릭터',
              headerStyle: styles.headerStyle, // 헤더 스타일 참조
              headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
              headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
                  <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>←</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
              name="HumorScreen"
              component={HumorScreen}
              options={({ navigation }) => ({ // options를 함수로 정의
              title: '병맛 캐릭터',
              headerStyle: styles.headerStyle, // 헤더 스타일 참조
              headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
              headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
                  <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21}}>←</Text>
                </TouchableOpacity>
              ),
            })}
          />
        <Stack.Screen name="Chat" component={ChatApp} 
        options={({ navigation }) => ({ // options를 함수로 정의
          title: '채팅',
          headerStyle: styles.headerStyle, // 헤더 스타일 참조
          headerTintColor: styles.headerTintColor, // 화살표 및 텍스트 색상 참조
          headerTitleStyle: styles.headerTitleStyle, // 제목 텍스트 스타일 참조
          headerLeft: () => (
            <TouchableOpacity onPress={()  => navigation.goBack()}>
              <Text style={{ color: styles.headerTintColor, fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>←</Text>
            </TouchableOpacity>
          ),
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 헤더 배경색 검정색
  },
  headerTintColor: '#FFFFFF', // 화살표 및 텍스트 색상 흰색
  headerTitleStyle: {
    color: '#FFFFFF', // 제목 텍스트 색상 흰색
    fontSize: 20, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 굵기
    marginLeft: 22,
  },
});


//npm run start