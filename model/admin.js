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
            unique: {
                args: true,
                msg: 'Username address already in use!'
            },
            validate: {
                validateUsername: function(username) {
                    if(username.length < 6 || username.length > 15){
                        throw new Error('Username must be at least 6 characters and utmost 15 characters long!')
                    }
                }
            }
        },
        PASSWORD: {
            type: Sequelize.STRING(15),
            allowNull: false,
            validate: {
                validatePassword: function(password) {
                    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))) {
                        throw new Error('The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, one number and one special character!');
                    }
                }
            }
        }, 
    }, {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};