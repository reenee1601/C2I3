const mongoose = require('mongoose');

// Define the schema
const invoiceSchema = new mongoose.Schema({
  invoiceID: {type: String},
  issuedDate: {type: String},
  dueDate: {type: String},
  supplierID: {type: String },
  totalBeforeGST: {type: String},
  totalAfterGST: {type: String },
  GST: {type: String },
  productCode: {type: Array},
  quantity: {type: Array },
  amount: {type: Array },
  productName: {type: Array},
});

// Create the Invoice model using the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Export the model to be used in other parts of the application
module.exports = Invoice;