const express = require("express");
const router = express.Router();
const mongoo = require("../db");

// ===============================
// POST Contact Form (save to MongoDB)
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, eventDate } = req.body;

    const contact = await mongoo.create('Contact', {
      name,
      email,
      phone,
      serviceType,
      message,
      eventDate: eventDate ? new Date(eventDate) : null
    });

    res.json({ success: true, id: contact._id });
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

    const contacts = await mongoo.find('Contact', {}, {
      sort: { createdAt: -1 }
    });

    res.json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}); 
  module.exports = router;