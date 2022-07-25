const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.connect();
    const admin = req.body;
    const username = admin.username;
    const password = admin.password;
    let sql = `SELECT * FROM ADMIN WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    db.query(sql, (error, results, fields) => {
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
    const admin = req.body;
    const username = admin.username;
    const password = admin.password;
    let sql = `INSERT INTO ADMIN(username, password) VALUES('${username}','${password}')`
    db.query(sql, (error, result) => {
        if (error){
            res.status(400).json({
                status: 400,
                message: error.sqlMessage
            })
        }else{
            res.status(200).json({
                status: 200,
                message: "Admin successfully registered!"
            })
        }
    });
}
