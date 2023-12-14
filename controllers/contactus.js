const path = require('path');
const rootDir = require('../util/path');

exports.showContactForm = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'))
}

exports.success = (req, res) => {
    res.send("<h1>Form successfuly filled</h1>");
}