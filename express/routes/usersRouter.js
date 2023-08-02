var express = require('express');
var router = express.Router();
const User = require('../models/User');

// Register endpoint
router.post('/register', async (request, response) => {
  const { email, password, company, name } = request.body;

  try {
    // Check if the email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).send({
        message: 'Email already exists. Please use a different email.',
      });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance and save it to the database
    const newUser = new User({
      name,
      company,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    response.status(201).send({
      message: 'User Created Successfully',
      user: savedUser,
    });
  } catch (error) {
    response.status(500).send({
      message: 'Error creating user',
      error: error.message,
    });
  }
});


module.exports = router;
