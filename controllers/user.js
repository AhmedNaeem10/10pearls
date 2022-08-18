const dbo = require("../db/conn");
const db = require("../model");
const bcrypt = require('bcryptjs');
const { USER } = require("../config/db.config");

db.sequelize.sync();
const CUSTOMER = require('../model/customer')(db.sequelize, db.Sequelize)
const SERVICE = require('../model/job')(db.sequelize, db.Sequelize)
const REQUEST = require('../model/request')(db.sequelize, db.Sequelize)

exports.login = async (req, res)=>{
    // const db = dbo.connect();
    const user = req.body;
    const email = user.email;
    const password = user.password;
    

    try{
        let found = await CUSTOMER.findOne({where: {EMAIL: email}});
        // console.log(found)
        if(found){
            if(await bcrypt.compare(user.password, found.dataValues.PASSWORD)){
                // creating a JWT token
                // token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
                res.json({
                    status: 200,
                    data: found.dataValues
                });
            }
            else{
                res.json({
                    status: 404,
                    message: "Wrong password!"
                });
            }

        }
        else{
            res.json({
                status: 404,
                message: "Account with this email doesn't exist!"
            });
            
        }
        
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

exports.register = async (req, res)=>{
    // const db = dbo.connect();
    let user = req.body;
    // setting primary info for now
    // const username = user.username;
    // password encryption
    var salt = 10
    // const password = user.password;
    // const first_name = user.first_name;
    // const last_name = user.last_name;
    // const email = user.email;
    // const phone = user.phone;
    // const dob = user.dob;
    // const cnic = user.cnic;
    // const address = user.address;

    // let sql = `INSERT INTO CUSTOMER(username, password, first_name, last_name, email, phone, age, cnic, address) VALUES('${username}','${password}','${first_name}','${last_name}','${email}','${phone}','${age}','${cnic}','${address}')`;
    // db.query(sql, (error, result) => {
    //     if (error){
    //         res.status(400).json({
    //             status: 400,
    //             message: error.sqlMessage
    //         })
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "User successfully registered!"
    //         })
    //     }
    // });
    try{
        let response = await CUSTOMER.create(user);
        if(response){
            res.json({
                status: 200,
                message: "User successfully registered!"
            })
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
    
}


exports.update_customer = async (req, res) => {
    // const db = dbo.connect();
    
    const user_id = req.params.userid;
    const user = req.body;

    const username = user.username;
    const password = user.password;
    const first_name = user.first_name;
    const last_name = user.last_name;
    const email = user.email;
    const phone = user.phone;
    const age = user.age;
    const cnic = user.cnic;
    const address = user.address;

    // let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = '${user_id}'`;
    // db.query(sql, (err, results, fields) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         })
    //     }else{
    //         if(results.length){
    //             let sql = `UPDATE CUSTOMER SET 
    //             USERNAME = '${username}',
    //             PASSWORD = '${password}',
    //             EMAIL = '${email}',
    //             FIRST_NAME = '${first_name}',
    //             LAST_NAME = '${last_name}',
    //             AGE = '${age}',
    //             PHONE = '${phone}',
    //             CNIC = '${cnic}', 
    //             ADDRESS = '${address}' WHERE CUSTOMER_ID = '${user_id}'`
    //             db.query(sql, (err, result) => {
    //                 if(err){
    //                     res.status(400).json({
    //                         status: 400,
    //                         message: err.sqlMessage
    //                     });
    //                 }else{
    //                     res.status(200).json({
    //                         status: 200,
    //                         messgae: "User details updated successfully!"
    //                     });
    //                 }
    //             })
    //         }else{
    //             res.status(404).json({
    //                 status: 404,
    //                 message: "Error updating details!"
    //             });
    //         }
    //     }
    // });
    try{
        let response = await CUSTOMER.update({USERNAME: username, 
            PASSWORD: password,
            FIRST_NAME: first_name,
            LAST_NAME: last_name,
            EMAIL: email,
            PHONE: phone,
            CNIC: cnic,
            DOB: dob,
            ADDRESS: address}, {where: {USERNAME: username}})
        if(response[0]){
            res.json({
                status: 200,
                message: "User details updated successfully!"
            })
        }else{
            res.json({
                status: 400,
                message: "Error updating details!"
            });
        }
    }catch(err){
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
}

exports.get_services = async(req, res) => {
    // const db = dbo.connect();
    // let sql = `SELECT * FROM SERVICES`;
    // db.query(sql, (err, results, fields) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         });
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             data: results
    //         });
    //     }
    // })
    try{
        let found = await SERVICE.findAll();
        console.log(found)
        if(found){
            res.json({
                status: 200,
                data: found.dataValues
            });
        }else{
            res.json({
                status: 404,
                message: "Error retrieving services!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

exports.request_service = async (req, res) => {
    const db = dbo.connect();
    const user = req.body;

    const user_id = req.params.user_id;
    const date_time = user.date_time;

    // let sql = `INSERT INTO REQUEST(CUSTOMER_ID, DATE_TIME, REQUEST_STATUS) VALUES('${user_id}', '${date_time}', "PENDING")`;
    // db.query(sql, (err, results, fields) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         });
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "Your request has been submitted successfully."
    //         });
    //     }
    // })
    try{
        let response = await REQUEST.create({
            CUSTOMER_ID: user_id,
            DATE_TIME: date_time, 
            REQUEST_STATUS: "PENDING"
            });
        if(response){
            res.json({
                status: 200,
                message: "Your request has been submitted successfully."
            })
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

exports.cancel_request = async (req, res) => {
    // const db = dbo.connect();
    const req_id = req.params.requestid;

    // let sql = `UPDATE REQUEST SET REQUEST_STATUS = "CANCELLED" WHERE REQUEST_ID = '${req_id}'`;
    // db.query(sql, (err, results, fields) => {
    //     if(err){
    //         res.status(400).json({
    //             status: 400,
    //             message: err.sqlMessage
    //         });
    //     }else{
    //         res.status(200).json({
    //             status: 200,
    //             message: "Your request has been cancelled."
    //         });
    //     }
    // })
    try{
        let response = await REQUEST.update({REQUEST_STATUS: "CANCELLED"}, {where: {REQUEST_ID: req_id}})
        if(response[0]){
            res.json({
                status: 200,
                message: "Request cancelled successfully!"
            })
        }else{
            res.json({
                status: 400,
                message: "There was an error cancelling the request."
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

exports.get_usernames = async(req, res) => {
    try{
        let found = await CUSTOMER.findAll({attributes: ['USERNAME']});
        console.log(found)
        if(found){
            // console.log(found.dataValues.USERNAME)
            res.json({
                status: 200,
                message: found
            });
        }else{
            res.json({
                status: 404,
                message: "Error retrieving usernames!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

exports.get_emails = async(req, res) => {
    try{
        let found = await CUSTOMER.findAll({attributes: ['EMAIL']});
        console.log(found)
        if(found){
            res.json({
                status: 200,
                message: found
            });
        }else{
            res.json({
                status: 404,
                message: "Error retrieving emails!"
            });
        }
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        })
    }
}

