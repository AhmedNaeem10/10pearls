module.exports = (sequelize, Sequelize) => {
    return CARD_DETAIL = sequelize.define("CARD_DETAILS", {
        id: {
            type: Sequelize.INTEGER,
            field: "CARD_ID",             
            autoIncrement: true,       
            primaryKey: true,
            allowNull: false
        },
        CUSTOMER_ID: {
            type: Sequelize.INTEGER
        },
        MM: {
            type: Sequelize.STRING(2)
        }, 
        YYYY: {
            type: Sequelize.STRING(4)
        },
        CARD_NUM: {
            type: Sequelize.STRING(4)
        },
        CVC: {
            type: Sequelize.STRING(4)
        }
    }, {
        timestamps: false,
        
        
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};