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

//const API_KEY = "";

const BASE_PROMPT = `
당신은 지금부터 지정된 캐릭터로서 행동하고 말하시오. 
캐릭터의 성격, 배경, 말투를 철저히 반영해야 하며 행동은 괄호를 통해 표현할 수 있습니다. 
캐릭터의 성격은 다음과 같습니다: {characterPrompt}.
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
              <Text style={styles.messageText}>
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
    backgroundColor: '#f5f5f5',
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
    marginVertical: 5,
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
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    color: 'white',
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
