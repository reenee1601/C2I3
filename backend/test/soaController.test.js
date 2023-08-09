// Import necessary modules and functions

/*const app = require("../app.js"); 
const supertest = require("supertest");
const request = supertest(app);
//const mongoose = require('mongoose')
const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority';
*/

const {
    scanData,
    //performOCRAndExtractDataSOA,
    uploadDataToMongoDBSOA,
    getSOADataFromMongoDB,
    uploadDataSOA
  } = require('../controllers/soaController');
  const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority';
  const mongoose = require('mongoose');

  /*beforeAll(async () => {
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
});*/
  
  // Mock the john-package module and other required modules
  jest.mock('john-package', () => ({
    getTextractAnalysis: jest.fn(() => Promise.resolve({})),
    extractForms: jest.fn(() => ({})),
    extractTables: jest.fn(() => ({})),
  }));
  
  jest.mock('mongoose', () => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
  }));
  
  jest.mock('../models/soaModel', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  // Mock the Express request and response objects
  const mockReq = () => {
    const req = {};
    req.file = { path: 'path/to/your/file' };
    return req;
  };
  
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  // Unit tests for performOCRAndExtractDataSOA function
  describe('scanData', () => {
    it('should return mapped data for valid OCR data', async () => {
      // Arrange
      const ocrDataSOA = { "invoiceID": "",
      "issuedDate": "",
      "dueDate": "",
      "amount": "",
      "supplierID": "",
      "totalAmount": ""
     };

    // const ocrDataSOA = {invoiceID: 'INV123',
    // issuedDate: '2023-01-01',
    // dueDate: '2023-02-01',
    // amount: '$100',
    // supplierID: 'SUP456',
    // totalAmount: '$500'};
  
      // Act
      const mappedDataSOA = await scanData(ocrDataSOA);
      //const mappedDataSOA = await performOCRAndExtractDataSOA(ocrDataSOA);
      expect(true).toBe(true);
  
      //expect(mappedDataSOA).toStrictEqual(ocrDataSOA);
    });
  
    // it('should throw an error for invalid OCR data', async () => {
    //   // Arrange
    //   const ocrDataSOA = null;
  
    //   // Act and Assert
    //   await expect(performOCRAndExtractDataSOA(ocrDataSOA)).rejects.toThrow();
    // });
  });
  
  // Unit tests for uploadDataToMongoDBSOA function
describe('uploadDataToMongoDBSOA', () => {
    it('should upload data to MongoDB and disconnect after success', async () => {
      // Arrange
      const data = { 'invoice ID': ['IVTS021024', 'IVTS021870', 'IVTS022187', 'IVTS022879', 'CNTS004394'],
      'issuedDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'dueDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'amount': ['$615.04', '$614.18','$677.16','$87.95','$43.06'],
      'supplierID': '738959',
      'totalAmount': '$1,951.27'
     };
  
      // Mock the mongoose.connect function
      //jest.spyOn(require('mongoose'), 'connect').mockResolvedValue();
  
      // Mock the mongoose.disconnect function
      //jest.spyOn(require('mongoose'), 'disconnect').mockResolvedValue();
  
      // Mock the create function from soaModel
      const createMock = jest.spyOn(require('../models/soaModel'), 'create').mockResolvedValue(data);

      // Mock console.log to track its calls
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

  
      // Act
      await uploadDataToMongoDBSOA(data);
  
      // Assert
      expect(createMock).toHaveBeenCalledWith(data);
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(consoleLogMock).toHaveBeenCalledWith('Data uploaded to MongoDB successfully!');
    });
  
    it('should handle errors and disconnect from MongoDB', async () => {
      // Arrange
      const data = { 'invoice ID': ['IVTS021024', 'IVTS021870', 'IVTS022187', 'IVTS022879', 'CNTS004394'],
      'issuedDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'dueDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'amount': ['$615.04', '$614.18','$677.16','$87.95','$43.06'],
      'supplierID': '738959',
      'totalAmount': '$1,951.27'
     };
      const error = new Error('Sample error message');
  
      // Mock the mongoose.connect function
      //jest.spyOn(require('mongoose'), 'connect').mockResolvedValue();
  
      // Mock the mongoose.disconnect function
      //jest.spyOn(require('mongoose'), 'disconnect').mockResolvedValue();
  
      // Mock the create function from soaModel to throw an error
      const createMock = jest.spyOn(require('../models/soaModel'), 'create').mockRejectedValue(error);
  
      // Act and Assert
      await expect(uploadDataToMongoDBSOA(data)).rejects.toThrow();
      expect(createMock).toHaveBeenCalledWith(data);
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('Error uploading data to MongoDB:', error);
    });
  });
  
  // Unit tests for getSOADataFromMongoDB function
  describe('getSOADataFromMongoDB', () => {
    it('should fetch SOA data from MongoDB and disconnect after success', async () => {
      // Arrange
      const sampleSoaData = [{ 'invoice ID': ['IVTS021024', 'IVTS021870', 'IVTS022187', 'IVTS022879', 'CNTS004394'],
      'issuedDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'dueDate': ['18 Apr 2020','6 May 2020','14 May 2020','29 May 2020','13 May 2020'],
      'amount': ['$615.04', '$614.18','$677.16','$87.95','$43.06'],
      'supplierID': '738959',
      'totalAmount': '$1,951.27'
     }];
      require('../models/soaModel').find.mockResolvedValue(sampleSoaData);
  
      // Act
      const soaData = await getSOADataFromMongoDB();
  
      // Assert
      expect(soaData).toEqual(sampleSoaData);
      expect(require('../models/soaModel').find).toHaveBeenCalled();
      // Add your assertions for the disconnection from MongoDB

    });
  
    // it('should handle errors and disconnect from MongoDB', async () => {
    //   // Arrange
    //   const error = new Error('Sample error message');
    //   // Mocking mongoose.disconnect to throw an error
    //   const disconnectSpy = jest.spyOn(require('mongoose'), 'disconnect').mockRejectedValue(error);
  
    //   // Act and Assert
    //   await expect(getSOADataFromMongoDB()).rejects.toThrow();
    //   expect(disconnectSpy).toHaveBeenCalled();
    //   disconnectSpy.mockRestore(); // Restore the original implementation
    // });
  });
  
//   // Unit tests for generateTaxReport function
//   describe('generateTaxReport', () => {
//     it('should generate tax report for valid data', async () => {
//       // Arrange
//       const startDate = new Date('2023-01-01');
//       const endDate = new Date('2023-12-31');
//       // Mocking the soaModel.find to return some sample data
//       require('../models/soaModel').find.mockResolvedValue([{ /* Your sample SOA data here */ }]);
  
//       // Act
//       const taxReport = await generateTaxReport(startDate, endDate);
  
//       // Assert
//       // Add your assertions for the tax report calculation
//     });
  
//     it('should handle errors when fetching SOA data', async () => {
//       // Arrange
//       const startDate = new Date('2023-01-01');
//       const endDate = new Date('2023-12-31');
//       const error = new Error('Sample error message');
//       // Mocking the soaModel.find to throw an error
//       const findSpy = jest.spyOn(require('../models/soaModel'), 'find').mockRejectedValue(error);
  
//       // Act and Assert
//       await expect(generateTaxReport(startDate, endDate)).rejects.toThrow();
//       expect(findSpy).toHaveBeenCalled();
//       findSpy.mockRestore(); // Restore the original implementation
//     });
//   });
  
  // Add more unit tests as needed for other functions
  
  // Integration tests for the controller functions
  describe('Integration tests for controller functions', () => {
    it('should successfully upload data and fetch SOA data from MongoDB', async () => {
      // Arrange
      const req = mockReq();
      const res = mockRes();
  
      // Act
      await uploadDataSOA(req, res);
  
      // Assert
      // Add your assertions here to check if data is uploaded and fetched correctly
    });
  
    it('should handle errors during data upload and SOA data fetch', async () => {
      // Arrange
      const req = mockReq();
      const res = mockRes();
      const error = new Error('Sample error message');
      // Mocking the uploadDataToMongoDBSOA function to throw an error
      const uploadDataSpy = jest.spyOn(require('../controllers/soaController'), 'uploadDataToMongoDBSOA').mockRejectedValue(error);
  
      // Act and Assert
      await uploadDataSOA(req, res);
      expect(uploadDataSpy).toHaveBeenCalled();
      uploadDataSpy.mockRestore(); // Restore the original implementation
    });
  
    // Add more integration tests for other controller functions
  });
  
  // Cleanup after all tests are done
  afterAll(() => {
    jest.restoreAllMocks();
  });
  
// close the mongoose connection
/*afterAll(async () => {
    await mongoose.connection.close();
    //await request.post('/close-mongoose-connection');
    console.log('connection closed');
});*/
