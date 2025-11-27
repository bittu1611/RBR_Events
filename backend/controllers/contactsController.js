const mongoo = require('../db');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, eventDate } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name & phone required' });
    }

    const contact = await mongoo.create('Contact', {
      name,
      email: email || '',
      phone,
      serviceType: serviceType || '',
      message: message || '',
      eventDate: eventDate ? new Date(eventDate) : null
    });

    res.json({ success: true, id: contact._id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const pass = req.headers['x-admin-pass'] || req.query.adminPass;
    
    if (pass !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const contacts = await mongoo.find('Contact', {}, {
      sort: { createdAt: -1 }
    });

    res.json(contacts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};