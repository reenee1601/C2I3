
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/';




















const mongoose = require('mongoose');

// Replace 'your-mongodb-uri' with your actual MongoDB connection string.
const mongoURI ='mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = {
  db: mongoose.connection,
};

