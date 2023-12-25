const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const USER = sequelize.define('mystore',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    itemName:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull:false,
    },
    quantity:{
        type: Sequelize.DOUBLE,
        allowNull:false,
    },
});

module.exports = USER