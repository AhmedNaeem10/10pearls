/**
 * @swagger
 * components:
 *   schemas:
 *     WORKERS:
 *       type: object
 *       required:
 *         - FIRST_NAME
 *         - LAST_NAME
 *         - PHONE
 *         - DOB
 *         - CNIC
 *         - ADDRESS
 *       properties:
 *         WORKER_ID:
 *           type: integer
 *           description: The auto-generated id of the worker
 *         FIRST_NAME:
 *           type: string
 *           description: The worker's first name
 *         LAST_NAME:
 *           type: string
 *           description: The worker's last name
 *         DOB:
 *           type: string
 *           description: The worker's date of birth
 *         PHONE:
 *           type: string
 *           description: The worker's phone no.
 *         EMAIL:
 *           type: string
 *           description: The worker's email address, if any
 *         CNIC:
 *           type: string
 *           description: The worker's ID no.
 *         ADDRESS:
 *           type: string
 *           description: The worker's residential address
 *         AVAILABLE:
 *           type: boolean
 *           description: The worker's availability status
 *         RATING:
 *           type: number
 *           description: The worker's overall rating
 *       example:
 *         WORKER_ID: 6
 *         FIRST_NAME: Bilal
 *         LAST_NAME: Khan
 *         DOB: 
 *         PHONE: 
 *         CNIC:
 *         EMAIL:
 *         ADDRESS: 
 *         AVAILABLE:
 *         RATING: 
 * 
 * 
 */
module.exports = (sequelize, Sequelize) => {
    return WORKER = sequelize.define("WORKERS", {
        id: {
            type: Sequelize.INTEGER,
            field: "WORKER_ID",             
            autoIncrement: true,       
            primaryKey: true,
            allowNull: false
        },
        EMAIL: {
            type: Sequelize.STRING(50)
        },
        FIRST_NAME: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        LAST_NAME: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        DOB: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        PHONE: {
            type: Sequelize.STRING(11),
            unique: true,
            allowNull: false
        },
        CNIC: {
            type: Sequelize.STRING(13),
            unique: true,
            allowNull: false
        },
        ADDRESS: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        AVAILABLE: {
            type: Sequelize.BOOLEAN
        },
        RATING: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        
        // account creation time
        createdAt: true,

        // If don't want updatedAt
        updatedAt: false,
    });
};