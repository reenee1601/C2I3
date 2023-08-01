// Assuming you have already installed and required the "john-package" and "mongoose" in your application
const johnPackage = require('john-package');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Invoice = require('../models/invoiceModel.js');
const soa = require('../models/soaModel.js');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();
const port = 3000; // Replace with your desired port number
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Middleware to parse JSON data
app.use(bodyParser.json());

// Function to perform OCR and extract data
async function performOCRAndExtractData_Invoice(filepath, dict1, dict2) {
  try {
    // Perform OCR and get the analysis result
    const ocrData = await johnPackage.getTextractAnalysis(filepath);

    // Extract forms and tables from the OCR result using "john-package" functions
    const formsData = johnPackage.extractForms(ocrData, dict1);
    const tablesData = johnPackage.extractTables(ocrData, dict2);
    //transform the json data into object format
    //const data = JSON.parse(formsData);
    const mappedData = {
      invoiceID: formsData['Invoice ID'] || '',
      issuedDate: formsData['Issued Date'] || '',
      supplierID: formsData['Supplier ID'] || '',
      totalBeforeGST: formsData['Total Before GST'] || '',
      totalAfterGST: formsData['Total After GST'] || '',
      GST: formsData['GST'] || '',
      productCode: tablesData['Product Code'] || '',
      quantity: tablesData['Quantity'] || '',
      amount: tablesData['Amount'] || '',
      productName: tablesData['Product Name'] || ''
    };

    return mappedData;
  } catch (error) {
    console.error('Error performing OCR and extracting data:', error);
    throw error;
  }
}
async function uploadDataToMongoDB_Invoice(data) {
  const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority';
  const dbName = 'project_data'; // Replace with your desired database name

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Save the extracted data to the Invoice collection
    await Invoice.create(data);

    console.log('Data uploaded to MongoDB successfully!');
    console.log(data);
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}
async function processOCRAndUploadToMongoDB_Invoice(filepath, dict1, dict2) {
  try {
    // Perform OCR and extract data
    const extractedData = await performOCRAndExtractData_Invoice(filepath, dict1, dict2);

    // Upload the extracted data to MongoDB
    await uploadDataToMongoDB_Invoice(extractedData);

    console.log('OCR data extracted and uploaded to MongoDB successfully!');
  } catch (error) {
    console.error('Error processing OCR and uploading to MongoDB:', error);
  }
}

async function performOCRAndExtractData_SOA(filepath, dict3, dict4) {
    try {
      // Perform OCR and get the analysis result
      const ocrData = await johnPackage.getTextractAnalysis(filepath);
  
      // Extract forms and tables from the OCR result using "john-package" functions
      const formsData = johnPackage.extractForms(ocrData, dict3);
      const tablesData = johnPackage.extractTables(ocrData, dict4);
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
  async function uploadDataToMongoDB_SOA(data) {
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
      console.log(data);
    } catch (error) {
      console.error('Error uploading data to MongoDB:', error);
    } finally {
      mongoose.disconnect();
    }
  }
  
  // Example usage in a controller function
  async function processOCRAndUploadToMongoDB_SOA(filepath, dict3, dict4) {
    try {
      // Perform OCR and extract data
      const extractedData = await performOCRAndExtractData_SOA(filepath, dict3, dict4);
  
      // Upload the extracted data to MongoDB
      await uploadDataToMongoDB_SOA(extractedData);
  
      console.log('OCR data extracted and uploaded to MongoDB successfully!');
    } catch (error) {
      console.error('Error processing OCR and uploading to MongoDB:', error);
    }
  }


// Call the controller function with the file path and dictionary as needed

const dict1 = {
  headers: ['Invoice ID', 'Issued Date', 'Supplier ID','GST','Total Before GST','Total After GST', 'GST' ],
  mapping: {'INVOICE NO.': 'Invoice ID','Tax Invoice':'Invoice ID',
  'Invoice Date': 'Issued Date' , 'DATE': 'Issued Date', 
  'GST 7%' : 'GST',  'Add 7% GST': 'GST', 
  'TOTAL':'Total After GST', 'GRAND TOTAL': 'Total After GST', 'Grand Total': 'Total After GST', 
  'Sub Total': 'Total Before GST', 'SUB TOTAL': 'Total Before GST', 
  'SUBTOTAL SGD': 'Total Before GST', 'TOTAL': 'Total Before GST'
,'Salesman Code': 'Supplier ID'}
};
const dict2 = {
headers: ['Product Code', 'Quantity', 'Amount', 'Product Name' ],
mapping: {
'ITEM ID' : 'Product Code','ode': 'Product Code','Product Code': 'Product Code'
 ,'QTY': 'Quantity', 'Qty' : 'Quantity', 'QUANTITY': 'Quantity', 
 'AMOUNT': 'Amount',  'Amount': 'Amount', 
'Description': 'Product Name','Description': 'Product Name','DESCRIPTION OF GOODS': 'Product Name',
'DESCRIPTION': 'Product Name' }
};

const dict4 = {
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
const dict3 = {
  headers: ['Supplier ID','Total Amount'],
  mapping: {
  'GST REG NO:':'Supplier ID', 'GST Reg No.:':'Supplier ID', 'GST Reg.No:':'Supplier ID', 'ST Reg. No.':'Supplier ID', 'GST Registration No':'Supplier ID',
  'GST Registration No.:':'Supplier ID','GST No :':'Supplier ID','GST REG.NO:':'Supplier ID','Company Reg No & GST Reg No:':'Supplier ID','GST REG NO.':'Supplier ID','GST Reg. No.':'Supplier ID','GST REG.NO':'Supplier ID',
  'TOTAL OUTSTANDING SGD':'Total Amount', '0.00':'Total Amount', 'SGD':'Total Amount', 'TOTAL':'Total Amount', 'Total':'Total Amount', 'TOTAL':'Total Amount', '$':'Total Amount', 'TOTAL (SGD)':'Total Amount', 'Total aging for each bill to':'Total Amount', 'S$ :':'Total Amount', 'Total in SGD':'Total Amount', '-':'Total Amount', 'Total=$':'Total Amount', 
  'Total Outstandings:':'Total Amount', 'Aged Amounts':'Total Amount', 'SGD:':'Total Amount', 

}
}; 

// Replace with any required dictionary or options for "john-package"

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a route to handle the data upload
app.post('/uploadDatainvoice', upload.single('pdfFile'), async (req, res) => {
  try {
    // Get the uploaded file path from the request object
    const filepath = req.file.path;

    // Perform OCR and upload data to MongoDB
    await processOCRAndUploadToMongoDB_Invoice(filepath, dict1, dict2);

    console.log('File uploaded and data extracted successfully!');
    res.status(200).json({ message: 'File uploaded and data extracted successfully!' });
  } catch (error) {
    console.error('Error uploading file and extracting data:', error);
    res.status(500).json({ error: 'Error uploading file and extracting data.' });
  }
});

// Create a route to handle the data upload
app.post('/uploadDatasoa', upload.single('pdfFile'), async (req, res) => {
    try {
      // Get the uploaded file path from the request object
      const filepath = req.file.path;
  
      // Perform OCR and upload data to MongoDB
      await processOCRAndUploadToMongoDB_SOA(filepath, dict3, dict4);
  
      console.log('File uploaded and data extracted successfully!');
      res.status(200).json({ message: 'File uploaded and data extracted successfully!' });
    } catch (error) {
      console.error('Error uploading file and extracting data:', error);
      res.status(500).json({ error: 'Error uploading file and extracting data.' });
    }
  });


  