import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

// const API_KEY = "";

const BASE_PROMPT = `
당신은 지금부터 지정된 캐릭터로서 행동하고 말하시오. 
캐릭터의 성격, 배경, 말투를 철저히 반영해야 하며 행동은 괄호를 통해 표현할 수 있습니다. 
캐릭터의 성격은 다음과 같습니다: {characterPrompt}.

필수적으로 지켜야 할 것:
- 대사 예시보다 사용자의 말에 반응하는 것에 더 집중해야 합니다.
- 캐릭터의 대사, 행동, 감정만 출력해야 합니다.
    -> 한 번 말할 때 대사가 30단어 이하, 2문장 이하여야 합니다.
    -> 대사는 ""를 생략하고 출력하세요.
    -> 행동과 감정을 묘사할 경우 () 괄호를 치고 묘사하고, 이는 13단어 이하, 1문장 이하여야 합니다.
    -> 같은 대사를 2번 이상 말하지 마세요.
    -> 3글자 이하의 내용(.,! 등 포함)줄을 넘겨야 할 때 그 전에 띄어쓰기 대신 엔터를 치세요.
    -> 단어가 중간에 끊겨서 줄이 넘어가야하면 그 전에 띄어쓰기 대신 엔터를 치세요.
`;

const chatHistory = async (characterPrompt, userPrompt, messages, onMessage) => {
  const headers = {  
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  // BASE_PROMPT를 사용해 시스템 프롬프트를 생성
  const systemPrompt = BASE_PROMPT.replace("{characterPrompt}", characterPrompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages: [
          { role: 'system', content: systemPrompt }, // 동적으로 생성된 시스템 프롬프트
          ...messages,                              // 기존 메시지
          { role: 'user', content: userPrompt },    // 사용자의 새로운 메시지
        ],
      },
      { headers, timeout: 15000 }
    );
    onMessage(response.data.choices[0].message.content);
  } catch (err) {
    console.error(err);
    onMessage(err.message);
  }
};

export default function AppGptHistory({ route }) {
  const { personality } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const refText = useRef();
  const scrollRef = useRef(); // 추가

  const sendChat = () => {
    const userprompt = text;
    setText('');
    refText.current.focus();
    const newMessages = [...messages, { role: 'user', content: userprompt }];
    setMessages(newMessages);
    chatHistory(personality, userprompt, newMessages, (result) => {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: result }]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollRef} // ScrollView 참조 추가
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })} // 자동 스크롤
          contentContainerStyle={styles.messages}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={msg.role === 'user' ? styles.UsermessageText : styles.AssistantmessageText}>
                {msg.content}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          ref={refText}
          value={text}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendChat} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",//'#f5f5f5',
  },
  chatContainer: {
    flex: 10,
    padding: 10,
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: "#FFFFFF",//'#e0e0e0',
  },
  UsermessageText: {
    color: 'white',
    fontSize: 16,
  },
  AssistantmessageText: {
    color: "#000000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
