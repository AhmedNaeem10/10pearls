const db = require("../model");
require("dotenv").config({ path: "./config.env" });
const transporter = require("./email")

db.sequelize.sync();
const JOB = require('../model/job')(db.sequelize, db.Sequelize);
const CUSTOMER = require('../model/customer')(db.sequelize, db.Sequelize);

exports.request_job = async (req, res) => {

    const job = req.body;
    try{
        let response = await JOB.create(job);
        res.json({
            status: 200,
            message: "Job request successfully submitted!"
        })
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
}

exports.request = async(req, res) => {
    let job = req.body;
    const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
    try{
        let response = await SERVICE_DETAIL.findOne({where: {WORKER_ID: job.WORKER_ID, SERVICE_ID: job.SERVICE_ID}});
        let id = response.id;
        job.SERVICE_DETAIL_ID = id;
        job.PAYMENT_METHOD = "COD";
        job.DATE_TIME = "2022-12-10 15:12:12";
        job.JOB_STATUS = "pending";
        await JOB.create(job);
        res.json({
            status: 200,
            message: "Job request successfully submitted!"
        })
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
}


exports.update_status = async (req, res) => {
    const {id, status} = req.params;
    try{
        let response = await JOB.update({JOB_STATUS: status}, {where: {JOB_ID: id}});
        let getCustomer = await JOB.findOne({attributes: ['CUSTOMER_ID']}, {where: {JOB_ID: id}});
        const customerid = getCustomer.dataValues.CUSTOMER_ID;
        let getEmail = await CUSTOMER.findOne( {where: {CUSTOMER_ID: customerid}});
        // console.log(getEmail);
        const customerEmail = getEmail.dataValues.EMAIL;
        // console.log("Email is: ", customerEmail);
        if (customerEmail){
            text = "Dear customer, \n\n The status of your request is now updated to '" + status + "'. \n\nRegards, \nHome Services";
            transporter.sendEmail(customerEmail, "Status update", text);
        }
        if(response){
        res.json({
            status: 200,
            message: "Status successfully updated!"
        })}
    }
    catch(err){
        res.json({
            status: 400,
            message: "There was an error updating the status!."
        });
    }
}


// get all requests that are either pending, accepted or rejected
exports.get_jobs = async (req, res) => {
    try{
        let {status} = req.params;
        let response = await JOB.findAll({where: {JOB_STATUS: status}});
        res.json({
            status: 200,
            message: response
        });
    }catch(err){
        res.json({
            status: 400,
            message: "There was an error getting the jobs!."
        });
    }
}

exports.get_jobs_for_customer = async (req, res) => {
    try{
        let {id, status} = req.params;
        let response = await JOB.findAll({where: {CUSTOMER_ID: id, JOB_STATUS: status}});
        res.json({
            status: 200,
            message: response
        });
    }catch(err){
        res.json({
            status: 400,
            message: "There was an error getting the jobs!."
        });
    }
}






