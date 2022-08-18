module.exports = (sequelize, Sequelize) => {
    return REVIEW = sequelize.define("REVIEWS", {
        id: {
            type: Sequelize.INTEGER,
            field: "REVIEW_ID",
            primaryKey: true,
            autoIncrement: true      
        },
        JOB_ID: {
            type: Sequelize.INTEGER
        },
        RATING: {
            type: Sequelize.INTEGER,
            validate: {
                validateRating: function(rating){
                    if(rating < 0 || rating > 5){
                        throw new Error('Invalid rating!');
                    }
                }
            }
        }, 
        FEEDBACK: {
            type: Sequelize.TEXT,
            validate: {
                validateRating: function(feedback){
                    if(feedback.length < 5 || feedback.length > 100){
                        throw new Error('Invalid feedback!');
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