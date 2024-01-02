const User = require('../models/user')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth');
    const id = jwt.verify(token, 'secretKey');
    User.findByPk(id).then((user)=>{
        req.user = user;
        next();
    })
}

module.exports = {auth};