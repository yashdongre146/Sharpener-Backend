const User = require('../models/user')

exports.addUser = (req, res) => {
    User.create(req.body).then((user)=>{
        res.json(user)
    })
}