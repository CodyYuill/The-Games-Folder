
const db = require("../models");
const Sequelize = require("sequelize");
const axios = require("axios");
const Op = Sequelize.Op;


module.exports = function(app) {


    //GAMES ROUTES
    app.get("/api/all-games", (req, res) => {
        db.Game.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get("/api/games/:game", (req, res) => {
        db.Game.findOne({
            where:{
                game_slug: {
                    [Op.like]: `%${req.params.game}%`
                }
            },
            include: [db.Review]
        }).then(function(result){
            // console.log(result);
            var ourData = result.dataValues;
            //grab rest of info thats we arent storing in the database from RAWG
            axios.get(`https://api.rawg.io/api/games/${ourData.game_slug}`).then(function(results2){
                console.log("made call to RAWG for additional info");
                //console.log(results2.data);
                var theirData = results2.data;
                res.render("product", {ourData, theirData});
            });
        });
    });

    app.get("/api/platforms/:platform", (req, res) => {
        db.Game.findAll({
            where:{
                platform_slug: {
                    [Op.like]: `%${req.params.platform}%`
                }
            }
        }).then(function(result){
            res.json(result);
        });
    });

    app.get("/api/genres/:genre", (req, res) => {
        db.Game.findAll({
            where:{
                genre_slug: {
                    [Op.like]: `%${req.params.genre}`
                }
            }
        }).then(function(result){
            res.json(result);
        });
    });

    //REVIEW ROUTES
    app.post("/api/add-review", (req, res) => {
        db.Review.create(req.body).then(function(result){
            res.json(result);
        });
    });
};