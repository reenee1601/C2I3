// Import the required modules and functions
const { performOCRAndExtractData, uploadDataToMongoDB } = require('../controllers/Combined');
const johnPackage = require('john-package');
const mongoose = require('mongoose');
const Invoice = require('../models/invoiceModel.js');
const soa = require('../models/soaModel.js');

// Mock the dependencies
jest.mock('john-package', () => ({
  getTextractAnalysis: jest.fn().mockResolvedValue({}),
  extractForms: jest.fn().mockReturnValue({}),
  extractTables: jest.fn().mockReturnValue({}),
}));

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
  disconnect: jest.fn().mockResolvedValue(),
}));

jest.mock('../models/invoiceModel.js', () => ({
  create: jest.fn().mockResolvedValue(),
}));

jest.mock('../models/soaModel.js', () => ({
  create: jest.fn().mockResolvedValue(),
}));

describe('performOCRAndExtractData', () => {
  test('should perform OCR and extract data correctly', async () => {
    // Mock the OCR data and the extracted forms and tables data
    const ocrData = { /* Mock OCR data */ };
    const formsData = { /* Mock forms data */ };
    const tablesData = { /* Mock tables data */ };

    // Set the mock functions for "john-package"
    johnPackage.getTextractAnalysis.mockResolvedValue(ocrData);
    johnPackage.extractForms.mockReturnValue(formsData);
    johnPackage.extractTables.mockReturnValue(tablesData);

    // Call the function with some mock file path and dictionaries
    const filepath = '../controllers/uploads';
    const dict1 = { /* Mock dictionary */ };
    const dict2 = { /* Mock dictionary */ };
    const result = await performOCRAndExtractData(filepath, dict1, dict2);

    console.log(result); // Add this line to log the result for debugging

    // Assert the result
    expect(result).toEqual({
      // Mock the expected extracted data based on the provided dictionary mappings
      invoiceID: 'mock_invoice_id',
      issuedDate: 'mock_issued_date',
      supplierID: 'mock_supplier_id',
      totalBeforeGST: 'mock_total_before_gst',
      totalAfterGST: 'mock_total_after_gst',
      GST: 'mock_gst',
      productCode: 'mock_product_code',
      quantity: 'mock_quantity',
      amount: 'mock_amount',
      productName: 'mock_product_name',
    });
  });
});

describe('uploadDataToMongoDB', () => {
  test('should upload data to MongoDB correctly', async () => {
    // Set the mock data to upload
    const mockData = {
      // Mock the data to upload
      invoiceID: 'mock_invoice_id',
      issuedDate: 'mock_issued_date',
      supplierID: 'mock_supplier_id',
      totalBeforeGST: 'mock_total_before_gst',
      totalAfterGST: 'mock_total_after_gst',
      GST: 'mock_gst',
      productCode: 'mock_product_code',
      quantity: 'mock_quantity',
      amount: 'mock_amount',
      productName: 'mock_product_name',
    };

    // Call the function to upload the data
    uploadDataToMongoDB(mockData);

    // Assert that the Invoice.create function is called with the correct data
    expect(Invoice.create).toHaveBeenCalledWith(mockData);

    // Assert that mongoose.connect and mongoose.disconnect are called once each
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
  });
});
