const mongoose = require('mongoose');

// Define the schema
const invoiceSchema = new mongoose.Schema({
  invoiceID: { type: Array},
  issuedDate: { type: Array},
  dueDate: { type: Array },
  supplierID: { type: Array },
  totalBeforeGST: { type: Array },
  totalAfterGST: { type: Array },
  GST: { type: Array },
  productCode: { type: Array },
  quantity: { type: Array },
  amount: { type: Array },
  productName: { type: Array},
});

// Create the Invoice model using the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Export the model to be used in other parts of the application
module.exports = Invoice;
