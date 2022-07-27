module.exports = (sequelize, Sequelize) => {
    return ADMIN = sequelize.define("ADMINS", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: 1,
            autoIncrement: 1      
        },
        USERNAME: {
            type: Sequelize.TEXT
        },
        PASSWORD: {
            type: Sequelize.TEXT
        }, 
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};