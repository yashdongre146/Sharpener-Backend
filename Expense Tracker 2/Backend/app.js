const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const User = require('./models/user')
const Expense = require('./models/expense')
const sequelize = require('./util/database')
const cors = require('cors')


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch(err=>console.log(err))
