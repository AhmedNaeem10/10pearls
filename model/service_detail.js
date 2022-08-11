module.exports = (sequelize, Sequelize) => {
    return SERVICE_DETAIL = sequelize.define("SERVICE_DETAILS", {
        id: {
            type: Sequelize.INTEGER,
            field: "SERVICE_DETAIL_ID",
            primaryKey: 1,
            autoIncrement: 1      
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