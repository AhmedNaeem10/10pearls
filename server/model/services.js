/**
 * @swagger
 * components:
 *   schemas:
 *     SERVICES:
 *       type: object
 *       required:
 *         - SERVICE_TITLE
 *       properties:
 *         SERVICE_ID:
 *           type: integer
 *           description: The auto-generated id of service
 *         SERVICE_TITLE:
 *           type: string
 *           description: The name of the service
 *         SERVICE_DESCRIPTION:
 *           type: string
 *           description: Service information
 *         SERVICE_IMAGE:
 *           type: string
 *           description: Sample picture of the service
 *         SERVICE_RATE:
 *           type: number
 *           description: Service charges
 *       example:
 *         SERVICE_ID: 6
 *         SERVICE_TITLE: Sofa Cleaning
 *         SERVICE_DESCRIPTION: Kam Kaj brings you extraordinary sofa cleaning services. We use advanced technology, imported chemicals.
 *         SERVICE_IMAGE: 
 *         SERVICE_RATE: 500
 * 
 * 
 */


module.exports = (sequelize, Sequelize) => {
    return SERVICE = sequelize.define("SERVICE", {
        id: {
            type: Sequelize.INTEGER,
            field: "SERVICE_ID",
            primaryKey: true,
            autoIncrement: true      
        },
        SERVICE_TITLE: {
            type: Sequelize.TEXT
        },
        SERVICE_DESCRIPTION: {
            type: Sequelize.TEXT
        }, 
        SERVICE_IMAGE: {
            type: Sequelize.TEXT
        },
        SERVICE_RATE: {
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