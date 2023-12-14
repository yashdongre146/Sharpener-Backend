const path = require('path');
const rootDir = require('../util/path');

exports.showProducts = (req, res) => {
    res.sendFile(path.join(rootDir , 'views', 'shop.html'))
}

exports.addProcuts = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}