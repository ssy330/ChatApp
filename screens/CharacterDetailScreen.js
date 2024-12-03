import React from 'react';
import {Dimensions, View, TouchableOpacity, Text, Image, StyleSheet, Button } from 'react-native';

const { width, height } = Dimensions.get('window'); // 화면 크기 가져오기

export default function CharacterDetailScreen({ route, navigation }) {
  const { character } = route.params; // 전달된 캐릭터 정보

  return (
    <View style={styles.container}>
      <Image source={character.detailimage} style={styles.detailImage} />
      <Image source={character.background} style={styles.Background} />
      <View style={styles.detailBackground}>
        <Text style={styles.detailName}>{character.name}</Text>
        <Text style={styles.detailDescription}>{character.shortDescription}</Text>
        <Text style={styles.detailDialogue}>" {character.dialogue} "</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat', { personality: character.personality })}
        >
          <Text style={styles.buttonText}>채팅 시작하기</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Background: {
    width: width, 
    height: height*1.2,
    zIndex: -1,
    borderRadius: 10,
    marginBottom: 20,
    position: 'absolute', // zIndex 작동을 위해 position 설정 필요
  },
  detailBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 검정색 배경에 투명도 설정
    padding: 20, // 내부 여백 추가
    borderRadius: 10, // 모서리를 둥글게 처리
    height: '50%', // 화면 너비의 90% 사용
    width : width*0.99,
    margin: 1, // 외부 여백 추가 (모든 방향)
    alignSelf: 'center', // 화면 중앙 정렬
    //alignItems: 'center', // 텍스트 정렬
    position: 'relative', // 자식 요소의 절대 위치를 설정하기 위해 필요
  },
  detailImage: {
    height: height * 0.4,
    width: width * 0.8,
    resizeMode: 'contain', // 비율 유지
    marginBottom: 20,
    position: 'relative',
    top: height * 0.06,
    left: height * 0.05,
  },
  
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    //textAlign: 'center',
    color: "#FFFFFF",
    top: height * 0.01, // 부모 컨테이너의 상단에서 50px 아래
    left: width * 0.01, // 부모 컨테이너의 왼쪽에서 20px 오른쪽
    borderBottomWidth: width * 0.005, // 선 두께
    borderBottomColor: '#FFFFFF', // 선 색상
    paddingBottom: width * 0.015, // 텍스트와 선 사이의 여백
    textShadowColor: '#000000', // 그림자 색상
    textShadowOffset: { width: 2, height: 2 }, // 그림자 위치
    textShadowRadius: 6, // 그림자 흐림 효과
  },
  detailDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    //textAlign: 'center',
    color: "#FFFFFF",
    top: height * 0.04, // 부모 컨테이너의 상단에서 50px 아래
    left: width * 0.01, // 부모 컨테이너의 왼쪽에서 20px 오른쪽
    marginBottom: 1, // 버튼과 간격 추가
  },
  detailDialogue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFFFFF",
    top: height * 0.2, // 부모 컨테이너의 상단에서 50px 아래
    left: width * 0.01, // 부모 컨테이너의 왼쪽에서 20px 오른쪽
    marginBottom: height * 0.22, // 버튼과의 간격 추가
  },
  button: {
    position: 'absolute', // detailBackground 내부에서 절대 위치 설정
    bottom: height * 0.03, // detailBackground의 아래에서 20px 위로 위치
    left: width * 0.05, 
    backgroundColor: '#007BFF', // 파란색 버튼 배경색
    width: width * 0.5, // 버튼 너비 (화면의 60%)
    height: height * 0.06, // 버튼 높이 (화면 높이의 7%)
    justifyContent: 'center', // 텍스트 수직 중앙 정렬
    alignItems: 'center', // 텍스트 가로 중앙 정렬
    borderRadius: 10, // 둥근 버튼
    shadowColor: '#000000', // 버튼 그림자 색상
    shadowOffset: { width: 2, height: 2 }, // 그림자 위치
    shadowOpacity: 0.9, // 그림자 불투명도 (iOS)
    shadowRadius: 5, // 그림자 흐림 효과 (iOS)
    elevation: 5, // 그림자 높이 (Android)
  },
  buttonText: {
    fontSize: 18, // 버튼 텍스트 크기
    color: '#FFFFFF', // 텍스트 색상
    fontWeight: 'bold',
  },
});
