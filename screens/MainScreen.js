import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { characters } from '../character'; // character.js 파일에서 데이터 가져오기

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={characters} // 캐릭터 데이터
        keyExtractor={(item, index) => index.toString()} // 각 항목의 고유 키
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { character: item })}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#380B61",//'#0B0B3B', // 배경색 설정
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#000000',//'#f0f0f0',
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
  },
});
