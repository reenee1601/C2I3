// Assuming you have already installed and required the "john-package" and "mongoose" in your application
const mongoose = require('mongoose');
const productModel = require('../models/productModel.js');


// Function to upload data to MongoDB
async function uploadDataToMongoDBProd(data) {

    try {
      // TODO: make this connection more modular
      const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // Save the extracted data to the products collection
      await productModel.create(data);
  
      console.log('Data uploaded to MongoDB successfully!');
      console.log(data);
    } catch (error) {
      console.error('Error uploading data to MongoDB:', error);
    } finally {
      mongoose.disconnect();
    }
  }

exports.handleUploadProd = async function handleUploadProd(req, res, next){
  try{
    const data = req.body;
    await uploadDataToMongoDBProd(data);
    console.log('OCR data extracted and uploaded to MongoDB successfully!');
  } catch (error) {
    console.error('Error processing OCR and uploading to MongoDB:', error);
  }

}

exports.getProdDataFromMongoDB = async function getProdDataFromMongoDB(req, res, next) {
try {

    const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
    await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    const prodData = await productModel.find(); // Fetch all documents from the 'products' collection
    console.log("IT CONNECTED")
    console.log(prodData);
    mongoose.disconnect();
    res.json(prodData);

} catch (error) {
    console.error('Error fetching products data from MongoDB:', error);
    throw error;
}
}

async function getProdDataById(id) {
    try {
      const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const specificProdData = await productModel.findById(id); // Fetch data from the 'products' collection based on the _id
  
      mongoose.disconnect();
      return specificProdData;
  
    } catch (error) {
      console.error('Error fetching specific products data from MongoDB:', error);
      throw error;
    }
  }
  
exports.getProdDataUsingId = async function getProdDataUsingId(req, res, next){
try {
    const { id } = req.params; // Extract the _id from the URL parameter
    const specificProdData = await getProdDataById(id);
    res.json(specificProdData);
    
} catch (error) {
    console.error('Error fetching specific products data:', error);
    res.status(500).json({ error: 'Error fetching specific products data.' });
}
}



