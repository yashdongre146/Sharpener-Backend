const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.showProducts = (req, res) => {
    Product.fetchAll(products=>{
        console.log(products);
        res.sendFile(path.join(rootDir , 'views', 'shop.html'))
    });
}
exports.handleDynamicRoute = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{
        console.log(product);
    })
    res.redirect('/')
}

exports.addProcuts = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}
exports.productAdded = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}
exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/');
}