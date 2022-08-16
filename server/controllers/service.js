const db = require("../model");
db.sequelize.sync();

const SERVICE = require('../model/services')(db.sequelize, db.Sequelize);

exports.get_services = async(req, res) => {
    let response = await SERVICE.findAll();
    res.json(response);
}


exports.check_service = async (req, res) => {
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

// offer a new service
exports.add_service = async (req, res) => {
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

exports.edit_service = async (req, res) => {
    const {id} = req.params;
    const service = req.body;
    try{
        let response = await SERVICE.update(service, {where: {SERVICE_ID: id}});
        console.log(response)
        res.json({
            status: 200,
            message: "Service successfully updated!"
        })
    }
    catch(err){
        res.json({
            status: 400,
            message: "There was an error updating the service!."
        });
    }
}

exports.delete_service = async (req, res) => {
    const {id} = req.params;
    try{
        let response = await SERVICE.destroy({where: {SERVICE_ID: id}});
        res.json({
            status: 200,
            message: "Service successfully deleted!"
        })
    }
    catch(err){
        res.json({
            status: 400,
            message: "There was an error deleting the service!."
        });
    }
}