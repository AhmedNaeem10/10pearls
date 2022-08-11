let mysql = require('mysql');
require("dotenv").config({ path: "./config.env" });

// environment variables present in config.env, set up your own!
async function connect() {
  let connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query("INSERT INTO ADMINS(username, password) VALUES('admin1', '9026040An!')", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

connect()