const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get("/", productsController.showProducts)
router.post("/products/:productId", productsController.handleDynamicRoute)
router.post("/cart", productsController.postCart)

module.exports = router;
