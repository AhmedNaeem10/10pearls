const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const middleware = require('../middleware');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());


const adminController = require('../controllers/admin');
const userController = require('../controllers/user')
const workerController = require('../controllers/worker')
const jobController = require('../controllers/job')
const serviceController = require('../controllers/service');
const reviewController = require('../controllers/review')

// admin usecases
app.post('/adminLogin', adminController.login);
app.post('/adminRegister', adminController.register);
app.post('/workerRegister', adminController.register_worker);
app.post('/addSkill', adminController.add_skill);
app.put('/adminChangePassword/:username/:password', adminController.change_pasword);
app.get('/getServices', serviceController.get_services);
app.get('/checkService/:service', serviceController.check_service);
app.put('/editService/:id', serviceController.edit_service)
app.delete('/deleteService/:id', serviceController.delete_service)
app.post('/addService', serviceController.add_service)
app.put('/updateJobStatus/:id/:status', jobController.update_status);
app.get('/getJobsByStatus/:status', jobController.get_jobs);
app.get('/getJobsDetailsByStatus/:status', jobController.get_jobs_details);


// customer usecases
app.post('/userLogin', userController.login);
app.post('/userRegister', userController.register);
app.post('/updateCustomer/:userid', userController.update_customer);
app.post('/viewServices', userController.get_services);
app.post('/requestJob', jobController.request_job);
app.post('/cancelRequest/:requestid', userController.cancel_request);
app.post('/getUsernames', userController.get_usernames);
app.post('/getEmails', userController.get_emails);
app.get('/getJobsForCustomer/:id/:status', jobController.get_jobs_for_customer);
//   ****  new  ****
app.get('/getJobsForCustomer/:id', jobController.get_jobs_for_customer_by_id)
app.post('/review', reviewController.give_review);
app.post('/request', jobController.request);
//   ****  new  ****
app.get('/customer/:id', userController.getCustomer);

// worker usecases
app.get('/workers', workerController.get_workers);
app.get('/worker/:id', workerController.get_worker_by_id)
app.get('/getWorkerFeedbacks/:id', workerController.get_worker_feedback)
app.get('/workersFullDetailsBySkill/:id', workerController.get_workers_full_details_by_skill)
app.get('/workersBasicDetailsBySkill/:id', workerController.get_workers_basic_details_by_skill)
app.get('/workersByAvailability', workerController.get_worker_by_availability)
app.get('/workerDetails/:id', workerController.get_worker_details)
app.get('/updateWorker/:id', workerController.update_worker)
app.put('/switchAvailability/:id', workerController.switch_availability);
//   ****  new  ****
app.get('/getCustomerId/:email', userController.getId);

module.exports = app;