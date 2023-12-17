const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent)=>{
      if (err) {
        cb([]);
      }else{
        cb(JSON.parse(fileContent));
      }
    })
}

module.exports = class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  save() {

    getProductsFromFile((products)=>{// when this callback resolves then
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => console.log(err))
      }
      else{
        this.id = Math.random().toString();
        this.price = Math.floor(Math.random() * 100) + 1;
        products.push(this); // this code will execute
        fs.writeFile(p, JSON.stringify(products), err => console.log(err))
      }
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product)
    });
  }
};
