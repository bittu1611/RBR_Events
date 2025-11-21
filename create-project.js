const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart());
}

console.log("🚀 Creating RBR Events Project Structure...");

/* ========= BACKEND ========= */
write('backend/package.json', `
{
  "name": "rbr-events-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "mysql2": "^3.2.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
`);

write('backend/.env', `
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rbr_events_db
ADMIN_PASSWORD=admin123
`);

write('backend/db.js', `
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
`);

write('backend/server.js', `
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contacts = require('./routes/contacts');
const uploads = require('./routes/uploads');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contacts', contacts);
app.use('/api/uploads', uploads);

app.get('/', (req, res) => res.send({ status: 'RBR backend running' }));

app.listen(process.env.PORT || 5000, () =>
  console.log('✅ Server running on port', process.env.PORT || 5000)
);
`);

write('backend/routes/contacts.js', `
const express = require('express');
const router = express.Router();
const c = require('../controllers/contactsController');

router.post('/', c.createContact);
router.get('/', c.getAllContacts);

module.exports = router;
`);

write('backend/routes/uploads.js', `
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const storage = multer.diskStorage({
  destination: (r, f, cb) => cb(null, dir),
  filename: (r, f, cb) =>
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(f.originalname))
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: '/uploads/' + req.file.filename });
});

module.exports = router;
`);

write('backend/controllers/contactsController.js', `
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
`);

/* ========= FRONTEND ========= */

write('frontend/package.json', `
{
  "name": "rbr-events-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
`);

write('frontend/public/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RBR Events</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`);

write('frontend/src/index.js', `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`);

write('frontend/src/App.js', `
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
`);

write('frontend/src/api.js', `
import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });
export default API;
`);

const simplePage = (name) => `
import React from "react";
export default function ${name}() {
  return <div style={{padding: "2rem"}}><h2>${name} Page</h2></div>;
}
`;

["Home", "Services", "Gallery", "About", "Contact", "Admin"].forEach((p) => {
  write(`frontend/src/pages/${p}.js`, simplePage(p));
});

write('frontend/src/components/Navbar.js', `
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", padding: "1rem" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
      <Link to="/services" style={{ color: "#fff", marginRight: "10px" }}>Services</Link>
      <Link to="/gallery" style={{ color: "#fff", marginRight: "10px" }}>Gallery</Link>
      <Link to="/about" style={{ color: "#fff", marginRight: "10px" }}>About</Link>
      <Link to="/contact" style={{ color: "#fff", marginRight: "10px" }}>Contact</Link>
      <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>
    </nav>
  );
}
`);

write('frontend/src/components/Footer.js', `
import React from "react";
export default function Footer() {
  return (
    <footer style={{ background: "#111", color: "#fff", padding: "1rem", textAlign: "center" }}>
      <p>© 2025 RBR Events. All rights reserved.</p>
    </footer>
  );
}
`);

write('README.md', `
# 🎉 RBR Events Fullstack Project

This project contains both frontend (React) and backend (Express + MySQL).

## 📂 Structure
rbr-events/
├─ backend/
├─ frontend/
└─ README.md

Run backend:
  cd backend
  npm install
  npm run dev

Run frontend:
  cd frontend
  npm install
  npm start
`);

console.log("✅ Full RBR Events project structure created successfully!");
