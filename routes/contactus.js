const express = require('express');
const path = require('path');
const rootDir = require('../util/path');


const router = express.Router();

router.get('/contactus', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'))
})

router.post('/success', (req, res) => {
    res.send("<h1>Form successfuly filled</h1>");
})

module.exports = router;