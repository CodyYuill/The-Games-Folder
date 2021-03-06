
const db = require("../models");

module.exports = function(app) {

    app.get("/api/all-games", (req, res) => {
        db.Game.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get("/api/:game", (req, res) => {
        db.Game.findOne({
            where:{
                slug: req.params.game
            }
            //include: [db.reviews] if we get there
        }).then(function(result){
            //grab rest of info thats we arent storing in the database from RAWG
            res.json(result);
        });
    });

    app.post("/api/", (req, res) => {

    });
};
