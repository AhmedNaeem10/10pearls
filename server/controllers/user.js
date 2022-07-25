const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.connect();
    const user = req.body;
    const username = user.username;
    const password = user.password;
    let sql = `SELECT * FROM HOME_SERVICES.CUSTOMER WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    db.query(sql, (error, fields, results)=>{
        if(results){
            res.send(results[0]);
        }else{
            res.status(404).send('failed');
        }
    });
}

exports.register = async (req, res)=>{
    const db = dbo.connect();
    const user = req.body;
    
}