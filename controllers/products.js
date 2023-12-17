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
exports.editProduct = (req, res) => {
    const editMode = req.query.edit;
    if (editMode) {
        res.sendFile(path.join(rootDir, 'views', 'edit-product.html'))
    }
}
exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedProduct = new Product(prodId, updatedTitle);
    updatedProduct.save();
    res.redirect("/")
}
exports.productAdded = (req, res) => {
    const product = new Product(null, req.body.title);
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