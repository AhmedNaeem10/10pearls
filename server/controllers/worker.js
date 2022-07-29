const db = require("../model");
db.sequelize.sync();

const WORKER = require('../model/worker')(db.sequelize, db.Sequelize)

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
exports.get_worker_by_skill = async (req, res) => {
    try{
        const {skill} = req.params;
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        WORKER.hasMany(SERVICE_DETAIL, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.belongsTo(WORKER, {
            foreignKey: 'WORKER_ID'
        });

        SERVICE_DETAIL.findAll({
            where: {SERVICE_NAME: skill},
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

