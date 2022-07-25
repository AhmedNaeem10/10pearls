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

    let sql = `INSERT INTO CUSTOMER(username, password, first_name, last_name, email, phone) VALUES('${username}','${password}','${first_name}','${last_name}','${email}','${phone}')`;
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