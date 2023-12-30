const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/addExpense', expenseController.addExpense)
router.get('/getExpense', expenseController.getExpense)
router.delete('/deleteExpense/:expenseId', expenseController.deleteExpense)

module.exports = router;