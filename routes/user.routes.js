const { authJwt } = require("../middlewares/authJwt");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", authJwt, (req, res) => {
    //the route will only be accessible if the token is valid and the user is authenticated
    res.json({ message: "Authenticated route for the user!" });
  });

};