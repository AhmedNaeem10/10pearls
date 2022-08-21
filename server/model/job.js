/**
 * @swagger
 * components:
 *   schemas:
 *     JOBS:
 *       type: object
 *       required:
 *         - JOB_ID
 *         - CUSTOMER_ID
 *         - SERVICE_DETAIL_ID
 *         - DATE_TIME
 *         - JOB_STATUS
 *       properties:
 *         JOB_ID:
 *           type: integer
 *           description: The auto-generated id of the job
 *         CUSTOMER_ID:
 *           type: integer
 *           description: The id of the customer who requested the service
 *         SERVICE_DETAIL_ID:
 *           type: integer
 *           description: The corresponding service_detail_id of the request
 *         DATE_TIME:
 *           type: string
 *           description: Date and time for which request has been made
 *         PAYMENT_METHOD:
 *           type: string
 *           description: Method of payment
 *         JOB_STATUS:
 *           type: string
 *           description: Can be either of Pending, Rejected, Accepted, Completed
 *       example:
 *         JOB_ID: 1
 *         CUSTOMER_ID: 1
 *         SERVICE_DETAIL_ID: 1
 *         DATE_TIME: 
 *         PAYMENT_METHOD: COD
 *         JOB_STATUS: Accepted
 * 
 * 
 */

module.exports = (sequelize, Sequelize) => {
    return JOB = sequelize.define("JOBS", {
        id: {
            type: Sequelize.INTEGER,
            field: "JOB_ID",             
            autoIncrement: true,       
            primaryKey: true,
            allowNull: false
        },
        CUSTOMER_ID: {
            type: Sequelize.INTEGER
        },
        SERVICE_DETAIL_ID: {
            type: Sequelize.INTEGER
        }, 
        DATE_TIME: {
            type: Sequelize.DATE,
            allowNull: false
        },
        PAYMENT_METHOD: {
            type: Sequelize.STRING(15)
        },
        JOB_STATUS: {
            type: Sequelize.STRING(15)
        }
    }, {
        timestamps: false,
        
        
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};