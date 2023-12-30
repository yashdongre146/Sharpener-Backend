const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const sequelize = require('./util/database')
const cors = require('cors')


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expenseRoutes);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch(err=>console.log(err))
