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
            type: Sequelize.FLOAT
        }
    }, {
        timestamps: false,
        
        // account creation time
        createdAt: true,

        // If don't want updatedAt
        updatedAt: false,
    });
};