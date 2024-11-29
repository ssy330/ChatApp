require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const apiKey = process.env.OPENAPI_KEY2;
const API_URL = "https://api.openai.com/v1/chat/completions";

const app = express();
app.use(bodyParser.json());

async function llm(messages) {
  const response = await axios.post(
    API_URL,
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", 
          content: "너는 지금부터 로봇으로써 나와 대화하는거야. 말 끝마다 '삐리리'를 붙여줘." },
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
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).send({ error: "Invalid messages format" });
  }

  try {
    const response = await llm(messages);
    res.send({ response });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch response from OpenAI" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
