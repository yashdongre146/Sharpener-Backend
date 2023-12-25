const Sequelize = require('sequelize');

const sequelize = new Sequelize('general-store', 'root', 'Clashofclans@02', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;