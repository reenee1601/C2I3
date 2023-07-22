const express = require("express");
const cors = require("cors");   
const cookieSession = require("cookie-session");    //help to stores the session data on the client within a cookie
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users'); // Import the user routes
const bcrypt = require("bcrypt");
const User = require('./models/User');
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const jwt = require("jsonwebtoken");

async function dbConnect() {
  mongoose.connect(dbConfig.URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
  })
  .catch(err => {
      console.error("Connection error", err);
      process.exit();
  });
}

async function initial() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      // Replace the following data with the initial user registration details
      const userData = {
        email: "admin@example.com",
        password: "adminpassword",
        name: "Admin User",
        company: "Example Company",
      };

      // generate a salt (a random value used for hashing)
      const salt = await bcrypt.genSalt(10);

      // hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // create a new user instance and collect the data
      const newUser = new User({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        company: userData.company,
      });

      // save the new user
      await newUser.save();
      console.log("User registered successfully");
    }
  } catch (err) {
    console.log("Error creating user", err);
  }
}

module.exports = dbConnect;

// execute database connection 
dbConnect();


var corsOptions = {
    origin: "http://localhost:8081"
};
//allowing request from specific origin which is the port 8081
app.use(cors(corsOptions));
  
// parse requests of content-type - application/json (to handle JSON data)
app.use(express.json());
  
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
  
app.use(
    cookieSession({
      name: "login/registration session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true
    })
);


// simple route 
app.get("/", (req, res) => {
    res.json({ message: "Welcome to login/registration page." });
});

// register endpoint
app.post("/register", async (request, response) => {
  try {
    const { email, password, company, name } = request.body;

    // generate a salt (a random value used for hashing)
    const salt = await bcrypt.genSalt(10);

    // hash the password with the generated salt
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // create a new user instance and collect the data
    const user = new User({
      email,
      password: hashedPassword,
      company,
      name
    });

    // save the new user
    const result = await user.save();

    response.status(201).send({
      message: "User Created Successfully",
      result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});


app.post("/signin", async (request, response) => {
  try {
    // check if email exists
    const user = await User.findOne({ email: request.body.email });

    // if email does not exist
    if (!user) {
      return response.status(404).send({
        message: "Email not found",
      });
    }

    // compare the password entered and the hashed password found
    const passwordMatch = await bcrypt.compare(request.body.password, user.password);

    // if the passwords do not match
    if (!passwordMatch) {
      return response.status(400).send({
        message: "Passwords do not match",
      });
    }

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    // return success response
    response.status(200).send({
      message: "Login Successful",
      email: user.email,
      token,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error signing in",
      error: error.message,
    });
  }
});


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes); // Mount the user routes

  
//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
