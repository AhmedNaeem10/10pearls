const db = require("../model");
db.sequelize.sync();

const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);

exports.get_services = async(req, res) => {
    const SERVICE = require('../model/service')(db.sequelize, db.Sequelize);
    let response = await SERVICE.findAll();
    res.json(response);
}


exports.check_service = async (req, res) => {
    const SERVICE = require('../model/service')(db.sequelize, db.Sequelize);
    try{
        let {service} = req.params;
        let found = await SERVICE.findOne({where: {SERVICE_TITLE: service}});
        if(found){
            res.json({
                status: 200,
                message: true
            });
        }else{
            res.json({
                status: 200,
                message: false
            });
        }
    }
    catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
}

exports.add_service = async (req, res) => {
    const SERVICE = require('../model/service')(db.sequelize, db.Sequelize);
    try{
        let service = req.body;
        let response = await SERVICE.create(service);
        if(response){
            res.json({
                status: 200,
                message: "Service added successfully!"
            });
        }
    }
    catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
}
