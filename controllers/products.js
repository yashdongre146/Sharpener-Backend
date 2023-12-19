const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.showProducts = (req, res) => {
    Product.findAll().then((products)=>{
        res.sendFile(path.join(rootDir , 'views', 'shop.html'))
    }).catch((err)=>{console.log(err);})
}
exports.handleDynamicRoute = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId).then((product)=>{
        console.log(product);
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
    Product.findByPk(req.body.productId).then(product=>{
        product.title = updatedTitle;
        product.price = Math.floor(Math.random() * 100) + 1;
        return product.save();
    }).then(()=>{
        res.redirect('/')
    }
    ).catch(err=>console.log(err))
}
exports.deleteProduct = (req, res) => {
    Product.destroy({where: {id: req.params.productId}});
    res.redirect('/')
}
exports.productAdded = (req, res) => {
    Product.create({
        title: req.body.title,
        price: Math.floor(Math.random() * 100) + 1
    }).then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err))    
}
exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product)=>{
        Cart.addProduct(prodId, product.price)
        res.redirect('/');
    })
}