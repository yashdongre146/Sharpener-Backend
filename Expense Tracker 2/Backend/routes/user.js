const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/addUser', userController.addUser)
router.get('/checkUser/:emailId/:password', userController.checkUser)

module.exports = router;