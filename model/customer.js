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
            type: Sequelize.STRING(100)
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
            type: Sequelize.STRING(15),
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
