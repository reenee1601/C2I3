var express = require('express');
var router = express.Router();

let User = require('../models/User');

/*GET users listing*/
router.get('/', function(req,res,next){
    res.send('respond with a resource');
});

/*Register new user*/
/*handle GET request on /users/register route we can send response as the userRegistrationForm.ejs file to the browser */
router.get('/register', (req, res, next) => {
    res.rend('userRegistrationForm');
});

router.post('/register', (req,res,next) => {
    data = req.body;
    User.create(data, (err,user) => {
        if (err) return next(err);

        res.redirect('/users/login/');
    });
});

/*handling login*/
router.get('/login', (req, res, next) => {
    res.render('userLoginForm');
});

/*handle POST request*/
router.post('/login', (req, res, next) => {
    let {email, password} = req.body;
    if (!email || !password){
        return res.redirect('/users/login');
    }

    User.findOne({email}, (err, user) => {
        if (err) return next(err);

        if (!user){
            return res.redirect('users/login');
        } else{
            user.checkPassword(password, (err, result) => {
                if (err) return next(err);
                if (!result){
                    console.log('invalid password');
                    res.redirect('/users/login');
                } else {
                    res.send('Login successful');
                }
            });
        }
    });
});

module.exports = router;