

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render('filetoname')
  });

  app.get("/product", (req, res) => {
    res.render('product')
  });

};
