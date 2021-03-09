const db = require("../models");
const jwt = require("jsonwebtoken");

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

module.exports = function (app) {
    app.post("/api/", (req, res) => {});

    app.get("/api/", (req, res) => {});

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
        // console.log(req.body);
        // res.json(req.body);
    });
};
