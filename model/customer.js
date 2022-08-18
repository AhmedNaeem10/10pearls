module.exports = (sequelize, Sequelize) => {
    return CUSTOMER = sequelize.define("CUSTOMERS", {
        id: {
            type: Sequelize.INTEGER,
            field: "CUSTOMER_ID",             
            autoIncrement: true,       
            primaryKey: true,
            allowNull: false
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
        EMAIL: {
            type: Sequelize.STRING(50),
            unique: {
                args: true,
                msg: 'Email address already in use!'
            },
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        FIRST_NAME: {
            type: Sequelize.STRING(15),
            validate: {
                validateName: function(first_name){
                    if(!(/^[a-zA-Z]+$/.test(first_name))){
                        throw new Error('Name can only have alphabets!');
                    }
                }
            }
        },
        LAST_NAME: {
            type: Sequelize.STRING(15),
            validate: {
                validateName: function(last_name){
                    if(!(/^[a-zA-Z]+$/.test(last_name))){
                        throw new Error('Name can only have alphabets!');
                    }
                }
            }
        },
        DOB: {
            type: Sequelize.DATEONLY
        },
        PHONE: {
            type: Sequelize.STRING(11),
            unique: true,
            validate: {
                validatePhone: function(phone) {
                    if(!(/^[0-9]+$/.test(str))){
                        throw new Error('Phone number can only have digits!');
                    }
                }
            }
        },
        CNIC: {
            type: Sequelize.STRING(15),
            unique: true
        },
        ADDRESS: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false,
        
        // account creation time
        createdAt: true,

        // If don't want updatedAt
        updatedAt: false,
    });
};
