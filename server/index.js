const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require('axios');

const client_id = 'tioFMI_bJPIwRfinJ_Gk';
const client_secret = 'dD7R5xiuRi';

app.use(express.static(path.join(__dirname,"../build")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../build/index.html'));
});

app.get('/api', async (req, res) => {
  const page = req.query.page;
  const query = req.query.query;
  try {
    const resp = await axios.get('https://openapi.naver.com/v1/search/movie.json', {
      params: {
        query: query,
        display: 12,
        start: page
      },
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    });
    if(resp && resp.status === 200){
      const { data } = resp;
      console.log(data);
      return res.json(data);
    }
  } catch (error) {
    return res.json(error);
  }
})

app.listen(port, ()=> {
  console.log(`서버: ${port}`)
});