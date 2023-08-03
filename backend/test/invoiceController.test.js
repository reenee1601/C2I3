//worked
/*//Boundary Test Cases:

scanData should handle OCR failure and return 500 status.
uploadData should handle MongoDB create failure and return 500 status.
getData should handle MongoDB find failure and return 500 status.
getData should handle empty invoice data and return 200 status.
getData should return 200 status and data for successful MongoDB find.


//Negative Test Cases:

scanData should handle missing file and return 500 status.
uploadData should handle missing data in the request and return 500 status.
getData should handle negative invoice data and return 200 status.
scanData should return 200 status and empty data for successful OCR but no extracted data.
*/

const { scanData, uploadData, getData } = require("../controllers/invoiceController");
//const { uploadDataInvoice } = require("../controllers/invoiceController_old");
const utils = require("../utils/utils");

const tableDict = {
  // this is a sample dict to be used for
  headers: ["Invoice ID", "Issued Date", "Due Date", "Amount"],
  mapping: {
    "Invoice ID": "Invoice ID",
    "Issued Date": "Issued Date",
    "Ref No": "Invoice ID",
    "Ref And Particulars": "Invoice ID",
    "Tax Invoice": "Invoice ID",
    "Document No": "Invoice ID",
    "Doc No": "Invoice ID",
    References: "Invoice ID",
    No: "Invoice ID",
    "Invoice No CN NO": "Invoice ID",
    "Invoice no": "Invoice ID",
    REF: "Invoice ID",
    "Inv No": "Invoice ID",
    "DOCUMENT NO": "Invoice ID",
    "DOCUMENT NUMBER": "Invoice ID",
    "Our Ref": "Invoice ID",
    "Document No": "Invoice ID",
    No: "Invoice ID",
    Reference: "Invoice ID",
    Balance: "Amount",
    "Accumulated Balance": "Amount",
    "Balance Amount": "Amount",
    "Document Amount": "Amount",
    Amount: "Amount",
    BALANCE: "Amount",
    "Accumulated balanceFunctional currency": "Amount",
    "Accum Balance": "Amount",
    "OUTSTANDING BALANCE": "Amount",
    Date: "Issued Date",
    DATE: "Issued Date",
    TranDate: "Issued Date",
    "Posting Date": "Issued Date",
    单据日期: "Issued Date",
    "Invoice Date": "Issued Date",

    "Due Date": "Due Date",
  },
};

const formDict = {
  headers: ["Company Registration Number", "GST Registration Number", "Date"],
  mapping: {
    "Company Registration Number": "Company Registration Number",
    "Company Reg No": "Company Registration Number",

    "GST Registration Number": "GST Registration Number",
    "GST Reg No": "GST Registration Number",
    "GST Registration No": "GST Registration Number",
    "GST No": "GST Registration Number",

    Date: "Date",
    日付: "Date",
  },
};

// Mock necessary dependencies
jest.mock("fs", () => ({
  unlink: jest.fn((path, callback) => callback(null)),
}));

// jest.mock('../utils/utils', () => ({
//   performOcr: jest.fn().mockResolvedValue({
//     /* Mocked OCR data for positive cases */
//     'Invoice ID': 'INV-12345',
//     'Issued Date': '2023-08-01',
//     'Supplier ID': 'SUPP-98765',
//     'GST': '7%',
//     'Total Before GST': '1000.00',
//     'Total After GST': '1070.00',
//     'Product Table': [
//         {
//         'Product Code': 'P-001',
//         'Product Name': 'Product A',
//         'Quantity': '2',
//         'Amount': '200.00',
//         },
//         {
//         'Product Code': 'P-002',
//         'Product Name': 'Product B',
//         'Quantity': '3',
//         'Amount': '300.00',
//         },
//     ],
//   }),
// }));

// jest.mock('../models/invoiceModel', () => ({
//   create: jest.fn(),
//   find: jest.fn(() => ({
//     /* Mocked data for MongoDB query */
//     /* Add mock invoice data for positive and negative cases */
//   })),
// }));

jest.mock("../utils/utils", () => ({
  performOcr: jest.fn().mockResolvedValue({}),
}));

jest.mock("../models/invoiceModel", () => ({
  create: jest.fn(),
  find: jest.fn(),
}));

// Mocked data for positive case (Query returns some invoices)
const mockInvoiceData = [
  {
    _id: "invoice_id_1",
    "Invoice ID": "INV-12345",
    "Issued Date": "2023-08-01",
    "Supplier ID": "SUPP-98765",
    GST: "7%",
    "Total Before GST": "1000.00",
    "Total After GST": "1070.00",
  },
];

// Mocked data for negative case (Query returns an empty result)
const mockEmptyInvoiceData = [];

jest.mock("../models/invoiceModel", () => ({
  create: jest.fn(), // Mocked function for MongoDB create method
  find: jest.fn(() => Promise.resolve(mockInvoiceData)), // Positive case query mock
}));

// Alternatively, for the negative case, you can use:
jest.mock("../models/invoiceModel", () => ({
  create: jest.fn(),
  find: jest.fn(() => Promise.resolve(mockEmptyInvoiceData)), // Negative case query mock
}));

// Positive mock invoice data
const mockPositiveInvoiceData = {
  "Invoice ID": "INV-12345",
  "Issued Date": "2023-08-01",
  "Supplier ID": "SUPP-98765",
  GST: "7%",
  "Total Before GST": "1000.00",
  "Total After GST": "1070.00",
  // Add more properties as needed
};

// Negative mock invoice data (empty invoice)
const mockNegativeInvoiceData = {}; // An empty object

// Negative mock invoice data (missing required fields)
const mockIncompleteInvoiceData = {
  "Issued Date": "2023-08-01",
  // Missing 'Invoice ID', 'Supplier ID', 'GST', 'Total Before GST', 'Total After GST', etc.
  // Add more properties as needed
};

describe("Invoice Controller Tests", () => {
  //   afterEach(() => {
  //     jest.clearAllMocks();
  //   });
  beforeEach(() => {
    jest.clearAllMocks(); // Reset the mock functions before each test
  });


  test("ScanData should perform OCR successfully and return data", async () => {
    const req = { file: { path: "/mocked/path/to/file.txt" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock successful OCR data
    jest.spyOn(utils, "performOcr").mockResolvedValue({
      "Invoice ID": "INV-12345",
      "Issued Date": "2023-08-01",
      "Supplier ID": "SUPP-98765",
      GST: "7%",
      "Total Before GST": "1000.00",
      "Total After GST": "1070.00",
      // Add more properties as needed
    });

    await scanData(req, res);

    const mockPositiveInvoiceData = {
      "Invoice ID": "INV-12345",
      "Issued Date": "2023-08-01",
      "Supplier ID": "SUPP-98765",
      GST: "7%",
      "Total Before GST": "1000.00",
      "Total After GST": "1070.00",
      // Add more properties as needed
    };

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPositiveInvoiceData);
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

    expect(res.status).toHaveBeenCalledWith(200);
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
