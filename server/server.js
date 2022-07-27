const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require('path');
const middleware = require('./middleware');

const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

// app.use(middleware.decodeToken);

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
app.post('/updateCustomer/:userid', userController.update_customer);
app.post('/viewServices', userController.get_services);
app.post('/requestService/:userid', userController.request_service);
app.post('/cancelRequest/:requestid', userController.cancel_request);


// orm testing
app.get('/',async (req, res)=>{
  const TEST = require(path.join(__dirname, 'model/test'))(db.sequelize, db.Sequelize)
  res.send(await TEST.findAll())
});

app.post('/', async (req, res)=>{
  const SD = require(path.join(__dirname, 'model/review'))(db.sequelize, db.Sequelize)
  let result = await SD.findAll();
  res.send(result)
});