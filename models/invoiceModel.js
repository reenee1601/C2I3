const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceID: { type: String, required: true },
  supplierName: { type: String, required: true },
  retailerName: { type: String, required: true },
  receipt: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  totalPayable: { type: Number, required: true },
  date: { type: Date, required: true },
  // Add other fields as needed for your specific use case
});

const InvoiceModel = mongoose.model('Invoice', invoiceSchema, 'invoices');

async function getAllInvoices() {
  try {
    const invoices = await InvoiceModel.find();
    return invoices;
  } catch (error) {
    console.error("Error retrieving invoices:", error);
    throw error;
  }
}

async function addInvoice(invoice) {
  try {
    const newInvoice = new InvoiceModel(invoice);
    await newInvoice.save();
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
}

async function uploadInvoice(invoiceOnlyFields, invoiceItemFields) {
  try {
    const mergedInvoiceObj = Object.assign({}, ...invoiceOnlyFields);
    await InvoiceModel.create(mergedInvoiceObj);

    const InvoiceItemModel = mongoose.model('InvoiceItem', new mongoose.Schema({}), 'invoiceItems');
    await InvoiceItemModel.insertMany(invoiceItemFields);
  } catch (error) {
    console.error("Error uploading invoice and items:", error);
    throw error;
  }
}

module.exports = {
  InvoiceModel,
  getAllInvoices,
  addInvoice,
  uploadInvoice,
};
