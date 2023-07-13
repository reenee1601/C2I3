let = mongoose = require('mongoose');
//encrypting password
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let userSchema = new Schema({
     name: {type: String, require: true},
     company: {type: String, require: true},
     email: {type: String, require: true, unique: true},
     password: {type: String, require: true, minlength: 8},
});

//encrypting password while registering new users using middleware pre(save)
userSchema.pre('save', function(next){
     if (this.password && this.isModified('password')){
          bcrypt.hash(this.password, 10, (err, hashed) => {
               if (err) return next(err);
               this.password = hashed;
               next();
          });
     } else {
          next();
     }
});

//check if passwords match
userSchema.methods.checkPassword = function(password, cb){
     bcrypt.compare(password, this.password, (err, result) => {
          return cb(err, result);
     });
};

const User = mongoose.model('User', userSchema);

module.exports = User;