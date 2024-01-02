const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');


function generateToken(id){
    return jwt.sign(id, 'secretKey')
}
exports.signup =  (req, res) => {
   try {
        const {name, email, password} = req.body;
        bcryptjs.hash(password, 10, async (err, hash)=>{
            const user = await User.create({name, email, password: hash});
            res.json(user);
        })
    } catch (err) {
            res.status(400).json();
    }
}
exports.login = (req, res) => {
    User.findAll({where: {email : req.body.email}}).then((user)=>{
        if (user.length > 0) {
            bcryptjs.compare(req.body.password, user[0].password, (err, resp)=>{
                if (!err) {
                    res.json({token: generateToken(user[0].id)});
                } else {
                    res.status(401).json();
                }
            })
        } else {
            res.status(401).json()
        }

    })

}