const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Using Express for the first time.");
    next();
})
app.use((req, res, next) => {
    res.send("<h1>Hello World!</h1>")
})

app.listen(3000);

