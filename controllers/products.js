const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.showProducts = (req, res) => {
    Product.fetchAll().then(([row, col])=>{
        console.log(row)
        res.sendFile(path.join(rootDir , 'views', 'shop.html'))
    }).catch((err)=>{console.log(err);})
}
exports.handleDynamicRoute = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(([product])=>{
        console.log(product[0]);
        res.redirect('/')
    })
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
    const updatedTitle = req.body.title;
    const updatedProduct = new Product(updatedTitle);
    updatedProduct.save().then(()=>{
        res.redirect('/');
    });
}
exports.deleteProduct = (req, res) => {
    Product.deleteProduct(req.params.productId);
    res.redirect('/')
}
exports.productAdded = (req, res) => {
    const product = new Product(req.body.title);
    product.save().then(()=>{
        res.redirect('/');
    });
}
exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(()=>{
        Cart.addProduct(prodId, product.price)
        res.redirect('/');
    })
}