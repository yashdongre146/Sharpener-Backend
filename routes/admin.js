const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

router.use("/add-product", (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})
router.post("/product", (req, res) => {
    console.log(`Title is ${req.body.title} and size is ${req.body.size}`);
    res.redirect('/')
})

module.exports = router;