const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const COMPANY_API_KEY = 'app-9iqdLrxUu7tGS3BP9fz4xqqc';
const COMPANY_API_URL = 'https://gateway.ax.gsretail.com/ext/v1';

app.use(cors());
app.use(express.json());

app.post('/recommend', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(COMPANY_API_URL, {
      prompt: message
    }, {
      headers: {
        'Authorization': `Bearer ${COMPANY_API_KEY}`
      }
    });

    res.json({ result: response.data.result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'AI 호출 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
