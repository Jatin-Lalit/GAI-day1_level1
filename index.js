const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
require('dotenv').config(); 
const OPENAI_API_KEY = process.env.OPENAI_API_KE;

app.post('/', async (req, res) => {
  try {
    const userQuery = req.body.query;

    // Send the user's query to the OpenAI GPT API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: userQuery,
        max_tokens: 50, // Adjust the response length as needed
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      } 
    );

    const aiResponse = response.data.choices[0].text;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error status code:", error.response?.status);
  
  res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
