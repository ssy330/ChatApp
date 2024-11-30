require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const apiKey = process.env.OPENAPI_KEY2;
const API_URL = "https://api.openai.com/v1/chat/completions";

const app = express();
app.use(bodyParser.json());

async function llm(systemMessage, messages) {
  const response = await axios.post(
    API_URL,
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage }, // 전달받은 character.personality 정보 추가
        ...messages,
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.choices[0].message.content;
}

// POST endpoint for handling messages
app.post('/chat', async (req, res) => {
  const { messages, character } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).send({ error: "Invalid messages format" });
  }

  if (!character || !character.personality) {
    return res.status(400).send({ error: "Character personality is required" });
  }

  const systemMessage = `Character Personality: ${character.personality}`;

  try {
    const response = await llm(systemMessage, messages);
    res.send({ response });
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.response?.data || error.message);
    res.status(500).send({ error: "Failed to fetch response from OpenAI" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
