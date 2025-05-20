// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// allow your frontend origin
app.use(cors({ origin: 'http://localhost:5500' }));

// serve static files (your HTML/CSS/JS)
app.use(express.static('C:\\Users\\Lars\\Documents\\GitHub\\ONF-fullstack-dev\\frontend_exam'));

// endpoint to retrieve the maps key
app.get('/api/maps-key', (req, res) => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return res.status(500).json({ error: 'API key not configured.' });
  }
  res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
