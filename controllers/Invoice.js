// Assuming you have already installed and required the "john-package" in your application
const johnPackage = require('john-package');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose")

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

    // Combine the extracted data if needed
    const combinedData = Object.assign({},formsData, tablesData);
    //const combinedData = { forms: formsData, tables: tablesData };
  
    return combinedData;
  } catch (error) {
    console.error('Error performing OCR and extracting data:', error);
    throw error;
  }
}

// Function to upload data to MongoDB
async function uploadDataToMongoDB(data) {
  const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/'; // Replace with your MongoDB server information
  const dbName = 'project_data'; // Replace with your desired database name

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Invoices'); // Replace with your desired collection name

    // Insert the data into the collection
    await collection.insertOne(data);

    console.log('Data uploaded to MongoDB successfully!');
    console.log(data);
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error);
  } finally {
    client.close();
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

// Call the controller function with the file path and dictionary as needed
const filepath = 'C:/Users/Admin/Documents/Invoice(7).pdf';
const dict1 = {
    headers: ['Invoice ID', 'Issued Date', 'Due Date','Supplier ID', 
    'Total Before GST','Total After GST', 'GST' ],
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
    'Issues Date':'Issued Date', 'Invoice Date':'Issued Date',
    'Due Date':'Due Date', 'GST REG NO:':'Supplier ID', 'GST Reg No.:':'Supplier ID', 'GST Reg.No:':'Supplier ID', 
    'ST Reg. No.':'Supplier ID', 'GST Registration No':'Supplier ID',
    'GST Registration No.:':'Supplier ID','GST No :':'Supplier ID','GST REG.NO:':'Supplier ID',
    'Company Reg No & GST Reg No:':'Supplier ID','GST REG NO.':'Supplier ID','GST Reg. No.':'Supplier ID',
    'GST REG.NO':'Supplier ID','Product Code' : 'Product Code', 'Qty': 'QTY', 'GST 7%' : 'GST', 
     'Total' : 'Total Before GST', 'GRAND TOTAL' : 'Total After GST' 

}
};

const dict2 = {
headers: ['Product Code', 'Quantity', 'Amount', 'Product Name' ],
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
'Issues Date':'Issued Date', 'Invoice Date':'Issued Date',
'Due Date':'Due Date', 'GST REG NO:':'Supplier ID', 'GST Reg No.:':'Supplier ID', 'GST Reg.No:':'Supplier ID', 
'ST Reg. No.':'Supplier ID', 'GST Registration No':'Supplier ID',
'GST Registration No.:':'Supplier ID','GST No :':'Supplier ID','GST REG.NO:':'Supplier ID',
'Company Reg No & GST Reg No:':'Supplier ID','GST REG NO.':'Supplier ID','GST Reg. No.':'Supplier ID',
'GST REG.NO':'Supplier ID','Product Code' : 'Product Code', 'Qty': 'Quantity', 'GST 7%' : 'GST', 
 'Total' : 'Total Before GST', 'GRAND TOTAL' : 'Total After GST' , 'Description': 'Product Name'
}
};

 // Replace with any required dictionary or options for "john-package"
processOCRAndUploadToMongoDB(filepath, dict1, dict2);
