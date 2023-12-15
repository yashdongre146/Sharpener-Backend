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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products)=>{// when this callback resolves then
      products.push(this); // this code will execute
      fs.writeFile(p, JSON.stringify(products), err => console.log(err))
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};