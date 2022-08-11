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