const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Easy-Mongoo instead of MySQL
const mongoo = require('easy-mongoo');

const contactsRouter = require('./routes/contacts');
const uploadsRouter = require('./routes/uploads');
const galleryRoutes = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection with Easy-Mongoo
const connectDB = async () => {
  try {
    await mongoo.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rbr_events');
    console.log('Connected to MongoDB with Easy-Mongoo');
    
    // Create models
    mongoo.model('Contact', {
      name: 'string!',
      email: 'email',
      phone: 'string!',
      serviceType: 'string?',
      message: 'string?',
      eventDate: 'date?'
    });

    mongoo.model('Gallery', {
      imageUrl: 'string!',
      category: 'string?',
      uploadedAt: 'date+'
    });

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// ⭐ 1) CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://rbr-events.vercel.app",
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ⭐ 2) JSON PARSER
app.use(express.json());

// ⭐ 3) STATIC FOLDERS
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⭐ 4) ROUTES
app.use('/api/contacts', contactsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/gallery', galleryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send({ 
    status: 'RBR Events backend running',
    database: 'MongoDB with Easy-Mongoo'
  });
});

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;