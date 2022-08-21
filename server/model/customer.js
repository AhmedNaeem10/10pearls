/**
 * @swagger
 * components:
 *   schemas:
 *     CUSTOMERS:
 *       type: object
 *       required:
 *         - CUSTOMER_ID
 *         - USERNAME
 *         - PASSWORD
 *         - EMAIL
 *       properties:
 *         CUSTOMER_ID:
 *           type: integer
 *           description: The auto-generated id of customer
 *         USERNAME:
 *           type: string
 *           description: The customer's username
 *         PASSWORD:
 *           type: string
 *           description: The customer's password
 *         EMAIL:
 *           type: string
 *           description: The customer's email address
 *         FIRST_NAME:
 *           type: string
 *           description: The customer's first name
 *         LAST_NAME:
 *           type: string
 *           description: The customer's last name
 *         DOB:
 *           type: string
 *           description: The customer's date of birth
 *         PHONE:
 *           type: string
 *           description: The customer's phone no.
 *         CNIC:
 *           type: string
 *           description: The customer's ID no.
 *         ADDRESS:
 *           type: string
 *           description: The customer's address
 *       example:
 *         CUSTOMER_ID: 6
 *         USERNAME: sara.jamal
 *         EMAIL: sara123@gmail.com
 *         PASSWORD: Sara@123
 *         FIRST_NAME: Sara
 *         LAST_NAME: Jamal
 *         DOB: 
 *         PHONE: 
 *         CNIC:
 *         ADDRESS: 
 * 
 * 
 */

module.exports = (sequelize, Sequelize) => {
    return CUSTOMER = sequelize.define("CUSTOMERS", {
        id: {
            type: Sequelize.INTEGER,
            field: "CUSTOMER_ID",             
            autoIncrement: true,       
            primaryKey: true,
            allowNull: false
        },
        USERNAME: {
            type: Sequelize.STRING(15)
        },
        PASSWORD: {
            type: Sequelize.STRING
        }, 
        EMAIL: {
            type: Sequelize.STRING(50)
        },
        FIRST_NAME: {
            type: Sequelize.STRING(15)
        },
        LAST_NAME: {
            type: Sequelize.STRING(15)
        },
        DOB: {
            type: Sequelize.DATEONLY
        },
        PHONE: {
            type: Sequelize.STRING(11),
            unique: true
        },
        CNIC: {
            type: Sequelize.STRING(13),
            unique: true
        },
        ADDRESS: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false,
        
        // account creation time
        createdAt: true,

        // If don't want updatedAt
        updatedAt: false,
    });
};
