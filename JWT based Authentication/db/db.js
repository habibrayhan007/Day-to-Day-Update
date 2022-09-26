const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'authentication'
});

dbConnection.connect();

module.exports = dbConnection;