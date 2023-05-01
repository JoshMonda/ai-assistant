import axios from 'axios';

const openaiAPI = async (text) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  const data = {
    prompt: `Generate ideas and suggestions for the following text:\n${text}`,
    max_tokens: 50,
    n: 3,
    stop: null,
    temperature: 1.0,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      data,
      { headers }
    );

    return response.data.choices.map((choice) => choice.text.trim());
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default openaiAPI;
