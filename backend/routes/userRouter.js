var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const {register, signin} = userController

// Register endpoint --> WORKED!! tested in postman
router.post('/register', async (request, response) => {
  try {
    // Call the register function from the userController
    await register(request, response);
  } catch (error) {
    response.status(500).send({
      message: 'Error in user registration',
      error: error.message,
    });
  }
});

// Signin endpoint --> WORKED!! tested in postman
router.post('/signin', signin);

module.exports = router;
