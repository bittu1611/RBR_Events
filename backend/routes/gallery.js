const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoo = require("../db");

// Upload folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ========================
// GET all gallery images
// ========================
router.get("/", async (req, res) => {
  try {
    const images = await mongoo.find('Gallery', {}, {
      sort: { uploadedAt: -1 }
    });
    
    res.json(images);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ========================
// UPLOAD image + save to MongoDB
// ========================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const category = req.body.category || "Other";
    const imageUrl = "/uploads/" + req.file.filename;

    const image = await mongoo.create('Gallery', {
      imageUrl,
      category,
      uploadedAt: new Date()
    });

    res.json({
      id: image._id,
      image_url: imageUrl,
      category: category,
      uploadedAt: image.uploadedAt
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ========================
// Delete an image
// ========================
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Delete from database
    await mongoo.deleteById('Gallery', id);
    
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(400).json({ error: error.message });
});

module.exports = router;