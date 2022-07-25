let mysql = require('mysql');
require("dotenv").config({ path: "./config.env" });

exports.connect = () => {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'home_services'
  });
  return connection;
}