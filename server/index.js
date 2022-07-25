const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const app = express();
const db = require('./db/conn');
const routes = require("./controllers/routes")(app);
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors()); 
app.use(express.json());                          // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));  // parse requests of content-type - application/x-www-form-urlencoded


// // routes
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Home Services Web application." });
// });

// app.get("/admin", (req, res) => {
//   // res.json({ message: "Hello from server." });
//   db.query("SELECT * from admin", (err,rows,fields) => {
//     if (!err)
//       res.send(rows);
//     else
//       console.log(err);

//   });
// });


// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



