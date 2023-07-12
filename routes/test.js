var express = require('express');
const testModel = require('../models/test.js');
var router = express.Router();

// AJAX end points
router.get('/all/', async function(req, res, next) {
    const test = await testModel.all();
    res.send(`${JSON.stringify(test)}`);
});

// View end points
/** render the add page */
router.get('/', async function(req, res, next) {
    res.render('test', { title:'Test'})
})

module.exports = router;





