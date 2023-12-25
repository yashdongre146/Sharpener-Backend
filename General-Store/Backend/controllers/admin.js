const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
};

exports.decreaseQuantity = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((item) => {
      item.quantity = item.quantity - req.params.quantity;
      return item.save();
    })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
};
