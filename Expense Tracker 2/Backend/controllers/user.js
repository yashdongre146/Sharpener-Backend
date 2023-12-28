const User = require('../models/user')

exports.addUser = async (req, res) => {
   try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
            res.status(400).json("Email must be unique");
    }
}