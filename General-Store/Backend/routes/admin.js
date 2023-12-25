const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/getUsers', adminController.getUsers);

router.post('/decreaseQuantity/:id/:quantity', adminController.decreaseQuantity)

module.exports = router;