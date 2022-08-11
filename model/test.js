module.exports = (sequelize, Sequelize) => {
    // define schema for each table
    return TEST = sequelize.define("TESTS", {
        id: {
            type: Sequelize.INTEGER,
            field: "TEST_ID",             
            primaryKey: 1,
            autoIncrement: 1
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