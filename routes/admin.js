const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.use("/add-product", productsController.addProcuts)
router.post("/product", (req, res) => {
    console.log(`Title is ${req.body.title} and size is ${req.body.size}`);
    res.redirect('/')
})

module.exports = router;