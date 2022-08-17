const db = require("../model");

db.sequelize.sync();
const REVIEW = require('../model/review')(db.sequelize, db.Sequelize);

exports.give_review = async (req, res) => {
    try{
        const review = req.body;
        let response = await REVIEW.create(review);
        res.json({
            status: 200,
            message: "Feedback successfully added!"
        });
    }catch(err){
        res.json({
            status: 400,
            message: err.message
        });
    }
}