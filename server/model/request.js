module.exports = (sequelize, Sequelize) => {
    return REQUEST = sequelize.define("REQUESTS", {
        id: {
            type: Sequelize.INTEGER,
            field: "REQUEST_ID",
            primaryKey: 1,
            autoIncrement: 1      
        },
        CUSTOMER_ID: {
            type: Sequelize.INTEGER
        },
        DATE_TIME: {
            type: Sequelize.DATE
        }, 
        REQUEST_STATUS: {
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