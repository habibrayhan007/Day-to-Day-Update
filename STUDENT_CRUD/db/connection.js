const mysql = require('mysql');
const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "student_mentorship2"
})

connection.connect((err) => {
    if(!err){
        console.log("connected");
    }
    else{
        console.log(err);
    }
});

module.exports = connection;