const db = require("../model");

db.sequelize.sync();
const REVIEW = require('../model/review')(db.sequelize, db.Sequelize);

exports.give_review = async (req, res) => {
    // try{
        
        // add feedback to reviews table
        const review = req.body;
        // await REVIEW.create(review);
        // res.json({
        //     status: 200,
        //     message: "Feedback successfully added!"
        // });

        // calculate and update rating of worker in workers table
        const rating = review.RATING;
        const JOB = require('../model/job')(db.sequelize, db.Sequelize);
        const SERVICE_DETAIL = require('../model/service_detail')(db.sequelize, db.Sequelize);
        const WORKER = require('../model/worker')(db.sequelize, db.Sequelize);
        // JOB.hasOne(REVIEW, {
        //     foreignKey: 'JOB_ID'
        // });
        
        // REVIEW.belongsTo(JOB, {
        //     foreignKey: 'JOB_ID'
        // });

        // JOB.hasMany(SERVICE_DETAIL, {
        //     foreignKey: 'SERVICE_DETAIL_ID'
        // })

        // SERVICE_DETAIL.belongsTo(JOB, {
        //     foreignKey: 'SERVICE_DETAIL_ID'
        // });

        // WORKER.hasOne(SERVICE_DETAIL, {
        //     foreignKey: 'WORKER_ID'
        // });

        // SERVICE_DETAIL.belongsTo(WORKER, {
        //     foreignKey: 'WORKER_ID'
        // })

        
        // let response = await REVIEW.findAll({include: [{
        //     model: JOB,
        //     include: [{
        //         model: SERVICE_DETAIL,
        //         include: [{
        //             model: WORKER
        //         }]
        //     }]
        // }]});

        let response = await JOB.findOne({where:{JOB_ID:  review.JOB_ID}});
        let service_detail_id = response.SERVICE_DETAIL_ID;
        console.log(service_detail_id)
        let new_res = await SERVICE_DETAIL.findOne({where: {id: service_detail_id}});
        console.log(new_res.WORKER_ID)
        
        res.json(response);
    // }catch(err){
    //     res.json({
    //         status: 400,
    //         message: err.message
    //     });
    // }
}

