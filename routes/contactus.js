const express = require('express');
const contactusController = require('../controllers/contactus');

const router = express.Router();

router.get('/contactus', contactusController.showContactForm)

router.post('/success', contactusController.success)

module.exports = router;