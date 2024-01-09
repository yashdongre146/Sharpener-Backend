const Razorpay = require('razorpay');
const Order = require('../models/order');
const userController = require('./user');
const User = require("../models/user");


exports.purchase = (req, res) => {
    var rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const amount = 2500;

    rzp.orders.create({amount, currency: 'INR'}, (err, order) =>{
        req.user.createOrder({orderId: order.id, status: 'PENDING'}).then(()=>{
            res.json({order, key_id: rzp.key_id})
        })
    })
};

exports.updateTransactionStatus = async (req, res) => {
    try {
      const { payment_id, order_id } = req.body;
  
      const order = await Order.findOne({ where: { orderId: order_id } });

      await order.update({ paymentId: payment_id, status: 'SUCCESSFUL' });
  
      await req.user.update({ isPremiumUser: true });
  
      const token = userController.generateToken(req.user.id, undefined, true);
  
      res.json({ success: true, message: "Transaction Successful", token: token });
    } catch (error) {
      res.status(500).json({ success: false, error: "An error occurred while updating transaction status" });
    }
};

exports.showLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json();
  }
};
  