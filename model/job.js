module.exports = (sequelize, Sequelize) => {
    return JOB = sequelize.define("JOBS", {
        id: {
            type: Sequelize.INTEGER,
            field: "JOB_ID",             
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
            type: Sequelize.STRING,
            allowNull: false
        },
        PAYMENT_METHOD: {
            type: Sequelize.STRING(15)
        },
        JOB_STATUS: {
            type: Sequelize.STRING(15)
        },
        ADDRESS: {
            type: Sequelize.TEXT,
            validate:{
                validateAddress: function(address){
                    if(address.length < 5 || address.length > 100){
                        throw new Error('Invalid Address');
                    }
                }
            }
        }
    }, {
        timestamps: false,
        
        
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};