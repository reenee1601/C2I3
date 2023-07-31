const { MongoClient } = require('mongodb');

// Replace the MongoDB connection URL and database name with your actual MongoDB information
const mongoURL = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/';
const dbName = 'project_data';
const collectionName = 'soa';

// Function to retrieve all data from the collection using MongoDB driver
async function retrieveDataFromMongoDB() {
  const client = new MongoClient(mongoURL);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve all data from the collection
    const data = await collection.find({}).toArray();
    console.log(data);
    return data;
    
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    throw error;
  } finally {
    client.close();
  }
}

retrieveDataFromMongoDB();