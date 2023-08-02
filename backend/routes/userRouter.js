var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const register = userController.register;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/usersRegister', register);

module.exports = router;
