const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup)
router.get('/login/:emailId/:password', userController.login)

module.exports = router;