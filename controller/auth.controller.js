const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const uuid = require('uuid');

var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // Generate a UUID for the userId
  const userId = uuid.v4(); // v4() generates a random UUID
  const user = new User({
    userId,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    user.checkPassword(req.body.password, (err, passwordIsValid) =>{
      if (err){
        res.status(500).send({message:err});
        return;
      }

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',

                                expiresIn: 86400, // 24 hours
                              });

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        email: user.email,
      });
    });
});
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({message: "Error while signing out!"});
  }
};
