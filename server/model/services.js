module.exports = (sequelize, Sequelize) => {
    return SERVICE = sequelize.define("SERVICES", {
        id: {
            type: Sequelize.INTEGER,
            field: "SERVICE_ID",             
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
        }
    }, {
        timestamps: false,
        
        
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};