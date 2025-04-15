const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Replace with your key

app.post('/summarize', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use gpt-4-turbo if you have access
      messages: [{ role: "user", content: `Summarize this in 3 bullet points: ${text}` }],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "AI failed to summarize" });
  }
});

const PORT =  process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
