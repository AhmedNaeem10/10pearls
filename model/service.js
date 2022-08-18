module.exports = (sequelize, Sequelize) => {
    return SERVICE = sequelize.define("SERVICE", {
        id: {
            type: Sequelize.INTEGER,
            field: "SERVICE_ID",
            primaryKey: 1,
            autoIncrement: 1      
        },
        SERVICE_TITLE: {
            type: Sequelize.TEXT,
            validate: {
                validateTitle: function(title) {
                    if(title.length > 15){
                        throw new Error('Invalid title!');
                    }
                }
            }
        },
        SERVICE_DESCRIPTION: {
            type: Sequelize.TEXT, 
            validate: {
                validateDescription: function(description) {
                    if(description.length > 100){
                        throw new Error('Invalid description!');
                    }
                }
            }
        }, 
        SERVICE_IMAGE: {
            type: Sequelize.TEXT
        },
        SERVICE_RATE: {
            type: Sequelize.FLOAT,
            validate: {
                validateRate: function(rate) {
                    if(rate < 0 || rate > 10000){
                        throw new Error('Invalid rate!');
                    }
                }
            }
        }
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};