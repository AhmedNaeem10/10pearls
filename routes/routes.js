const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const userController = require('../controllers/user')
const workerController = require('../controllers/worker')
const jobController = require('../controllers/job')
const serviceController = require('../controllers/service');
const reviewController = require('../controllers/review')

// admin usecases
router.post('/adminLogin', adminController.login);
router.post('/adminRegister', adminController.register);
router.post('/workerRegister', adminController.register_worker);
router.post('/addSkill', adminController.add_skill);
router.put('/adminChangePassword/:username/:password', adminController.change_pasword);
router.get('/getServices', serviceController.get_services);
router.get('/checkService/:service', serviceController.check_service);
router.put('/editService/:id', serviceController.edit_service)
router.delete('/deleteService/:id', serviceController.delete_service)
router.post('/addService', serviceController.add_service)
router.put('/updateJobStatus/:id/:status', jobController.update_status);
router.get('/getJobsByStatus/:status', jobController.get_jobs);
router.get('/getJobsDetailsByStatus/:status', jobController.get_jobs_details);


// customer usecases
router.post('/userLogin', userController.login);
router.post('/userRegister', userController.register);
router.post('/updateCustomer/:userid', userController.update_customer);
router.post('/viewServices', userController.get_services);
router.post('/requestJob', jobController.request_job);
router.post('/cancelRequest/:requestid', userController.cancel_request);
router.post('/getUsernames', userController.get_usernames);
router.post('/getEmails', userController.get_emails);
router.get('/getJobsForCustomer/:id/:status', jobController.get_jobs_for_customer);
//   ****  new  ****
router.get('/getJobsForCustomer/:id', jobController.get_jobs_for_customer_by_id)
router.post('/review', reviewController.give_review);
router.post('/request', jobController.request);
//   ****  new  ****
router.get('/customer/:id', userController.getCustomer);

// worker usecases
router.get('/workers', workerController.get_workers);
router.get('/worker/:id', workerController.get_worker_by_id)
router.get('/getWorkerFeedbacks/:id', workerController.get_worker_feedback)
router.get('/workersFullDetailsBySkill/:id', workerController.get_workers_full_details_by_skill)
router.get('/workersBasicDetailsBySkill/:id', workerController.get_workers_basic_details_by_skill)
router.get('/workersByAvailability', workerController.get_worker_by_availability)
router.get('/workerDetails/:id', workerController.get_worker_details)
router.get('/updateWorker/:id', workerController.update_worker)
router.put('/switchAvailability/:id', workerController.switch_availability);
//   ****  new  ****
router.get('/getCustomerId/:email', userController.getId);

router.post('/upload', jobController.check)

module.exports = router;