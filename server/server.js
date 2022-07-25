const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 5000;
app.use(cors());
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");
const adminController = require('./controllers/admin');
const userController = require('./controllers/user')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.post('/adminLogin', adminController.login);
app.post('/adminRegister', adminController.register);
app.post('/userLogin', userController.login);
app.post('/userRegister', userController.register);
