const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use("/add-product", (req, res, next) => {
    res.send("<form action='/showOutput' method='POST'><input type='text' name='title'><input type='text' name='size'><button type='submit'>Add Product</button></form>")
})
app.post("/showOutput", (req, res, next) => {
    console.log(`Title is ${req.body.title} and size is ${req.body.size}`);
    res.redirect('/')
})
app.use("/", (req, res, next) => {
    res.send("<h1>Hello World!</h1>")
})

app.listen(4000);

