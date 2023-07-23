// Assuming you have already installed and required the "john-package" in your application
const johnPackage = require('john-package');
const { MongoClient } = require('mongodb');

// Function to perform OCR and extract data
async function performOCRAndExtractData(filepath, dict) {
  try {
    // Perform OCR and get the analysis result
    const ocrData = await johnPackage.getTextractAnalysis(filepath);

    // Extract forms and tables from the OCR result using "john-package" functions
    const formsData = johnPackage.extractForms(ocrData, dict);
    //const tablesData = johnPackage.extractTables(ocrData, dict);
    //transform the json data into object format
    //const data = JSON.parse(formsData);

    // Combine the extracted data if needed
    //const combinedData = { forms: formsData, tables: tablesData };

    return formsData;
  } catch (error) {
    console.error('Error performing OCR and extracting data:', error);
    throw error;
  }
}

// Function to upload data to MongoDB
async function uploadDataToMongoDB(data) {
  const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/';
 // Replace with your MongoDB server information
  const dbName = 'TEST'; // Replace with your desired database name

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('invoices'); // Replace with your desired collection name

    // Insert the data into the collection
    await collection.insertOne(data);

    console.log('Data uploaded to MongoDB successfully!');
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error);
  } finally {
    client.close();
  }
}

// Example usage in a controller function
async function processOCRAndUploadToMongoDB(filepath, dict) {
  try {
    // Perform OCR and extract data
    const extractedData = await performOCRAndExtractData(filepath, dict);

    // Upload the extracted data to MongoDB
    await uploadDataToMongoDB(extractedData);

    console.log('OCR data extracted and uploaded to MongoDB successfully!');
  } catch (error) {
    console.error('Error processing OCR and uploading to MongoDB:', error);
  }
}

// Call the controller function with the file path and dictionary as needed
const filepath = 'C:/Users/Admin/Downloads/Invoice.pdf';
const dict = {
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
    'Due Date':'Due Date'
}
}; // Replace with any required dictionary or options for "john-package"
processOCRAndUploadToMongoDB(filepath, dict);
