//db.js too establish the connection with the MongoDB database connection
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = process.env.DATABASE_URL;
//enter the database name in the env file
const dbName = process.env.DATABASE_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
})

db.once("connected", () => {
    console.log("Database Connected");
});

try {
    client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(e){
    console.error("database connection failed" + e);
} 

async function cleanup(){
    //Ensures the client will close when you finish/error
    await client.close();
    await client.disconnect();
}

module.exports = {db, cleanup};
