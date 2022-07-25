let mysql = require('mysql');
require("dotenv").config({ path: "./config.env" });

exports.connect = () => {
  let connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });
  return connection;
}