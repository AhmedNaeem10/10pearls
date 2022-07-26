let mysql = require('mysql');
require("dotenv").config({ path: "./config.env" });

// environment variables present in config.env, set up your own!
exports.connect = () => {
  let connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });
  return connection;
}