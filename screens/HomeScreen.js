import React, { useEffect, useRef } from 'react';
import {
    Dimensions,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window'); // 화면 크기 가져오기

export default function HomeScreen({ navigation }) {
  // Animated Value for blinking effect
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
    // Infinite blinking animation
    Animated.loop(
        Animated.sequence([
            Animated.timing(fadeAnim, {
            toValue: 0, // 완전 투명
            duration: 500, // 0.5초 동안
            useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
            toValue: 1, // 완전 불투명
            duration: 500, // 0.5초 동안
            useNativeDriver: true,
            }),
        ])
    ).start();
}, [fadeAnim]);

    return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('MainScreen')} // MainScreen으로 이동
    >
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.title}>Welcome to the CCA!</Text>
            <Text style={styles.subtitle}>Characters Dreamed Up Together</Text>
            <Animated.Text style={[styles.click, { opacity: fadeAnim }]}>
            Click to Start!
            </Animated.Text>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#322448', // 배경색 설정
    },
    icon: {
        width: width * 0.245, // 아이콘 너비
        height: width * 0.245, // 아이콘 높이
        marginBottom: width * 0.05, // 아래 여백
    },
    title: {
        fontSize: width * 0.058,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: width * 0.05,
        borderBottomWidth: width * 0.005, // 선 두께
        borderBottomColor: '#FFFFFF', // 선 색상
        paddingBottom: width * 0.0125, // 텍스트와 선 사이의 여백
    },
    subtitle: {
        fontSize: width * 0.0325,
        fontWeight: 'bold',
        color: '#BCA9F5',
        marginBottom: width * 0.05,
    },
    click: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#CC2EFA',
        marginBottom: width * 0.05,
    },
});
