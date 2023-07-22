const express = require("express");
const cors = require("cors");   
const cookieSession = require("cookie-session");    //help to stores the session data on the client within a cookie
const dbConfig = require("./config/db.config");
const app = express();



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
  
//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

async function startServer() {
    //connection to mongoDB database
    const db = require("./models");

    await db.mongoose
      .connect(dbConfig.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Successfully connect to MongoDB.");
      })
      .catch(err => {
        console.error("Connection error", err);
        process.exit();
      });

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}

// setup for testing
// if it is in a test environment, the `app` object will be exported
// and mongoose connection wont be made
// and it wont listen to the port
if (process.env['NODE_DEV'] == 'TEST') {
    app.post('/close-mongoose-connection', (req, res) => {
        mongoose.connection.close(() => {
            res.send('mongoose connection closed');
        });
        
    });
    module.exports = app;
} else {
    startServer();
}
