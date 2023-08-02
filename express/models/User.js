const mongoose = require('mongoose');
//encrypting password
//let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let userSchema = new Schema({
     userId: {type: String},
     name: {type: String, required: [true, "Please provide name!" ]},
     company: {type: String, required: [true, "Please provide company name!"]},
     email: {type: String, required: [true, "Please provide an Email!"] , unique: true},
     password: {type: String, required: [true, "Please provide a password!"], minlength: 8},
});



//encrypting password while registering new users using middleware pre(save)
// userSchema.pre('save', function(next){
//      if (this.password && this.isModified('password')){
//           bcrypt.hash(this.password, 10, (err, hashed) => {
//                if (err) return next(err);
//                this.password = hashed;
//                next();
//           });
//      } else {
//           next();
//      }
// });

// //check if passwords match
// userSchema.methods.checkPassword = function (password) {
//      return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;

