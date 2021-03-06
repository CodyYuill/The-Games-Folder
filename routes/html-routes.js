module.exports = function (app) {
    app.get("/", (req, res) => {
        res.render("filetoname");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    });


    app.get("/login", (req, res) => {
        res.render("login");
    });

    

    app.get("/logout", (req, res) => {});
};
