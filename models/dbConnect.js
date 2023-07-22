// // const mongoose = require("mongoose");
// // const dbConfig = require("../config/db.config");
// // const User = require('./User');

// async function dbConnect() {
//     mongoose.connect(dbConfig.URL,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//         initial();
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });
// }

// function initial() {
//     User.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         // Replace the following data with the initial user registration details
//         const userData = {
//           email: "admin@example.com",
//           password: "adminpassword",
//           name: "Admin User",
//           company: "Example Company",
//         };
  
//         // hash the password
//         bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
//           if (err) {
//             console.log("Error hashing password", err);
//           } else {
//             // create a new user instance and collect the data
//             const newUser = new User({
//               email: userData.email,
//               password: hashedPassword,
//               name: userData.name,
//               company: userData.company,
//             });
  
//             // save the new user
//             newUser.save((err) => {
//               if (err) {
//                 console.log("Error creating user", err);
//               } else {
//                 console.log("User registered successfully");
//               }
//             });
//           }
//         });
//       }
//     });
//   }

// module.exports = dbConnect;

