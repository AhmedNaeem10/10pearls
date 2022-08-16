const db = require("../model");
const transporter = require("./email")

db.sequelize.sync();

const REQUEST = require('../model/request')(db.sequelize, db.Sequelize)

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