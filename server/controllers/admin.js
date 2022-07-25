const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.connect();
    const admin = req.body;
    const username = admin.username;
    const password = admin.password;
    let sql = `SELECT * FROM home_services.ADMIN WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    db.query(sql, (error, results, fields)=>{
        if (error) throw error;
        if(results){
            res.send(results[0]);
        }else{
            res.status(404).send('failed');
        }
    });
}

exports.register = async (req, res)=>{
    const db = dbo.connect();
    const admin = req.body;
   
}
