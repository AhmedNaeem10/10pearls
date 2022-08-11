module.exports = (sequelize, Sequelize) => {
    return ADMIN = sequelize.define("ADMINS", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true      
        },
        USERNAME: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true
        },
        PASSWORD: {
            type: Sequelize.STRING(15),
            allowNull: false
        }, 
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};