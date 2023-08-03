const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const connection = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      
      // Check if the email is missing or empty
      if (!email || email.trim() === '') {
        return res.status(400).send({
          message: 'Email is required.',
        });
      }

      // Check if the email is too long
      const maxEmailLength = 255; // Assuming a maximum email length of 255 characters
      if (email.length > maxEmailLength) {
        return res.status(400).send({
          message: 'Email is too long. Please use a shorter email.',
        });
      }

      // Check if the password is too short
      const minPasswordLength = 8; // Assuming a minimum password length of 8 characters
      if (password.length < minPasswordLength) {
        return res.status(400).send({
          message: 'Password is too short. Please use a longer password.',
        });
      }

      // Check if the name is too long
      const maxNameLength = 50; // Assuming a maximum name length of 50 characters
      if (name.length > maxNameLength) {
        return res.status(400).send({
          message: 'Name is too long. Please use a shorter name.',
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


exports.signin = async function(req, res, next){
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: 'Email not found',
      });
    }

    // Compare the password entered and the hashed password found
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({
        message: 'Passwords do not match',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      'RANDOM-TOKEN', // Replace "RANDOM-TOKEN" with your actual JWT secret key
      { expiresIn: '24h' }
    );

    // Return success response
    res.status(200).send({
      message: 'Signin Successful',
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error signing in',
      error: error.message,
    });
  }
};