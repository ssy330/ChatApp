import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { characters } from '../character'; // character.js 파일에서 데이터 가져오기

export default function HumorScreen({ navigation }) {

    // "category"가 "HumorScreen"인 캐릭터 필터링
    const filteredCharacters = characters.filter((character) => character.category === "HumorScreen");

    return (
    <View style={styles.container}>
        <FlatList
        contentContainerStyle={styles.listContent} // 리스트에만 패딩 적용
        data={filteredCharacters} // 필터링된 캐릭터 데이터
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
        {/* 하단 고정 카테고리 버튼 */}
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('HumorScreen')} style={[styles.footerButton, styles.footerButtonWithBorder]}>
            <Text style={styles.footerClickedButtonText}>병맛</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OldScreen')} style={[styles.footerButton, styles.footerButtonWithBorder]}>
            <Text style={styles.footerButtonText}>유명인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewScreen')} style={[styles.footerButton, styles.footerButtonWithBorder]}>
            <Text style={styles.footerButtonText}>창작 캐릭터</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#380B61",//'#0B0B3B', // 배경색 설정
    },
    listContent: {
    padding: 10, // FlatList에만 패딩 적용
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
    footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    },
    footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    },
    footerButtonWithBorder: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    },
    footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    },
    footerClickedButtonText: {
        color: "#00FFFF",
        fontSize: 16,
        fontWeight: 'bold',
        },
});
