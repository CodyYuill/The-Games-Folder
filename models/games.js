// Creating our Game model
module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        name:{
            type: DataTypes.STRING
        },
        slug:{
            type: DataTypes.STRING
        },
        genres:{
            type: DataTypes.STRING
        },
        platforms:{
            type: DataTypes.STRING
        },
        inventory:{
            type: DataTypes.INTEGER
        }
    });

    //to link reviews
    // Author.associate = function(models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
    //     Author.hasMany(models.Post, {
    //       onDelete: "cascade"
    //     });
    //   };

    return Game;
};