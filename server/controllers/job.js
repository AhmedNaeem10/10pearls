const db = require("../model");

db.sequelize.sync();
const JOB = require('../model/job')(db.sequelize, db.Sequelize);

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


exports.update_status = async (req, res) => {
    const {id, status} = req.params;
    try{
        let response = await JOB.update({JOB_STATUS: status}, {where: {JOB_ID: id}});
        res.json({
            status: 200,
            message: "Status successfully updated!"
        })
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




