const Razorpay = require('razorpay');
const Order = require('../models/order');

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
}

exports.updateTransactionStatus = (req, res)=>{
    const {payment_id, order_id} = req.body;
    Order.findOne({where: {orderId: order_id}}).then(order=>{
        order.update({paymentId: payment_id, status: 'SUCCESSFUL'}).then(()=>{
            req.user.update({isPremiumUser: true}).then(()=>{
                return res.json({sucess: true, message: "Transaction Successful"});
            })
        })
    })
}