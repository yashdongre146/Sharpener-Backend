const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get("/", (req, res)=>{
    res.render('index')
})
router.use("/submit-username", (req, res)=>{
    const username = req.body.username;
    fs.readFile('./data/message.txt', 'utf-8', (err, message)=>{
        if (err) {
            console.log(err);
            return res.status(500).send('Error reading message');
        }

        res.render('message', { username, message});
    })
})
router.post("/submit-message/:username", (req, res)=>{
    const username = req.params.username;
    const message = req.body.message;
    const data = `${username}: ${message}`

    fs.appendFile('./data/message.txt', data, (err) => {
        if (err) {
          console.error('Error appending to file:', err);
        }
        else{
            res.redirect('/submit-username');
        }
      })
})

module.exports = router;