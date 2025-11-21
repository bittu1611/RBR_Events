const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');

// create contact/booking
router.post('/', controller.createContact);

// get all (admin)
router.get('/', controller.getAllContacts);

module.exports = router;
