const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactsRouter = require('./routes/contacts');
const uploadsRouter = require('./routes/uploads');
const galleryRoutes = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 5000;

// ⭐ 1) SABSE PEHLE CORS LAGAO
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://rbr-events-pe9d.vercel.app",  // <-- Vercel frontend URL
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ⭐ 2) JSON PARSER PEHLE
app.use(express.json());

// ⭐ 3) STATIC FOLDERS pehle lagao
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⭐ 4) AB ROUTES LAGAO (BAAD ME)
app.use('/api/contacts', contactsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/gallery', galleryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send({ status: 'RBR Events backend running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
