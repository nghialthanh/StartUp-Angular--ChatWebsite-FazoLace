var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const ConnectDB = mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database ,
    connectionLimit:10,
    queueLimit: 0,
    waitForConnection: true
});

module.exports= ConnectDB;

