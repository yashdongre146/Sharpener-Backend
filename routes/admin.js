const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.use("/add-product", productsController.addProcuts)

router.post("/product", productsController.productAdded)

module.exports = router;