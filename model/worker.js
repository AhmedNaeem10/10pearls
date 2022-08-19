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
            type: Sequelize.STRING(50),
            unique: {
                args: true,
                msg: 'Email address already in use!'
            },
            validate: {
                isEmail: true
            }
        },
        FIRST_NAME: {
            type: Sequelize.STRING(15),
            allowNull: false,
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
            allowNull: false,
            validate: {
                validateName: function(last_name){
                    if(!(/^[a-zA-Z]+$/.test(last_name))){
                        throw new Error('Name can only have alphabets!');
                    }
                }
            }
        },
        DOB: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        PHONE: {
            type: Sequelize.STRING(11),
            allowNull: false,
            validate: {
                validatePhone: function(phone) {
                    if(!(/^[0-9]{11,}$/.test(phone))){
                        throw new Error('Phone number can only have digits!');
                    }
                }
            }
        },
        CNIC: {
            type: Sequelize.STRING(13),
            unique: true,
            allowNull: false,
            validate: {
                validateCnic: function(cnic) {
                    if(cnic){
                        if(!(/^[0-9]{5,}-[0-9]{7,}-[0-9]$/.test(cnic))){
                            throw new Error('Invalid cnic');
                        }
                    }
                }
            }
        },
        ADDRESS: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                validateAddress: function(address) {
                    if(address.length < 10 || address.length > 100){
                        throw new Error('Invalid address');
                    }
                }
            }
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
