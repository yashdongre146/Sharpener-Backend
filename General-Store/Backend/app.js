const path = require('path');

const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');

const sequelize = require('./util/database')
const errorController = require('./controllers/error');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin')

const  app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.use('/admin', adminRoutes)

app.use(errorController.getError);

sequelize.sync()
.then(()=> app.listen(3000))
.catch(err => console.log(err));

