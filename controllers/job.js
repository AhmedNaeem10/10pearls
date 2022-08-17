const db = require("../model");
<<<<<<< HEAD
require("dotenv").config({ path: "./config.env" });
const transporter = require("./email")

db.sequelize.sync();
const JOB = require('../model/job')(db.sequelize, db.Sequelize);
const CUSTOMER = require('../model/customer')(db.sequelize, db.Sequelize);

exports.request_job = async (req, res) => {

=======

db.sequelize.sync();
const JOB = require('../model/job')(db.sequelize, db.Sequelize);

exports.request_job = async (req, res) => {
>>>>>>> fd2841f (verif)
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


exports.update_status = async (req, res) => {
    const {id, status} = req.params;
    try{
        let response = await JOB.update({JOB_STATUS: status}, {where: {JOB_ID: id}});
<<<<<<< HEAD
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
            message: "Status successfully updated!",
            customer_id: customerid
        })}
    }
    catch(err){
        res.json({
=======
        res.json({
            status: 200,
            message: "Status successfully updated!"
        })
    }
    catch(err){
        res.status(400).json({
>>>>>>> fd2841f (verif)
            status: 400,
            message: "There was an error updating the status!."
        });
    }
}
<<<<<<< HEAD


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







=======
>>>>>>> fd2841f (verif)
