const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "servicesdb",
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});

module.exports = db;