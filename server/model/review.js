/**
 * @swagger
 * components:
 *   schemas:
 *     REVIEWS:
 *       type: object
 *       required:
 *         - REVIEW_ID
 *         - RATING
 *       properties:
 *         REVIEW_ID:
 *           type: integer
 *           description: The auto-generated id of the review
 *         JOB_ID:
 *           type: integer
 *           description: The id of the job for which the review has been made
 *         RATING:
 *           type: number
 *           description: Rating of the completed job 
 *         FEEDBACK:
 *           type: string
 *           description: Detailed customer feedback of the completed job
 *       example:
 *         REVIEW_ID: 1
 *         JOB_ID: 1
 *         RATING: 5
 *         FEEDBACK: Awesome service!
 * 
 * 
 */
module.exports = (sequelize, Sequelize) => {
    return REVIEW = sequelize.define("REVIEWS", {
        id: {
            type: Sequelize.INTEGER,
            field: "REVIEW_ID",
            primaryKey: true,
            autoIncrement: true      
        },
        // SERVICE_ID: {
        //     type: Sequelize.INTEGER
        // },
        RATING: {
            type: Sequelize.INTEGER
        }, 
        FEEDBACK: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};