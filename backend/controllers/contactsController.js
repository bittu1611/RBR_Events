const pool = require('../db');
require('dotenv').config();

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, eventDate } = req.body;
    if (!name || !phone)
      return res.status(400).json({ error: 'Name & phone required' });
    const [r] = await pool.execute(
      'INSERT INTO contacts (name,email,phone,service_type,message,event_date,created_at) VALUES (?,?,?,?,?,?,NOW())',
      [name, email || '', phone, serviceType || '', message || '', eventDate || null]
    );
    res.json({ success: true, id: r.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const pass = req.headers['x-admin-pass'] || req.query.adminPass;
    if (pass !== process.env.ADMIN_PASSWORD)
      return res.status(401).json({ error: 'Unauthorized' });
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};
