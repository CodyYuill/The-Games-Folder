// Creating our Review model
module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        body:{
            type: DataTypes.STRING(1000),
            allowNull: false,
            validate: {
                len: [1, 1000]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            validate:{
                isNumeric: true,
                min: 1,
                max: 10
            }
        }
    });
    //to link games and users
    Review.associate = function(models) {
        // We're saying that a Review should belong to an Game
        // A Review can't be created without a Game due to the foreign key constraint
        Review.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
            }
        });
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Review;
};
