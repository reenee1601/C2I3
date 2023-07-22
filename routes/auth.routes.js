const { verifySignUp } = require("../middlewares/verifySignUp");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateEmail
    ],
      controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/signout", controller.signout);
};
