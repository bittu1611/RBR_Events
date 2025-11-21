const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../db");

// upload folder
const uploadDir = path.join(__dirname, "../uploads");

// multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});

const upload = multer({ storage });

// ========================
// GET all gallery images
// ========================
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gallery ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ========================
// UPLOAD image + save to DB
// ========================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const category = req.body.category || "Other";
    const imageUrl = "/uploads/" + req.file.filename;

    const [result] = await pool.query(
      "INSERT INTO gallery (image_url, category) VALUES (?, ?)",
      [imageUrl, category]
    );

    res.json({
      id: result.insertId,
      image_url: imageUrl,
      category: category
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

    await pool.query("DELETE FROM gallery WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
