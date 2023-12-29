const User = require('../models/user')

exports.addUser = async (req, res) => {
   try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
            res.status(400).json();
    }
}
exports.checkUser = (req, res) => {
    User.findAll({where: {email : req.params.emailId}}).then((user)=>{
        if (user.length > 0) {
            if(user[0].dataValues.password === req.params.password){
                res.json(user);
            }
            else{
                res.status(401).json();
            }
        } else {
            res.status(401).json()
        }

    })
}