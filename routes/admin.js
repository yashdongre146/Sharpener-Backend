const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.use("/add-product", productsController.addProcuts)

router.post("/product", productsController.productAdded)
router.post("/edit-product/:productId", productsController.editProduct)
router.post("/edit-product", productsController.postEditProduct)
router.post("/delete-product/:productId", productsController.deleteProduct)

module.exports = router;