const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require('path');
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

const db = require("./model");
db.sequelize.sync();

// get driver connection
// const dbo = require("./db/conn");
const adminController = require('./controllers/admin');
const userController = require('./controllers/user')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// admin usecases
app.post('/adminLogin', adminController.login);
app.post('/adminRegister', adminController.register);
app.post('/registerWorker', adminController.register_worker);
app.post('/addSkill', adminController.add_skill);
app.put('/adminChangePassword/:username/:password', adminController.change_pasword);
app.get('/getRequests', adminController.get_requests);

// customer usecases
app.post('/userLogin', userController.login);
app.post('/userRegister', userController.register);
app.post('/updateCNIC/:userid', userController.update_cnic);


// orm testing
app.get('/', (req, res)=>{
  const TEST = require(path.join(__dirname, 'model/test'))(db.sequelize, db.Sequelize)
  res.send(TEST.findAll)
})

app.post('/', (req, res)=>{
  const TEST = require(path.join(__dirname, 'model/test'))(db.sequelize, db.Sequelize)
  const test = req.body;
  console.log(test)
  TEST.create(test)
  res.send("done")
})