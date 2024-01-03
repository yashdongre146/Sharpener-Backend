const express = require('express');
const purchaseController = require('../controllers/purchase');
const userAuthentication = require('../middleware/auth')

const router = express.Router();

router.get('/purchase', userAuthentication.auth, purchaseController.purchase)
router.post('/updateTransactionStatus', userAuthentication.auth, purchaseController.updateTransactionStatus)

module.exports = router;