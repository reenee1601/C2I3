const mongoose = require('../db');

// Define the schema
const productSchema = new mongoose.Schema({
  productName: {type: String },
  supplierID: {type: String },
  price: {type: Number, require: true},
  productCode: {type: String},
  quantity: {type: Number},
});

// Create the Invoice model using the schema
const productModel = mongoose.model('products', productSchema);

// Export the model to be used in other parts of the application
module.exports = productModel;