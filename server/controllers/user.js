const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.connect();
    const user = req.body;
    const username = user.username;
    const password = user.password;
    let sql = `SELECT * FROM CUSTOMER WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    db.query(sql, (error, results, fields)=>{
        if (error){
            res.status(400).json({
                status: 400,
                message: error.sqlMessage
            })
        }
        else{
            if(results.length){
                res.status(200).json({
                    status: 200,
                    data: results[0]
                });
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Invalid username or password!"
                });
            }
        }
    });
}

exports.register = async (req, res)=>{
    const db = dbo.connect();
    const user = req.body;

    // setting primary info for now
    const username = user.username;
    const password = user.password;
    const first_name = user.first_name;
    const last_name = user.last_name;
    const email = user.email;
    const phone = user.phone;
    const age = user.age;
    const cnic = user.cnic;
    const address = user.address;

    let sql = `INSERT INTO CUSTOMER(username, password, first_name, last_name, email, phone, age, cnic, address) VALUES('${username}','${password}','${first_name}','${last_name}','${email}','${phone}','${age}','${cnic}','${address}')`;
    db.query(sql, (error, result) => {
        if (error){
            res.status(400).json({
                status: 400,
                message: error.sqlMessage
            })
        }else{
            res.status(200).json({
                status: 200,
                message: "User successfully registered!"
            })
        }
    });
}


exports.update_customer = (req, res) => {
    const db = dbo.connect();
    
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

    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = '${user_id}'`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            })
        }else{
            if(results.length){
                let sql = `UPDATE CUSTOMER SET 
                USERNAME = '${username}',
                PASSWORD = '${password}',
                EMAIL = '${email}',
                FIRST_NAME = '${first_name}',
                LAST_NAME = '${last_name}',
                AGE = '${age}',
                PHONE = '${phone}',
                CNIC = '${cnic}', 
                ADDRESS = '${address}' WHERE CUSTOMER_ID = '${user_id}'`
                db.query(sql, (err, result) => {
                    if(err){
                        res.status(400).json({
                            status: 400,
                            message: err.sqlMessage
                        });
                    }else{
                        res.status(200).json({
                            status: 200,
                            messgae: "User details updated successfully!"
                        });
                    }
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Error updating details!"
                });
            }
        }
    });
}

exports.get_services = (req, res) => {
    const db = dbo.connect();
    let sql = `SELECT * FROM SERVICES`;
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

exports.request_service = (req, res) => {
    const db = dbo.connect();
    const user = req.body;

    const user_id = req.params.user_id;
    const date_time = user.date_time;

    let sql = `INSERT INTO REQUEST(CUSTOMER_ID, DATE_TIME, REQUEST_STATUS) VALUES('${user_id}', '${date_time}', "PENDING")`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                status: 200,
                message: "Your request has been submitted successfully."
            });
        }
    })
}

exports.cancel_request = (req, res) => {
    const db = dbo.connect();
    const req_id = req.params.requestid;

    let sql = `UPDATE REQUEST SET REQUEST_STATUS = "CANCELLED" WHERE REQUEST_ID = '${req_id}'`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                status: 200,
                message: "Your request has been cancelled."
            });
        }
    })
}
