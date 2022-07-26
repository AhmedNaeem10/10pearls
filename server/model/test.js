module.exports = (sequelize, Sequelize) => {
    return TEST = sequelize.define("TESTS", {
        id: {
            type: Sequelize.INTEGER,
            field: "id",             
            autoIncrement: 1,       
            primaryKey: 1
        },
        TEST: {
            type: Sequelize.INTEGER
        },
        PARA: {
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