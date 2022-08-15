// let mysql = require('mysql');
// require("dotenv").config({ path: "./config.env" });

// // environment variables present in config.env, set up your own!
// async function connect() {
//   let connection = mysql.createConnection({
//     host: process.env.host,
//     port: process.env.port,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database
//   });
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

//   connection.query("INSERT INTO ADMINS(username, password) VALUES('admin1', '9026040An!')", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// }

// connect()

const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "homeservices", // update me
      password: "9026040An!" // update me
    },
    type: "default"
  },
  server: "home-services.database.windows.net", // update me
  options: {
    database: "home_services", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("connected to azure!")
  }
});

connection.connect();