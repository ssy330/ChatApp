import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function CharacterDetailScreen({ route, navigation }) {
  const { character } = route.params; // 전달된 캐릭터 정보

  return (
    <View style={styles.container}>
      <Image source={character.image} style={styles.detailImage} />
      <Text style={styles.detailName}>{character.name}</Text>
      <Text style={styles.detailDescription}>{character.shortDescription}</Text>
      <Button
        title="채팅 시작하기"
        onPress={() => navigation.navigate('Chat', { personality: character.personality })}// 'Chat' 화면으로 이동
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailDescription: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20, // 버튼과 간격 추가
  },
});
