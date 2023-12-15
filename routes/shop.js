const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get("/", productsController.showProducts)
router.get("/products/:productId", productsController.handleDynamicRoute)

module.exports = router;
