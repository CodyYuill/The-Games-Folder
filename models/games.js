// Creating our Game model
module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        name:{
            type: DataTypes.STRING
        },
        game_slug:{
            type: DataTypes.STRING
        },
        platforms:{
            type: DataTypes.STRING
        },
        platform_slug:{
            type: DataTypes.STRING
        },
        genres:{
            type: DataTypes.STRING
        },
        genre_slug:{
            type: DataTypes.STRING
        },
        inventory:{
            type: DataTypes.INTEGER
        }
    });

    //to link reviews
    Game.associate = function(models) {
        // Associating Review with Posts
        // When an Review is deleted, also delete any associated Posts
        Game.hasMany(models.Review, {
            onDelete: "cascade"
        });
    };

    return Game;
};