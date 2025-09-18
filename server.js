import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/sassa', async (req, res) => {
  const saId = req.query.saId;
  if (!saId) return res.status(400).json({error:'Missing SA ID'});

  try {
    const response = await fetch('https://srd.sassa.gov.za/srdweb/api/web/outcome', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({idnumber: saId})
    });

    const data = await response.json();
    res.json(data);
  } catch(err){
    res.status(500).json({error:err.message});
  }
});

app.listen(3000, ()=>console.log('Proxy running on http://localhost:3000'));
