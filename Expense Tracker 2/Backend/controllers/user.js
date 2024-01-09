const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');


function generateToken(id, name, isPremiumUser){
    return jwt.sign({id, name, isPremiumUser}, 'secretKey')
}
exports.signup =  (req, res) => {
   try {
        const {name, email, password} = req.body;
        bcryptjs.hash(password, 10, async (err, hash)=>{
            const user = await User.create({name, email, password: hash, totalAmount: 0});
            res.json(user);
        })
    } catch (err) {
            res.status(400).json();
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findAll({where: {email : req.body.email}})
        if (user.length > 0) {
            bcryptjs.compare(req.body.password, user[0].password, (err, resp)=>{
                if (!err) {
                    res.json({token: generateToken(user[0].id, user[0].name, user[0].isPremiumUser)});
                } else {
                    res.status(401).json();
                }
            })
        } else {
            res.status(401).json()
        }
    } catch (err) {
        res.status(500).json();
    }
}

exports.generateToken = generateToken;