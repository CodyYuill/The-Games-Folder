const db = require("../models");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const axios = require("axios");
const Op = Sequelize.Op;

const handlerrors = (err) => {
    console.log(err.message, err.code);
    let error = {
        email: "",
        password: "",
    };

    if (err.errors[0].type == "unique violation") {
        error.email = "That email is alrealdy registered";
        //console.log(error);
        return error;
    }

    if (err.message.includes("Validation error")) {
        var errval = err.errors;
        errval.forEach((element) => {
            error[element.path] = element.message;
        });
    }
    return error;
};

var maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "gamekeytogame", {
        expiresIn: maxAge,
    });
};




module.exports = function(app) {

    app.post("/api/login", (req, res) => {
        //console.log(req.body);
        //res.json(req.body);
        //res.send("login user");
        var emailval = req.body.email;
        var passwordval = req.body.password;

        db.User.findOne({
            where: {
                email: emailval,
            },
        })
            .then(function (dbUser) {
                if (!dbUser) {
                    res.send("Invalid email");
                } else if (!dbUser.validPassword(passwordval)) {
                    res.send("Invalid password");
                }else{
                    const token = createToken(dbUser.id);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });
                    res.status(201).json(dbUser);
                }
            })
           
    });

    app.post("/api/signup", (req, res) => {
        //console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
        })
            .then(function (response) {
                // res.redirect(307, "/api/login");
                const token = createToken(response.id);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });
                res.status(201).json(response);
            })
            .catch(function (err) {
                const errors = handlerrors(err);
                res.status(401).json(errors);

                //console.log(err);
            });
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
                game_slug: {
                    [Op.like]: `%${req.params.game}%`
                }
            },
            include: {
                model: db.Review, 
                include: {
                    model: db.User
                }
            }
        }).then(function(result){
            //console.log(result.dataValues.Reviews[0]);
            var ourData = result.dataValues;
            //grab rest of info thats we arent storing in the database from RAWG
            axios.get(`https://api.rawg.io/api/games/${ourData.game_slug}`).then(function(results2){
                console.log("made call to RAWG for additional info");
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