const db = require("../models");

module.exports = function (app) {
    app.post("/api/", (req, res) => {});

    app.get("/api/", (req, res) => {});

    app.post("/api/login", (req, res) => {
        console.log(req.body);
        res.json(req.body);
        //res.send("login user");
    });

    app.post("/api/signup", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
        })
            .then(function (response) {
               // res.redirect(307, "/api/login");
               res.status(201).json(response);
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
        //console.log(req.body);
        //res.json(req.body);
    });
};
