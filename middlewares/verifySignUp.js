//const db = require("../models");
//const User = dbConnect.User;
const User = require("../models/User");

const checkDuplicateEmail = async (req, res, next) => {
    // Email
    try{
      const user = await User.findOne({email: req.body.email});

      if (user) {
        return res.status(400).send({message: "Failed! Email is alaready in use!"});
      }

      next();
    } catch(err){
      res.status(500).send({ message: err });
    }

    // User.findOne({
    //   email: req.body.email
    // }).exec((err, user) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }

      // if (user) {
      //   res.status(400).send({ message: "Failed! Email is already in use!" });
      //   return;
      // }

      // next();
    
};

const verifySignUp = {checkDuplicateEmail};

module.exports = {verifySignUp};