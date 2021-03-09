
const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = function(app) {

    app.get("/", (req, res) => {
        res.render("homesearch");
    });
    //GAMES ROUTES
    app.get("/api/all-games", (req, res) => {
        db.Game.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get("/api/games/:game", (req, res) => {
        db.Game.findOne({
            where:{
                game_slug: req.params.game
            },
            include: [db.Review]
        }).then(function(result){
            console.log("hithitihihithithith");
            console.log(result.dataValues);
            var data = result.dataValues;
            //grab rest of info thats we arent storing in the database from RAWG
            res.render("product", {data});
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