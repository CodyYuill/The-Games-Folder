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
        inventory:{
            type: DataTypes.INTEGER
        }
    });
    return Game;
};