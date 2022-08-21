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




/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The APIs for admin panel
  *  
  *   
  */



// admin usecases

/**
 * @swagger
 * /adminLogin:
 *   get:
 *     name: Login
 *     summary: Logs in an admin
 *     tags: [Admin]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *       200:
 *         description: Takes admin username and password as login credentials and verifies if they're correct
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *       400:
 *         description: Takes admin username and password as login credentials and verifies if they're correct
 *       404:
 *         description: Invalid username/password
 */
app.post('/adminLogin', adminController.login);


// app.post('/adminRegister', adminController.register);

/**
 * @swagger
 * /registerWorker:
 *   post:
 *     summary: Registers a worker to the portal
 *     tags: [Admin]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  dob:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  email:
 *                      type: string
 *                  cnic:
 *                      type: string
 *                  address:
 *                      type: string
 *     responses:
 *       200:
 *         description: Worker registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WORKERS'
 *       400:
 *         description: Couldn't register worker
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WORKERS'
 *        
 *    
 */
app.post('/registerWorker', adminController.register_worker);

/**
 * @swagger
 * /addSkill:
 *   post:
 *     summary: Add a new service to worker's offered services
 *     tags: [Admin]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *              type: object
 *              properties:
 *                  worker_id:
 *                      type: integer
 *                  service_name:
 *                      type: name
 *                  service_charges:
 *                      type: number
 *     responses:
 *       200:
 *         description: Service added successfully
 *       400:
 *         description: Couldn't add service for worker
 *        
 *    
 */

app.post('/addSkill', adminController.add_skill);

/**
 * @swagger
 * /adminChangePassword/{username}/{password}:
 *   put:
 *     summary: Update admin password
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *           description: Admin username 
 *           required: true
 *       - in: path
 *         name: password
 *         schema:
 *              type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Couldn't update password
 *        
 */


app.put('/adminChangePassword/:username/:password', adminController.change_pasword);

/**
 * @swagger
 * /getServices:
 *   get:
 *     summary: Retrieve all offered services
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SERVICES'
 */
app.get('/getServices', serviceController.get_services);




app.get('/checkService/:service', serviceController.check_service);

/**
 * @swagger
 * /editService/{id}:
 *   put:
 *     summary: Update a service 
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the service
 *         required: true
 *       - in: body
 *         name: body
 *         schema:
 *              type: object
 *              properties:
 *                  SERVICE_TITLE:
 *                      type: string
 *                  SERVICE_DESCRIPTION:
 *                      type: string
 *                  SERVICE_IMAGE:
 *                      type: string
 *                  SERVICE_RATE:
 *                      type: number
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Couldn't update service
 *        
 */
app.put('/editService/:id', serviceController.edit_service)

/**
 * @swagger
 * /deleteService/{id}:
 *   delete:
 *     summary: Delete a service 
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the service
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       400:
 *         description: Couldn't delete service
 *        
 */
app.delete('/deleteService/:id', serviceController.delete_service)



/**
 * @swagger
 * /addService:
 *   post:
 *     summary: Add a new service 
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *              type: object
 *              properties:
 *                  SERVICE_TITLE:
 *                      type: string
 *                  SERVICE_DESCRIPTION:
 *                      type: string
 *                  SERVICE_IMAGE:
 *                      type: string
 *                  SERVICE_RATE:
 *                      type: number
 *     responses:
 *       200:
 *         description: Service added successfully
 *       400:
 *         description: Couldn't add service
 *        
 */
app.post('/addService', serviceController.add_service)

/**
 * @swagger
 * /updateJobStatus/{id}/{status}:
 *   put:
 *     summary: Update status of a specific job 
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the service
 *         required: true
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         description: New status of the job
 *         required: true
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Couldn't update status of the job
 *        
 */
app.put('/updateJobStatus/:id/:status', jobController.update_status);

/**
 * @swagger
 * /getJobsByStatus/{status}:
 *   get:
 *     summary: Get job with the specified status
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the job
 *         required: true
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                    id:
 *                      type: integer
 *                    CUSTOMER_ID:
 *                      type: integer
 *                    SERVICE_DETAIL_ID:
 *                      type: integer
 *                    DATE_TIME:
 *                      type: string
 *                    PAYMENT_METHOD:
 *                      type: string
 *                    JOB_STATUS:
 *                      type: string
 *       400:
 *         description: Couldn't retrieve jobs
 *        
 */
app.get('/getJobsByStatus/:status', jobController.get_jobs);

/**
 * @swagger
 * /getJobsDetailsByStatus/{status}:
 *   get:
 *     summary: Get job details with the specified status
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the job
 *         required: true
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                    JOB_ID:
 *                      type: integer
 *                    CUSTOMER_NAME:
 *                      type: string
 *                    WORKER_NAME:
 *                      type: string
 *                    SERVICE_NAME:
 *                      type: string
 *                    DATE_TIME:
 *                      type: string
 *                    JOB_STATUS:
 *                      type: string
 *       400:
 *         description: Couldn't retrieve job details
 *        
 */
app.get('/getJobsDetailsByStatus/:status', jobController.get_jobs_details);


// customer usecases


/**
 * @swagger
 * /userLogin:
 *   post:
 *     name: Login
 *     summary: Logs in an user
 *     tags: [User]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *       200:
 *         description: Takes user email and password as login credentials and verifies if they're correct
 *       400:
 *         description: Couldn't login user
 *       404:
 *         description: Invalid email/password
 */
app.post('/userLogin', userController.login);

/**
 * @swagger
 * /userRegister:
 *   post:
 *     tags:
 *       - User
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/components/schemas/CUSTOMERS'
 *           type: object
 *         properties:
 *          USERNAME:
 *           type: string
 *          PASSWORD:
 *           type: string
 *          EMAIL:
 *           type: string
 *          FIRST_NAME:
 *           type: float
 *          LAST_NAME:
 *           type: float
 *          DOB:
 *           type: date
 *          PHONE:
 *           type: string
 *          CNIC:
 *           type: string
 *          ADDRESS:
 *           type: string
 *         required:
 *           - USERNAME
 *           - EMAIL
 *           - PASSWORD
 *     responses:
 *       '200':
 *         description: User created
 *       '400':
 *         description: Couldn't register user
 *       '404':
 *         description: "Error: Not Found"
 */
app.post('/userRegister', userController.register);


// app.post('/changePassword', userController.reset_password)

/**
 * @swagger
 * /updateCustomer/{userid}:
 *   post:
 *     summary: Update a customer's details
 *     tags: [User]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/components/schemas/CUSTOMERS'
 *           type: object
 *         properties:
 *          username:
 *           type: string
 *          password:
 *           type: string
 *          email:
 *           type: string
 *          first_name:
 *           type: float
 *          last_name:
 *           type: float
 *          dob:
 *           type: date
 *          phone:
 *           type: string
 *          cnic:
 *           type: string
 *          address:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CUSTOMERS'
 *       400:
 *         description: Couldn't update customer details
 *        
 */
app.post('/updateCustomer/:userid', userController.update_customer);

// Already done in getServices

/**
 * @swagger
 * /getServices:
 *   get:
 *     summary: Retrieve all offered services
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SERVICES'
 */
app.post('/viewServices', userController.get_services);

/**
 * @swagger
 * /requestJob:
 *   post:
 *     tags:
 *       - User
 *     name: Request service
 *     summary: Request a service
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/components/schemas/JOBS'
 *           type: object
 *         properties:
 *         CUSTOMER_ID:
 *           type: int
 *         SERVICE_DETAIL_ID:
 *           type: int
 *         DATE_TIME:
 *           type: datetime
 *         PAYMENT_METHOD:
 *           type: string
 *         JOB_STATUS:
 *           type: string
 *     responses:
 *       '200':
 *         description: Request created successfully
 *       '400':
 *         description: Couldn't create request
 *       '404':
 *         description: "Error: Not Found"
 */
app.post('/requestJob', jobController.request_job);

//Requets table being used
app.post('/cancelRequest/:requestid', userController.cancel_request);

/**
 * @swagger
 * /getUsernames:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Retrieve all customer usernames
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Usernames retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    USERNAME:
 *                      type: string
 *       '400':
 *         description: Couldn't get usernames
 *       '404':
 *         description: "Error: Not Found"
 */
app.get('/getUsernames', userController.get_usernames);

/**
 * @swagger
 * /getEmails:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Retrieve all customer emails
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Emails retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    EMAIL:
 *                      type: string
 *       '400':
 *         description: Couldn't get emails
 *       '404':
 *         description: "Error: Not Found"
 */
app.get('/getEmails', userController.get_emails);


/**
 * @swagger
 * /getJobsForCustomer/{id}/{status}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Retrieve jobs for a specific customer with a specific status
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the customer
 *         required: true
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the job
 *         required: true
 *     responses:
 *       '200':
 *         description: Jobs retrived successfully for customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JOBS'
 *       '400':
 *         description: Couldn't retrieve jobs
 *       '404':
 *         description: "Error: Not Found"
 */
app.get('/getJobsForCustomer/:id/:status', jobController.get_jobs_for_customer)

/**
 * @swagger
 * /getRequests:
 *   get:
 *     summary: Retrieve all requests
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Returns requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                  id:
 *                      type: integer
 *                      description: job id
 *                  CUSTOMER_ID: 
 *                      type: integer
 *                  SERVICE_DETAIL_ID:
 *                      type: integer
 *                  DATE_TIME: 
 *                      type: string
 *                  PAYMENT_METHOD: 
 *                      type: string
 *                  JOB_STATUS: 
 *                      type: string
 *                  SERVICE_DETAIL.WORKER_ID:
 *                      type: integer
 *                  SERVICE_DETAIL.SERVICE_ID:
 *                      type: integer
 *                  SERVICE_DETAIL.SERVICE.id:
 *                      type: integer
 *                  SERVICE_DETAIL.SERVICE.SERVICE_TITLE: 
 *                      type: string
 *                  CUSTOMER.ADDRESS: 
 *                      type: string        
 *       400:
 *          description: Error retrieving requests
 *       404:
 *          description: "Error: Not Found"
 * 
 */
app.get('/getRequests', jobController.get_all_requests)

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Post review for a completed service
 *     tags: [User]
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/components/schemas/REVIEWS'
 *     responses:
 *       200:
 *         description: Post a review
 *       400:
 *          description: Couldn't post review
 *       404:
 *          description: "Error: Not Found"
 * 
 */
app.post('/review', reviewController.give_review);


/**
 * @swagger
 * /request:
 *   post:
 *     tags:
 *       - User
 *     name: Request service
 *     summary: Request a service
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *            CUSTOMER_ID:
 *              type: integer
 *            SERVICE_ID:
 *              type: integer
 *            DATE_TIME:
 *              type: string
 *            WORKER_ID:
 *              type: integer
 *            ADDRESS:
 *              type: string
 *     responses:
 *       '200':
 *         description: Request created successfully
 *       '400':
 *         description: Couldn't create request
 *       '404':
 *         description: "Error: Not Found"
 */
app.post('/request', jobController.request);

// worker usecases
/**
 * @swagger
 * /workers:
 *   get:
 *     summary: Retrieve all registered workers
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Returns workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WORKERS'
 *       400:
 *          description: Error retrieving workers
 *       404:
 *          description: "Error: Not Found"
 * 
 */
app.get('/workers', workerController.get_workers);

/**
 * @swagger
 * /worker/{id}:
 *   get:
 *     summary: Retrieve worker by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the worker
 *         required: true
 *     responses:
 *       200:
 *         description: Returns worker
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WORKERS'
 *       400:
 *          description: Error retrieving worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.get('/worker/:id', workerController.get_worker_by_id)

/**
 * @swagger
 * /deleteWorker/{id}:
 *   delete:
 *     summary: Delete a worker from the application 
 *     tags: [Admin]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the worker
 *         required: true
 *     responses:
 *       200:
 *         description: Worker deleted successfully
 *       400:
 *         description: Couldn't delete worker
 *        
 */
 app.delete('/deleteWorker/:id', workerController.delete_worker)

/**
 * @swagger
 * /getWorkerFeedbacks/{id}:
 *   get:
 *     summary: Retrieve feedbacks by worker ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the worker
 *         required: true
 *     responses:
 *       200:
 *         description: Returns worker feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 JOB_ID:
 *                      type: integer
 *                 SERVICE_DETAIL.WORKER_ID:
 *                      type: integer
 *                 REVIEW.FEEDBACK:
 *                      type: string
 *       400:
 *          description: Error retrieving worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */


app.get('/getWorkerFeedbacks/:id', workerController.get_worker_feedback)


/**
 * @swagger
 * /workersFullDetailsBySkill/{id}:
 *   get:
 *     summary: Returns full details of workers who offer a specific service
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the service
 *         required: true
 *     responses:
 *       200:
 *         description: Returns full details of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SERVICE_ID:
 *                      type: integer
 *                 WORKER:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                          FIRST_NAME:
 *                              type: string
 *                          LAST_NAME:
 *                              type: string
 *                          DOB:
 *                              type: string
 *                          PHONE:
 *                              type: string
 *                          EMAIL:
 *                              type: string
 *                          CNIC:
 *                              type: string
 *                          ADDRESS:
 *                              type: string
 *                          AVAILABLE:
 *                              type: boolean
 *                          RATING:
 *                              type: number
 *                          
 *       400:
 *          description: Error retrieving full details of worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.get('/workersFullDetailsBySkill/:id', workerController.get_workers_full_details_by_skill)

/**
 * @swagger
 * /workersBasicDetailsBySkill/{id}:
 *   get:
 *     summary: Returns basic details of workers who offer a specific service
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Numeric id of the service
 *         required: true
 *     responses:
 *       200:
 *         description: Returns basic details of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                          id:
 *                              type: integer
 *                          FIRST_NAME:
 *                              type: string
 *                          LAST_NAME:
 *                              type: string
 *                          DOB:
 *                              type: string
 *                          PHONE:
 *                              type: string
 *                          EMAIL:
 *                              type: string
 *                          CNIC:
 *                              type: string
 *                          ADDRESS:
 *                              type: string
 *                          AVAILABLE:
 *                              type: boolean
 *                          RATING:
 *                              type: number
 *                          
 *       400:
 *          description: Error retrieving basic details of worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.get('/workersBasicDetailsBySkill/:id', workerController.get_workers_basic_details_by_skill)

/**
 * @swagger
 * /workersByAvailability:
 *   get:
 *     summary: Returns available workers
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns available workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                          id:
 *                              type: integer
 *                          FIRST_NAME:
 *                              type: string
 *                          LAST_NAME:
 *                              type: string
 *                          DOB:
 *                              type: string
 *                          PHONE:
 *                              type: string
 *                          EMAIL:
 *                              type: string
 *                          CNIC:
 *                              type: string
 *                          ADDRESS:
 *                              type: string
 *                          AVAILABLE:
 *                              type: boolean
 *                          RATING:
 *                              type: number
 *                          
 *       400:
 *          description: Error retrieving workers
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.get('/workersByAvailability', workerController.get_worker_by_availability)

// {
//     "id": 1,
//     "EMAIL": null,
//     "FIRST_NAME": "Bilal",
//     "LAST_NAME": "Khan",
//     "DOB": "1990-12-12",
//     "PHONE": "12345678910",
//     "CNIC": "12345-1234123-1",
//     "ADDRESS": "Khayaban e Bukhari",
//     "AVAILABLE": null,
//     "RATING": 3.3,
//     "WORKER_ID": 1,
//     "SERVICE_DETAILs.id": 1,
//     "SERVICE_DETAILs.WORKER_ID": 1,
//     "SERVICE_DETAILs.SERVICE_ID": 1,
//     "SERVICE_DETAILs.SERVICE_CHARGES": 500
//   },
app.get('/workerDetails/:id', workerController.get_worker_details)

/**
 * @swagger
 * /updateWorker/{id}:
 *   put:
 *     summary: Update details of a specific worker
 *     tags: [Admin]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  dob:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  email:
 *                      type: string
 *                  cnic:
 *                      type: string
 *                  address:
 *                      type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           description: Numeric id of the worker
 *           required: true
 *     responses:
 *       200:
 *         description: Updated worker details
 *       400:
 *         description: Error updating details of worker
 *       404:
 *         description: "Error: Request Not Found"
 * 
 */
app.put('/updateWorker/:id', workerController.update_worker)

/**
 * @swagger
 * /getWorkerServices/{id}:
 *   get:
 *     summary: Returns services offered by a specific worker
 *     tags: [Admin]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *           description: Numeric id of the worker
 *           required: true
 *     responses:
 *       200:
 *         description: Returns services for worker
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                          SERVICE_TITLE:
 *                              type: string
 *                          SERVICE_DETAILs.WORKER_ID:
 *                              type: integer
 *       400:
 *          description: Error retrieving services for worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.get('/getWorkerServices/:id', workerController.get_worker_services)

/**
 * @swagger
 * /switchAvailability/{id}:
 *   put:
 *     summary: Switch worker availability (boolean)
 *     tags: [Admin]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           description: Numeric id of the worker
 *           required: true
 *     responses:
 *       200:
 *          description: Switched availability
 *       400:
 *          description: Error performing action for worker
 *       404:
 *          description: "Error: Request Not Found"
 * 
 */
app.put('/switchAvailability/:id', workerController.switch_availability);

module.exports = app;
