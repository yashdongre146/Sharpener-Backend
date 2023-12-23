const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const path = require('path');

const app = express();

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRoutes);

app.use("/", (req, res)=>{
    res.send("<h1>Page Not Exists</h1>")
})

app.listen(4000);



