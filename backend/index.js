// Backend: routes/identify.js

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(cors());
// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// PlantNet API configuration
const PROJECT = 'all';
const API_URL = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=`;
const API_PRIVATE_KEY = process.env.PLANTNET_API_KEY || '2b10BUIBp2LV2D8HOBreTbj7';
const API_SIMSEARCH = '&include-related-images=true';
const API_LANG = '&lang=en';

/**
 * POST /api/identify
 * Expects form-data with a single file field named "image"
 */
app.post('/identify', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Prepare PlantNet request
    const form = new FormData();
    form.append('organs', 'leaf');
    form.append('images', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      API_URL + API_PRIVATE_KEY + API_SIMSEARCH + API_LANG,
      form,
      { headers: form.getHeaders() }
    );

    const { results } = response.data;
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No species found' });
    }

    const topResult = results[0];
    const { scientificName } = topResult.species;
    const confidence = Math.round(topResult.score * 100);
    const xpEarned = Math.round(topResult.score * 10);

    return res.json({
      species: scientificName,
      commonNames: topResult.species.commonNames || [],
      confidence,
      xpEarned,
      raw: topResult
    });
  } catch (error) {
    console.error('Identification error:', error.message);
    return res.status(500).json({ error: 'Identification failed' });
  }
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})