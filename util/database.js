const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "Clashofclans@02"
})

module.exports = pool.promise();