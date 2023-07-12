const { MongoClient, ServerApiVersion } = require('mongodb');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://test_user:x1J0mwtzs6qEeie9@cluster0.it8bkdo.mongodb.net/?retryWrites=true&w=majority";

//start client
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// enter database name (collection is not database)
var dbName = "test"; 

try {
    db = client.db(dbName);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

} catch (e) {
    console.error("databsase connection failed " + e);
}

async function cleanup(){
    // Ensures that the client will close when you finish/error
    await client.close();

    //NOTE: currently disconenct is not working yet, but it kinda works to terminate lol
    await client.disconnect();
}


module.exports = {db, cleanup};


