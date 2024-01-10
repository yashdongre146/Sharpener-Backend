const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');


function generateToken(id, name, isPremiumUser){
    return jwt.sign({id, name, isPremiumUser}, 'secretKey')
}

function generatePassword() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    let password = "";
  
    for (let i = 0; i < length; ++i) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
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
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.forgotEmail } });
        if (user) {
            // if email found in the db.
            const newPassword = generatePassword();

            // updating password in db along with bcryption
            const hash = await bcryptjs.hash(newPassword, 10);
            await user.update({ password: hash });

            const { forgotEmail } = req.body;
            const client = Sib.ApiClient.instance;

            const apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.SIB_KEY;

            const tranEmailApi = new Sib.TransactionalEmailsApi();

            const sender = {
                email: 'expensetracker@gmail.com'
            };
            const receivers = [
                {
                    email: forgotEmail,
                }
            ];

            await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Reset your password',
                textContent: `Your new password is ${newPassword}`,
            });
            res.json();
        } else {
            res.status(401).json();
        }
    } catch (err) {
        res.status(500).json();
    }
};

exports.generateToken = generateToken;