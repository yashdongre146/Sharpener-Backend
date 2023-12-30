const User = require('../models/user')
const bcryptjs = require('bcryptjs')

exports.addUser =  (req, res) => {
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
exports.checkUser = (req, res) => {
    User.findAll({where: {email : req.params.emailId}}).then((user)=>{
        if (user.length > 0) {
            bcryptjs.compare(req.params.password, user[0].dataValues.password, (err, resp)=>{
                if (!err) {
                    res.json(user);
                } else {
                    res.status(401).json();
                }
            })
        } else {
            res.status(401).json()
        }

    })

}