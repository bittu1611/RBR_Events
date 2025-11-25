const express = require("express");
const router = express.Router();
const pool = require("../db");

// ===============================
// POST Contact Form (save to DB)
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, eventDate } = req.body;

    const [result] = await pool.query(
      "INSERT INTO contacts (name, email, phone, service_type, message, event_date) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, serviceType, message, eventDate]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database insert error" });
  }
});

// ===============================
// GET Contacts (Admin Only)
// ===============================
router.get("/", async (req, res) => {
  try {
    const { adminPass } = req.query;

    // Admin Password Verification
    if (adminPass !== "rbr@admin123") {
      return res.status(401).json({ error: "Invalid admin password" });
    }

    const [rows] = await pool.query("SELECT * FROM contacts ORDER BY id DESC");

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router;
