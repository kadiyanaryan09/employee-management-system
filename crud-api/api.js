const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'
});

db.connect((err) => {
    if (err) {
        console.log("DB connection error:", err);
        throw err;
    }
    console.log("MySQL connected");
});

module.exports = db;
