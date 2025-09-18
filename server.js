import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());

// Serve static files from root
app.use(express.static(path.join(process.cwd())));

// SASSA proxy endpoint
app.get('/sassa', async (req, res) => {
  const saId = req.query.saId;
  if (!saId) return res.status(400).json({error:'Missing SA ID'});

  try {
    const response = await fetch('https://srd.sassa.gov.za/srdweb/api/web/outcome', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({idnumber: saId})
    });
    const data = await response.json();
    res.json(data);
  } catch(err){
    res.status(500).json({error:err.message});
  }
});

// Serve HTML as default
app.get('/', (req,res)=> res.sendFile(path.join(process.cwd(), 'sa-id-ocr.html')));

app.listen(process.env.PORT || 3000, ()=>console.log('Server running'));
