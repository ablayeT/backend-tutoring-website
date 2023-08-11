const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contact');

// GET tous les contacts
router.get('/', contactsController.getAllContacts);

// POST pour créer un nouveau contact
router.post('/', contactsController.createContact);

module.exports = router;
