const db = require("../model");

db.sequelize.sync();
const REVIEW = require('../model/review')(db.sequelize, db.Sequelize);

exports.give_review = async (req, res) => {
    try{
        const review = req.body;
        let response = await REVIEW.create(review);
        const rating = parseFloat(review.RATING);
        const JOB = require('../model/job')(db.sequelize, db.Sequelize);
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        const WORKER = require('../model/worker')(db.sequelize, db.Sequelize);
        let job_id = review.JOB_ID;
        let job = await JOB.findOne({where:{JOB_ID: job_id}});
        let service_detail_id = job.SERVICE_DETAIL_ID;
        let new_res = await SERVICE_DETAIL.findAll({where: {SERVICE_DETAIL_ID: service_detail_id}});
        let worker_id = new_res[0].WORKER_ID;
        console.log(worker_id)
        let worker = await WORKER.findOne({where: {WORKER_ID: worker_id}});
        let new_rating;
        if(!worker.RATING){
            new_rating = rating;
        }else{
            new_rating = parseFloat(worker.RATING);
            new_rating += rating;
            new_rating /= 2;
            new_rating = Math.round(new_rating * 10) / 10 
            console.log(new_rating)
        }
        await WORKER.update({RATING: new_rating}, {where: {WORKER_ID: worker_id}});
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