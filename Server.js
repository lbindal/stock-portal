const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS to allow your React app to make requests to this server
app.use(cors());

app.get('/api/stock-profile/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-fundamentals?region=US&symbol=${symbol}&lang=en-US&modules=assetProfile,summaryProfile,fundProfile`,
      {
        headers: {
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          'x-rapidapi-key': '2b18c060b4msh96fe6f181265de7p1f3807jsne30909930403',
          'User-Agent': 'PostmanRuntime/7.41.2',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }
    );
    console.log('Yahoo Finance API Response Status:', response.status);
    console.log('Yahoo Finance API Response Data:', JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error('Server Fetch Error (Profile):', error);
    console.error('Error Response:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});