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


// Suggestion: Take DOB as input instead of age, so that age updates automatically with time. 
// Age won't to be updated.
exports.update_age = (req, res) => {
    const db = dbo.connect();
    
    const user_id = req.params.userid;
    const age = req.body.age;

    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = '${user_id}'`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            })
        }else{
            if(results.length){
                let sql = `UPDATE CUSTOMER SET AGE = '${age}' WHERE CUSTOMER_ID = '${user_id}'`
                db.query(sql, (err, result) => {
                    if(err){
                        res.status(400).json({
                            status: 400,
                            message: err.sqlMessage
                        });
                    }else{
                        res.status(200).json({
                            status: 200,
                            messgae: "Age updated successfully!"
                        });
                    }
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Error updating age!"
                });
            }
        }
    });
}



exports.update_cnic = (req, res) => {
    const db = dbo.connect();
    

    const user_id = req.params.userid;
    const cnic = req.body.cnic;

    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = '${user_id}'`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            })
        }else{
            if(results.length){
                let sql = `UPDATE CUSTOMER SET CNIC = '${cnic}' WHERE CUSTOMER_ID = '${user_id}'`
                db.query(sql, (err, result) => {
                    if(err){
                        res.status(400).json({
                            status: 400,
                            message: err.sqlMessage
                        });
                    }else{
                        res.status(200).json({
                            status: 200,
                            messgae: "CNIC no. updated successfully!"
                        });
                    }
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Error updating CNIC no.!"
                });
            }
        }
    });
}

exports.update_address = (req, res) => {
    const db = dbo.connect();
    

    const user_id = req.params.userid;
    const address = req.body.address;

    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = '${user_id}'`;
    db.query(sql, (err, results, fields) => {
        if(err){
            res.status(400).json({
                status: 400,
                message: err.sqlMessage
            })
        }else{
            if(results.length){
                let sql = `UPDATE CUSTOMER SET ADDRESS = '${address}' WHERE CUSTOMER_ID = '${user_id}'`
                db.query(sql, (err, result) => {
                    if(err){
                        res.status(400).json({
                            status: 400,
                            message: err.sqlMessage
                        });
                    }else{
                        res.status(200).json({
                            status: 200,
                            messgae: "Address updated successfully!"
                        });
                    }
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Error updating address!"
                });
            }
        }
    });
}