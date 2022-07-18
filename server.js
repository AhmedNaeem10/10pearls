const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const adminController = require('./controllers/admin');
const userController = require('./controllers/user')

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.post('/adminLogin', adminController.login);
app.post('/adminRegister', adminController.register);
app.post('/userLogin', userController.login);
app.post('/userRegister', userController.register);
