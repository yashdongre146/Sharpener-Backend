const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');


exports.showProducts = (req, res) => {
    Product.fetchAll(products=>{
        console.log(products);
        res.sendFile(path.join(rootDir , 'views', 'shop.html'))
    });
    
}

exports.addProcuts = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}
exports.productAdded = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}