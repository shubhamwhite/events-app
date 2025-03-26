const express = require('express');
const { createContact, getContact } = require('../controllers/contact.controller');
const router = express.Router();

// Update item without ID in the URL

router.post('/dashboard/contact/create', createContact);
router.get('/dashboard/contact/get', getContact);

module.exports = router;