const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const User = require('./models/user')
const Expense = require('./models/expense')
const sequelize = require('./util/database')
const cors = require('cors')
const Order = require('./models/order')
const ForgotPassword = require('./models/forgotPassword')
const DownloadedFile = require('./models/DownloadedFile')
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);
User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch(err=>console.log(err))
