const dbo = require("../db/conn");
const db = require("../model");


db.sequelize.sync();
const ADMIN = require('../model/admin')(db.sequelize, db.Sequelize)

exports.login = async (req, res)=>{
    const admin = req.body;
    const username = admin.username;
    const password = admin.password;
    try{
        let found = await ADMIN.findOne({where: {username: username, password: password}});
        console.log(found)
        if(found){
            res.status(200).json({
                status: 200,
                data: found.dataValues
            });
        }else{
            res.status(404).json({
                status: 404,
                message: "Invalid username or password!"
            });
        }
    }catch(err){
        res.status(400).json({
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
            res.status(200).json({
                status: 200,
                message: "Admin successfully registered!"
            })
        }
    }catch(err){
        res.status(400).json({
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
            res.status(200).json({
                status: 200,
                message: "Password changed successfully!"
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "There was an error changing the password."
            });
        }
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
    // let sql = `SELECT * FROM ADMIN WHERE USERNAME = '${username}'`;
    // db.query(sql, (err, results, fields) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         })
    //     }else{
    //         if(results.length){
    //             let sql = `UPDATE ADMIN SET PASSWORD = '${password}' WHERE USERNAME = '${username}'`
    //             db.query(sql, (err, result) => {
    //                 if(err){
    //                     res.status(400).json({
    //                         status: 400,
    //                         message: err.sqlMessage
    //                     });
    //                 }else{
    //                     res.status(200).json({
    //                         status: 200,
    //                         messgae: "Password changed successfully!"
    //                     });
    //                 }
    //             })
    //         }else{
    //             res.status(404).json({
    //                 status: 404,
    //                 message: "Invalid username!"
    //             });
    //         }
    //     }
    // });
}

exports.register_worker = (req, res) => {
    const db = dbo.connect();
    const worker = req.body;
    const first_name = worker.first_name;
    const last_name = worker.last_name;
    const phone = worker.phone;
    const cnic = worker.cnic;
    const dob = worker.dob;
    const address = worker.address;
    const email = worker.email;

    let sql;
    if(email){
        sql = `INSERT INTO WORKER(FIRST_NAME, LAST_NAME, PHONE, CNIC, DOB, ADDRESS, EMAIL) VALUES('${first_name}','${last_name}','${phone}','${cnic}','${dob}','${address}','${email}')`;
    }else{
        sql = `INSERT INTO WORKER(FIRST_NAME, LAST_NAME, PHONE, CNIC, DOB, ADDRESS) VALUES('${first_name}','${last_name}','${phone}','${cnic}','${dob}','${address}')`;
    }

    db.query(sql, (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                status: 200,
                message: "Worker registered successfully!"
            });
        }
    });
}

exports.add_skill = (req, res) => {
    const db = dbo.connect();
    const skill = req.body;
    const worker_id = skill.worker_id;
    const service_name = skill.service_name;
    const service_charges = skill.service_charges;

    let sql = `INSERT INTO SERVICE_DETAIL(WORKER_ID, SERVICE_NAME, SERVICE_CHARGES) VALUES('${worker_id}', '${service_name}' ,'${service_charges}')`;
    db.query(sql, (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                status: 200,
                message: "Skill added successfully!"
            });
        }
    })
}


exports.get_requests = (req, res) => {
    const db = dbo.connect();
    let sql = `SELECT * FROM REQUEST R LEFT OUTER JOIN CUSTOMER C ON R.CUSTOMER_ID = C.CUSTOMER_ID`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                status: 200,
                data: results
            });
        }
    })
}