const User = require('../models/user')

exports.postUser = (req,res)=> {
    User.create(req.body)
    .then((user)=> {
        res.json(user);
    })
    .catch((err)=> console.log(err))
}