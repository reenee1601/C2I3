// Assuming you have already installed and required the "john-package" in your application
const johnPackage = require('john-package');
const mongoose = require('mongoose');
const soa = require('../models/soaModel');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000; // Replace with your desired port number
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ExcelJS = require('exceljs');
const fs = require('fs');

// Function to perform OCR and extract data
async function performOCRAndExtractData(filepath, dict1, dict2) {
  try {
    // Perform OCR and get the analysis result
    const ocrData = await johnPackage.getTextractAnalysis(filepath);

    // Extract forms and tables from the OCR result using "john-package" functions
    const formsData = johnPackage.extractForms(ocrData, dict1);
    const tablesData = johnPackage.extractTables(ocrData, dict2);
    //transform the json data into object format
    //const data = JSON.parse(formsData);
    const mappedData = {
      invoiceID: tablesData['Invoice ID'] || '',
      issuedDate: tablesData['Issued Date'] || '',
      dueDate: tablesData['Due Date'] || '',
      amount: tablesData['Amount'] || '',
      supplierID: formsData['Supplier ID'] || '',
      totalAmount: formsData['Total Amount'] || ''
    };

    // Combine the extracted data if needed
    //const combinedData = Object.assign({},formsData, tablesData);


    return mappedData;
  } catch (error) {
    console.error('Error performing OCR and extracting data:', error);
    throw error;
  }
}

// Function to upload data to MongoDB
async function uploadDataToMongoDB(data) {
  const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
  //const dbName = 'project_data'; // Replace with your desired database name

  //const client = new MongoClient(url);

  try {
    //await client.connect();
    //const db = client.db(dbName);
    //const collection = db.collection('soa'); // Replace with your desired collection name

    // Insert the data into the collection
    //await collection.insertOne(data);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Save the extracted data to the soa collection
    await soa.create(data);

    console.log('Data uploaded to MongoDB successfully!');
    // console.log(data);
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}

async function getSOADataFromMongoDB() {
  try {
    const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const soaData = await soa.find(); // Fetch all documents from the 'soa' collection

    mongoose.disconnect();

    return soaData;
  } catch (error) {
    console.error('Error fetching SOA data from MongoDB:', error);
    throw error;
  }
}

// Example usage in a controller function
async function processOCRAndUploadToMongoDB(filepath, dict1, dict2) {
  try {
    // Perform OCR and extract data
    const extractedData = await performOCRAndExtractData(filepath, dict1, dict2);

    // Upload the extracted data to MongoDB
    await uploadDataToMongoDB(extractedData);

    console.log('OCR data extracted and uploaded to MongoDB successfully!');
  } catch (error) {
    console.error('Error processing OCR and uploading to MongoDB:', error);
  }
}

// Function to export data to an Excel file
async function exportDataToExcel() {
  try {
    const data = await getSOADataFromMongoDB(); // Retrieve data from MongoDB

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Define the Excel columns
    worksheet.columns = [
      { header: 'Invoice ID', key: 'invoiceID', width: 15 },
      { header: 'Issued Date', key: 'issuedDate', width: 15 },
      { header: 'Due Date', key: 'dueDate', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Supplier ID', key: 'supplierID', width: 15 },
      { header: 'Total Amount', key: 'totalAmount', width: 15 },
      // Add more columns as needed
    ];

    // Add the data to the worksheet
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Save the workbook to an Excel file
    const filePath = 'data.xlsx';
    await workbook.xlsx.writeFile(filePath);
    console.log(data);
    return filePath;


    console.log('Data exported to Excel successfully!');
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
  }
}

async function exportDataToCSV() {
  try {
    const data = await getSOADataFromMongoDB(); // Retrieve data from MongoDB

    // Convert data to the format expected by the csv-writer library
    const csvData = data.map((item) => ({
      invoiceID: item.invoiceID,
      issuedDate: item.issuedDate,
      dueDate: item.dueDate,
      amount: item.amount,
      supplierID: item.supplierID,
      totalAmount: item.totalAmount,
    }));

    const filePath = 'data.csv';
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'invoiceID', title: 'Invoice ID' },
        { id: 'issuedDate', title: 'Issued Date' },
        { id: 'dueDate', title: 'Due Date' },
        { id: 'amount', title: 'Amount' },
        { id: 'supplierID', title: 'Supplier ID' },
        { id: 'totalAmount', title: 'Total Amount' },
        // Add more columns as needed
      ],
    });

    // Write the data to the CSV file
    await csvWriter.writeRecords(csvData);
    console.log(csvData);
    return filePath;

    console.log('Data exported to CSV successfully!');
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
  }
}

async function getSOADataById(id) {
  try {
    const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'; // Replace with your MongoDB server information
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const specificSoaData = await soa.findById(id); // Fetch data from the 'soa' collection based on the _id

    mongoose.disconnect();

    return specificSoaData;
  } catch (error) {
    console.error('Error fetching specific SOA data from MongoDB:', error);
    throw error;
  }
}



// Call the controller function with the file path and dictionary as needed
const dict2 = {
    headers: ['Invoice ID', 'Issued Date', 'Due Date', 'Amount'],
    mapping: {
    'Ref. No.':'Invoice ID', 'Ref And Particulars':'Invoice ID', 'Tax Invoice':'Invoice ID', 
    'Document No.':'Invoice ID', 'Doc. No.':'Invoice ID', 'References':'Invoice ID', 'No':'Invoice ID', 
    'Invoice No./ CN NO':'Invoice ID', 'Invoice no.':'Invoice ID', 'REF.':'Invoice ID', 
    'Inv. No.':'Invoice ID', 'DOCUMENT NO.':'Invoice ID', 'DOCUMENT NUMBER':'Invoice ID', 
    'Our Ref.':'Invoice ID', 'Document No':'Invoice ID', 'No.':'Invoice ID', 'Reference':'Invoice ID',
    'Balance':'Amount', 'Accumulated Balance':'Amount', 'Balance Amount':'Amount', 
    'Document Amount':'Amount', 'Amount':'Amount', 'BALANCE':'Amount', 
    'Accumulated balance(Functional currency)':'Amount', 
    'Accum Balance':'Amount', 'OUTSTANDING BALANCE':'Amount',    
    'Date':'Issued Date', 'DATE':'Issued Date', 'Tran.Date':'Issued Date', 'Posting Date':'Issued Date', 
    '单据日期':'Issued Date', 'Invoice Date':'Issued Date',
    'Due Date':'Due Date',

}
}; // Replace with any required dictionary or options for "john-package"
const dict1 = {
  headers: ['Supplier ID','Total Amount'],
  mapping: {
  'GST REG NO:':'Supplier ID', 'GST Reg No.:':'Supplier ID', 'GST Reg.No:':'Supplier ID', 'ST Reg. No.':'Supplier ID', 'GST Registration No':'Supplier ID',
  'GST Registration No.:':'Supplier ID','GST No :':'Supplier ID','GST REG.NO:':'Supplier ID','Company Reg No & GST Reg No:':'Supplier ID','GST REG NO.':'Supplier ID','GST Reg. No.':'Supplier ID','GST REG.NO':'Supplier ID',
  'TOTAL OUTSTANDING SGD':'Total Amount', '0.00':'Total Amount', 'SGD':'Total Amount', 'TOTAL':'Total Amount', 'Total':'Total Amount', 'TOTAL':'Total Amount', '$':'Total Amount', 'TOTAL (SGD)':'Total Amount', 'Total aging for each bill to':'Total Amount', 'S$ :':'Total Amount', 'Total in SGD':'Total Amount', '-':'Total Amount', 'Total=$':'Total Amount', 
  'Total Outstandings:':'Total Amount', 'Aged Amounts':'Total Amount', 'SGD:':'Total Amount', 

}
}; 

//processOCRAndUploadToMongoDB(filepath, dict2);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a route to handle the data upload
app.post('/uploadPage', upload.single('pdfFile'), async (req, res) => {
  try {
    // Get the uploaded file path from the request object
    const filepath = req.file.path;

    // Perform OCR and upload data to MongoDB
    await processOCRAndUploadToMongoDB(filepath, dict1, dict2);

    console.log('File uploaded and data extracted successfully!');
    res.status(200).json({ message: 'File uploaded and data extracted successfully!' });
  } catch (error) {
    console.error('Error uploading file and extracting data:', error);
    res.status(500).json({ error: 'Error uploading file and extracting data.' });
  }
});

app.get('/getSOAData', async (req, res) => {
  try {
    const soaData = await getSOADataFromMongoDB();
    res.send(soaData);
  } catch (error) {
    console.error('Error fetching SOA data:', error);
    res.status(500).json({ error: 'Error fetching SOA data.' });
  }
});

app.get('/exportToCSV', async (req, res) => {
  try {
    const filePath = await exportDataToCSV();

    // Set the headers to trigger the file download
    res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
    res.setHeader('Content-Type', 'text/csv');

    // Create a read stream from the saved file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    console.log("CSV exported");
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
    res.status(500).json({ error: 'Error exporting data to CSV.' });
  }
});

app.get('/exportToExcel', async (req, res) => {
  try {
    const filePath = await exportDataToExcel();

    // Set the headers to trigger the file download
    res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Create a read stream from the saved file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    console.log("Excel exported");
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
    res.status(500).json({ error: 'Error exporting data to Excel.' });
  }
});

// Create a route to handle fetching specific data based on _id
app.get('/getSOAData/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the _id from the URL parameter

    const specificSoaData = await getSOADataById(id);
    res.send(specificSoaData);
  } catch (error) {
    console.error('Error fetching specific SOA data:', error);
    res.status(500).json({ error: 'Error fetching specific SOA data.' });
  }
});