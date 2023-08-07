
const mongoose = require('mongoose')
const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority';

beforeAll(async () => {
    //connection to mongoDB database

    await mongoose
      .connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Successfully connect to MongoDB.");
      })
      .catch(err => {
        console.error("Connection error", err);
        process.exit();
      });
});


const { scanDataPayment, sendWhatsApp } = require("../controllers/paymentController");

const utils = require("../utils/utils");

const accountSid = 'ACb10e36162bf1e9c551cdf7a8ce779d97';
const authToken = '0a0d792f5d5809e00ec4f1ceccc3fadf';
const client = require('twilio')(accountSid, authToken);

const tablesDict = { // list of table headers you want to extract
    headers: ['PayerName', 'Comment', 'Reference'],
    mapping: {
    'From': 'PayerName', 'Your Comments' : 'Comment','Reference No.': 'Reference'}
};

// Mock necessary dependencies
jest.mock("fs", () => ({
  unlink: jest.fn((path, callback) => callback(null)),
}));


jest.mock("../utils/utils", () => ({
  performOcrPayment: jest.fn().mockResolvedValue({}),
}));

jest.mock("../models/paymentModel", () => ({
  create: jest.fn(),
  find: jest.fn(),
}));

// Mocked data for positive case (Query returns some payments)
const mockPaymentData = [
  {
    _id: "payment_id_1",
    "PayerName": "xiaobai 274-24649-9",
    "Comment": "PayNow Transfer",
    "Reference": "IMB1261721398300000000C9194077 02910",
  },
];

// Mocked data for negative case (Query returns an empty result)
const mockEmptyPaymentData = [];

jest.mock("../models/paymentModel", () => ({
  create: jest.fn(), // Mocked function for MongoDB create method
  find: jest.fn(() => Promise.resolve(mockPaymentData)), // Positive case query mock
}));

// Alternatively, for the negative case, you can use:
jest.mock("../models/paymentModel", () => ({
  create: jest.fn(),
  find: jest.fn(() => Promise.resolve(mockEmptyPaymentData)), // Negative case query mock
}));

// Positive mock invoice data
const mockPositivePaymentData = {
    "PayerName": "xiaobai 274-24649-9",
    "Comment": "PayNow Transfer",
    "Reference": "IMB1261721398300000000C9194077 02910",
  // Add more properties as needed
};

// Negative mock invoice data (empty invoice)
const mockNegativePaymentData = {}; // An empty object

// Negative mock invoice data (missing required fields)
const mockIncompletePaymentData = {
    "PayerName": "xiaobai 274-24649-9",
  // Missing 'Comment', 'Reference', etc.
  // Add more properties as needed
};

describe("Payment Controller Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Reset the mock functions before each test
  });


  test("ScanDataPayment should perform OCR successfully and return data", async () => {
    //const req = { file: { path: "/mocked/path/to/file.txt" } };
    const req = { file: { path: "test/payment.jpg" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock successful OCR data
    jest.spyOn(utils, "performOcrPayment").mockResolvedValue({
        "PayerName": "xiaobai 274-24649-9",
        "Comment": "PayNow Transfer",
        "Reference": "IMB1261721398300000000C9194077 02910",
      // Add more properties as needed
    });

    await scanDataPayment(req, res);

    const mockPositivePaymentData = {
      "Invoice ID": "INV-12345",
      "Issued Date": "2023-08-01",
      "Supplier ID": "SUPP-98765",
      GST: "7%",
      "Total Before GST": "1000.00",
      "Total After GST": "1070.00",
      // Add more properties as needed
    };

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPositivePaymentData);
  });

  test("scanData should handle missing file and return 500 status", async () => {
    const req = { file: undefined }; // No file attached in the request
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await scanData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error performing OCR on file undefined",
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("scanData should handle OCR failure and return 500 status", async () => {
    // Mocking an error thrown by performOcr
    jest
      .spyOn(require("../utils/utils"), "performOcr")
      .mockRejectedValue(new Error("OCR Error"));

    const req = { file: { path: "/mocked/path/to/file.txt" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await scanData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error performing OCR on file undefined", // Update with the actual filename
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("scanData should return 200 status and data for successful OCR", async () => {
    const req = { file: { path: "/mocked/path/to/file.txt" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockedOcrData = {
      "Invoice ID": "INV-12345",
      "Issued Date": "2023-08-01",
      "Supplier ID": "SUPP-98765",
      GST: "7%",
      "Total Before GST": "1000.00",
      "Total After GST": "1070.00",
    };

    jest.spyOn(utils, "performOcr").mockResolvedValue(mockedOcrData);

    await scanData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedOcrData);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("scanData should return 200 status and empty data for successful OCR but no extracted data", async () => {
    const req = { file: { path: "/mocked/path/to/file.txt" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jest.spyOn(utils, "performOcr").mockResolvedValue({}); // Mocked empty OCR data

    await scanData(req, res);

    //expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toEqual(200);
    expect(res.json).toHaveBeenCalledWith({}); // Empty OCR data
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("uploadData should upload data to MongoDB and return 200 status", async () => {
    const req = {
      body: {
        "Invoice ID": "INV-12345",
        "Issued Date": "2023-08-01",
        "Supplier ID": "SUPP-98765",
        GST: "7%",
        "Total Before GST": "1000.00",
        "Total After GST": "1070.00",
        "Product Table": [
          {
            "Product Code": "P-001",
            "Product Name": "Product A",
            Quantity: "2",
            Amount: "200.00",
          },
          {
            "Product Code": "P-002",
            "Product Name": "Product B",
            Quantity: "3",
            Amount: "300.00",
          },
        ],
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await uploadData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully uploaded invoice onto MongoDB",
    });
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  test("uploadData should handle missing data in the request and return 500 status", async () => {
    const req = { body: undefined }; // No data attached in the request
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await uploadData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error uploading Invoice to MongoDB",
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("uploadData should handle MongoDB create failure and return 500 status", async () => {
    const req = { body: {} }; // Empty data in the request
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jest
      .spyOn(require("../models/invoiceModel"), "create")
      .mockRejectedValue(new Error("MongoDB Create Error"));

    await uploadData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error uploading Invoice to MongoDB",
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("getData should fetch data from MongoDB and return 200 status", async () => {
    require("../models/invoiceModel").find.mockResolvedValueOnce(
      mockInvoiceData
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockInvoiceData);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  test("getData should fetch data from MongoDB and return 200 status with empty invoice data", async () => {
    // Set the mock MongoDB query result to the empty invoice data
    require("../models/invoiceModel").find.mockResolvedValue(
      mockEmptyInvoiceData
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmptyInvoiceData);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  test("getData should handle MongoDB find failure and return 500 status", async () => {
    require("../models/invoiceModel").find.mockRejectedValue(
      new Error("MongoDB Find Error")
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error fetching SOA data.",
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("getData should handle empty invoice data and return 200 status", async () => {
    require("../models/invoiceModel").find.mockResolvedValue([]);

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("getData should handle negative invoice data and return 200 status", async () => {
    const mockNegativeInvoiceData = [
      {
        _id: "invoice_id_1",
        // Missing 'Invoice ID', 'Issued Date', 'Supplier ID', 'GST', 'Total Before GST', 'Total After GST', etc.
        // Add more properties as needed
      },
    ];
    require("../models/invoiceModel").find.mockResolvedValue(
      mockNegativeInvoiceData
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNegativeInvoiceData);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});


afterAll(async () => {
    await mongoose.connection.close();
    //await request.post('/close-mongoose-connection');
    console.log('connection closed');
});
