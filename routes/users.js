var express = require('express');
var router = express.Router();

const User = require('../models/User');

/*GET users listing*/
// router.get('/', function(req,res,next){
//     res.send('respond with a resource');
// });

/*Register new user*/
router.get('/register', (req, res, next) => {
    res.rend('RegistrationPage');
});

router.post('/register', (req,res,next) => {
    const data = req.body;
    User.create(data, (err,user) => {
        if (err) return next(err);

        res.redirect('/users/sigin/');
    });
});

/*handling login*/
router.get('/login', (req, res, next) => {
    res.render('Signin');
});

/*handle POST request*/
router.post('/signin', (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.redirect('/users/signin');
    }

    User.findOne({email}, (err, user) => {
        if (err) return next(err);

        if (!user){
            return res.redirect('users/signin');
        } else{
            user.checkPassword(password, (err, result) => {
                if (err) return next(err);
                if (!result){
                    console.log('invalid password');
                    res.redirect('/users/signin');
                } else {
                    res.send('Login successful');
                }
            });
        }
    });
});

module.exports = router;