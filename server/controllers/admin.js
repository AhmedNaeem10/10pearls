// const dbo = require("../db/conn");
const db = require("../model");
const worker = require("../model/worker");


db.sequelize.sync();
const ADMIN = require('../model/admin')(db.sequelize, db.Sequelize)

exports.login = async (req, res)=>{
    const admin = req.body;
    const username = admin.username;
    const password = admin.password;
    console.log(admin);
    try{
        let found = await ADMIN.findOne({where: {username: username, password: password}});
        console.log(found)
        if(found){
            res.json({
                status: 200,
                data: found.dataValues
            });
        }else{
            res.json({
                status: 404,
                message: "Invalid username or password!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
    

    // let sql = `SELECT * FROM ADMIN WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    // db.query(sql, (error, results, fields) => {
    //     if (error){
    //         res.status(400).json({
    //             status: 400,
    //             message: error.sqlMessage
    //         })
    //     }
    //     else{
    //         if(results.length){
    //             res.status(200).json({
    //                 status: 200,
    //                 data: results[0]
    //             });
    //         }else{
    //             res.status(404).json({
    //                 status: 404,
    //                 message: "Invalid username or password!"
    //             });
    //         }
    //     }
    // });
}

exports.register = async (req, res)=>{
    const admin = req.body;
    const USERNAME = admin.username;
    const PASSWORD = admin.password;
    try{
        let response = await ADMIN.create({
            USERNAME: USERNAME, 
            PASSWORD: PASSWORD});
        if(response){
            res.json({
                status: 200,
                message: "Admin successfully registered!"
            })
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
    

    // let sql = `INSERT INTO ADMIN(username, password) VALUES('${username}','${password}')`
    // db.query(sql, (error, result) => {
    //     if (error){
    //         res.status(400).json({
    //             status: 400,
    //             message: error.sqlMessage
    //         })
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "Admin successfully registered!"
    //         })
    //     }
    // });
}

exports.change_pasword = async (req, res) => {
    // const db = dbo.connect();
    const {username, password} = req.params;
    console.log(username, password)
    try{
        let response = await ADMIN.update({PASSWORD: password}, {where: {USERNAME: username}})
        if(response[0]){
            res.json({
                status: 200,
                message: "Password changed successfully!"
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "User not found!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
    
}

exports.register_worker = async (req, res) => {
    // const db = dbo.connect();
    const worker = req.body;
    const first_name = worker.first_name;
    const last_name = worker.last_name;
    const phone = worker.phone;
    const cnic = worker.cnic;
    const dob = worker.dob;
    const address = worker.address;
    const email = worker.email;

    const WORKER = require('../model/worker')(db.sequelize, db.Sequelize);
        
    try{
        let response = await WORKER.create({
            FIRST_NAME: first_name,
            LAST_NAME: last_name,
            PHONE: phone,
            CNIC: cnic,
            DOB: dob,
            ADDRESS: address,
            EMAIL: email
        });
        if(response){
            res.json({
                status: 200,
                message: "Worker registered successfully!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
    // let sql;
    // if(email){
    //     sql = `INSERT INTO WORKER(FIRST_NAME, LAST_NAME, PHONE, CNIC, DOB, ADDRESS, EMAIL) VALUES('${first_name}','${last_name}','${phone}','${cnic}','${dob}','${address}','${email}')`;
    // }else{
    //     sql = `INSERT INTO WORKER(FIRST_NAME, LAST_NAME, PHONE, CNIC, DOB, ADDRESS) VALUES('${first_name}','${last_name}','${phone}','${cnic}','${dob}','${address}')`;
    // }

    // db.query(sql, (err, result) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         });
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "Worker registered successfully!"
    //         });
    //     }
    // });
}

exports.add_skill = async (req, res) => {
    // const db = dbo.connect();
    const skill = req.body;
    const worker_id = skill.worker_id;
    const service_name = skill.service_name;
    const service_charges = skill.service_charges;

    const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
    try{
        let response = await SERVICE_DETAIL.create({
            WORKER_ID: worker_id,
            SERVICE_NAME: service_name,
            SERVICE_CHARGES: service_charges
        });
        if(response){
            res.json({
                status: 200,
                message: "Skill updated successfully!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
    // let sql = `INSERT INTO SERVICE_DETAIL(WORKER_ID, SERVICE_NAME, SERVICE_CHARGES) VALUES('${worker_id}', '${service_name}' ,'${service_charges}')`;
    // db.query(sql, (err, result) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         });
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "Skill added successfully!"
    //         });
    //     }
    // })
}