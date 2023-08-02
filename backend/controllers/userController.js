const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const connection = require('../db.js');
const bcrypt = require('bcrypt');

exports.register = async function(req, res, next){
    const { email, password, company, name } = req.body;

    try {
      // Check if the email already exists in the database
      connection;
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        return res.status(400).send({
          message: 'Email already exists. Please use a different email.',
        });
      }
  
      // Hash the password with bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user instance and save it to the database
      const newUser = new userModel({
        name,
        company,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      res.status(201).send({
        message: 'User Created Successfully',
        user: savedUser,
      });
    } catch (error) {
      res.status(500).send({
        message: 'Error creating user',
        error: error.message,
      });
    }
}