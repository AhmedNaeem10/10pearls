/**
 * @swagger
 * components:
 *   schemas:
 *     SERVICE_DETAILS:
 *       type: object
 *       required:
 *         - SERVICE_DETAIL_ID
 *         - SERVICE_ID
 *         - SERVICE_CHARGES
 *       properties:
 *         SERVICE_DETAIL_ID:
 *           type: int
 *           description: The auto-generated id of the SERVICE_DETAIL
 *         WORKER_ID:
 *           type: int
 *           description: The corresponding id of the worker providing the service
 *         SERVICE_ID:
 *           type: int
 *           description: The corresponding id of the service being provided
 *         SERVICE_CHARGES:
 *           type: datetime
 *           description: Service charges
 *       example:
 *         SERVICE_DETAIL_ID: 1
 *         WORKER_ID: 1
 *         SERVICE_ID: 1
 *         SERVICE_CHARGES: 500
 * 
 * 
 */
module.exports = (sequelize, Sequelize) => {
    return SERVICE_DETAIL = sequelize.define("SERVICE_DETAILS", {
        id: {
            type: Sequelize.INTEGER,
            field: "SERVICE_DETAIL_ID",
            primaryKey: true,
            autoIncrement: true    
        },
        WORKER_ID: {
            type: Sequelize.INTEGER
        },
        SERVICE_ID: {
            type: Sequelize.INTEGER
        }, 
        SERVICE_CHARGES: {
            type: Sequelize.FLOAT
        }
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};