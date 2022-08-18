const db = require("../model");
db.sequelize.sync();

const WORKER = require('../model/worker')(db.sequelize, db.Sequelize)
const REVIEW = require('../model/review')(db.sequelize, db.Sequelize);
const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
const JOB = require('../model/job')(db.sequelize, db.Sequelize);

// get all the workers currently present
exports.get_workers = async (req, res) => {
    try{
        let results = await WORKER.findAll();
        res.status(200).json({
            status: 200,
            message: results
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


// get a specific worker based on id
exports.get_worker_by_id = async (req, res) => {
    try{
        const {id} = req.params;
        let result = await WORKER.findOne({where: {WORKER_ID: id}});
        res.status(200).json({
            status: 200,
            message: result
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

// filter workers on a particular skill
exports.get_workers_full_details_by_skill = async (req, res) => {
    try{
        const {id} = req.params;
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        WORKER.hasMany(SERVICE_DETAIL, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.belongsTo(WORKER, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.findAll({
            where: {SERVICE_ID: id},
            include: [{
              model: WORKER,
            }]
          }).then(results => {
            res.status(200).json({
                status: 200,
                message: results
            });
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


exports.get_workers_basic_details_by_skill = async (req, res) => {
    try{
        const {id} = req.params;
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        WORKER.hasMany(SERVICE_DETAIL, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.belongsTo(WORKER, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.findAll({
            where: {SERVICE_ID: id},
            include: [{
              model: WORKER,
            }]
          }).then(results => {
            let workers = []
            for(let result of results){
                workers.push(result.WORKER)
            }
            res.status(200).json({
                status: 200,
                message: workers
            });
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


// get all the available workers
exports.get_worker_by_availability = async (req, res) => {
    try{
        let results = await WORKER.findAll({where: {AVAILABLE: true}});
        if(results){
            res.status(200).json({
                status: 200,
                message: results
            });
        }
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


// get all the details of a worker i.e. his basic info (name, phone etc) and skills with charges
exports.get_worker_details = async(req , res) => {
    try{
        const {id} = req.params;
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        WORKER.hasMany(SERVICE_DETAIL, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.hasOne(WORKER, {
            sourceKey: 'WORKER_ID',
            foreignKey: 'WORKER_ID'
        });

        WORKER.findAll({
            where: {WORKER_ID: id},
            raw: true,
            include: [{
              model: SERVICE_DETAIL,
              required: false,
            }]
          }).then(results => {
            res.status(200).json({
                status: 200,
                message: results
            });
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


// to switch the availability of worker from true -> false and vice versa
exports.switch_availability = async (req, res) => {
    try{
        const {id} = req.params;
        let result = await WORKER.findOne({where: {WORKER_ID: id}});
        if(result){
            let available = result.dataValues.AVAILABLE
            if(available){
                available = false
            }else{
                available = true
            }
            let response = await WORKER.update({AVAILABLE: available}, {where: {WORKER_ID: id}});
            if(response[0]){
                res.status(200).json({
                    status: 200,
                    message: "Availability switched successfully!"
                })
            }else{
                res.status(400).json({
                    status: 400,
                    message: "There was an error switching the availability."
                });
            }
        }
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

// update worker details
exports.update_worker = async (req, res) => {
    try{
        const {id} = req.params;
        const worker = req.body;

        const first_name = worker.first_name;
        const last_name = worker.last_name;
        const email = worker.email;
        const phone = worker.phone;
        const dob = worker.dob;
        const cnic = worker.cnic;
        const address = worker.address;
        let result = await WORKER.findOne({where: {WORKER_ID: id}});
        if(result){
            let response = await WORKER.update({FIRST_NAME: first_name,
                LAST_NAME: last_name,
                EMAIL: email,
                PHONE: phone,
                CNIC: cnic,
                DOB: dob,
                ADDRESS: address}, {where: {WORKER_ID: id}});
            if(response[0]){
                res.status(200).json({
                    status: 200,
                    message: "Worker details updated successfully!"
                })
            }else{
                res.status(400).json({
                    status: 400,
                    message: "There was an error updating worker details."
                });
            }
        }
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

exports.get_worker_feedback = async(req , res) => {
    // const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
    try{
        const {id} = req.params;
        
        JOB.hasOne(REVIEW, {
            foreignKey: 'JOB_ID',
            // sourceKey: 'id'
        });

        REVIEW.belongsTo(JOB, {
            foreignKey: 'JOB_ID',
            // targetKey: 'id'
        });

        SERVICE_DETAIL.hasOne(JOB, {
            foreignKey: 'SERVICE_DETAIL_ID'
            // sourceKey: 'id'
        });

        JOB.belongsTo(SERVICE_DETAIL, {
            foreignKey: 'SERVICE_DETAIL_ID'
            // targetKey: 'id'
        });

        JOB.findAll(
            {
            // where: {WORKER_ID: id},
            // attributes: ['FEEDBACK'],
            // attributes: [''],
            raw: true,
            include: [
                {
              model: SERVICE_DETAIL,
            //   attributes: [''],
              required: true,
              
              where: {WORKER_ID: id}
            }
            ,
            {
                model: REVIEW,
                required: true,
                attributes: ['FEEDBACK']
              }
            ]
            // attributes: ['FEEDBACK']
          }
          ).then(results => {
            res.status(200).json({
                status: 200,
                message: results
            });
        });
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}