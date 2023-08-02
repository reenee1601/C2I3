const request = require('supertest');
const express = require('express');
const app = express();

const invoiceController = require('../controllers/invoiceController');

// Mocking the multer middleware
jest.mock('multer', () => ({
  diskStorage: jest.fn(),
  single: jest.fn(() => (req, res, next) => {
    req.file = {
      path: '/mocked/path/to/file.txt',
      originalname: 'file.txt',
    };
    next();
  }),
}));

// Use the mocked multer middleware
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'invoice'+ '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// Mocking invoiceController functions
jest.mock('../controllers/invoiceController', () => ({
  textractData: jest.fn((req, res) => {
    res.json({
      'Invoice ID': 'INV-12345',
      'Issued Date': '2023-08-01',
      'Supplier ID': 'SUPP-98765',
      // Add more properties as needed
    });
  }),
  uploadData: jest.fn((req, res) => {
    res.status(200).json({ message: 'Successfully uploaded invoice onto MongoDB' });
  }),
  getData: jest.fn((req, res) => {
    res.json([
      {
        _id: 'invoice_id_1',
        'Invoice ID': 'INV-12345',
        'Issued Date': '2023-08-01',
        'Supplier ID': 'SUPP-98765',
        // Add more properties as needed
      },
    ]);
  }),
}));

// Mount the router with the mocked controller
app.use('/invoice', require('../routes/invoiceRoutes'));

// Start writing tests
describe('Invoice Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /invoice/textractData should call textractData with correct arguments', async () => {
    const response = await request(app).post('/invoice/textractData').attach('file', 'path/to/file.txt');
    expect(invoiceController.textractData).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      'Invoice ID': 'INV-12345',
      'Issued Date': '2023-08-01',
      'Supplier ID': 'SUPP-98765',
      // Add more properties as needed
    });
  });

  test('POST /invoice/uploadData should call uploadData with correct arguments', async () => {
    const response = await request(app).post('/invoice/uploadData').send({ /* Add data here */ });
    expect(invoiceController.uploadData).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Successfully uploaded invoice onto MongoDB' });
  });

  test('GET /invoice/getData should call getData with correct arguments', async () => {
    const response = await request(app).get('/invoice/getData');
    expect(invoiceController.getData).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        _id: 'invoice_id_1',
        'Invoice ID': 'INV-12345',
        'Issued Date': '2023-08-01',
        'Supplier ID': 'SUPP-98765',
        // Add more properties as needed
      },
    ]);
  });
});
