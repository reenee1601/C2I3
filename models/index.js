// //initialize the mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");

module.exports = db;


// /** the application can have a single point of reference (db object) 
//  * for managing the Mongoose connection and accessing the models, 
//  * promoting modularity and ease of use throughout the application. */