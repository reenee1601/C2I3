/////// INVOICE CONTROLLER
const { unlink } = require('fs') // use this to delete the file after we're done
const utils = require('../utils/utils.js')
const Invoice = require('../models/invoiceModel');
////// CONST DICTIONARIES
const formsDict = { // list of key-value pairs you want to extract
  headers: ['Invoice ID', 'Issued Date', 'Supplier ID','GST','Total Before GST','Total After GST', 'GST' ],
  mapping: {'INVOICE NO.': 'Invoice ID','Tax Invoice':'Invoice ID',
  'Invoice Date': 'Issued Date' , 'DATE': 'Issued Date', 
  'GST 7%' : 'GST',  'Add 7% GST': 'GST', 
  'TOTAL':'Total After GST', 'GRAND TOTAL': 'Total After GST', 'Grand Total': 'Total After GST', 'Amount Payable': 'Total After GST',
  'Sub Total': 'Total Before GST', 'SUB TOTAL': 'Total Before GST', 'Net Amount':'Total Before GST',
  'SUBTOTAL SGD': 'Total Before GST', 'TOTAL': 'Total Before GST'
,'Salesman Code': 'Supplier ID',
  }
};

const tablesDict = { // list of table headers you want to extract
headers: ['Product Code', 'Quantity', 'Amount', 'Product Name' ],
mapping: {
'ITEM ID' : 'Product Code','ode': 'Product Code','Product Code': 'Product Code'
 ,'QTY': 'Quantity', 'Qty' : 'Quantity', 'QUANTITY': 'Quantity', 
 'AMOUNT': 'Amount',  'Amount': 'Amount', 
'Description': 'Product Name','Description': 'Product Name','DESCRIPTION OF GOODS': 'Product Name',
'DESCRIPTION': 'Product Name' }
};
////// NON EXPORTED FUNCTIONS
////// EXPORTED FUNCTIONS
exports.textractData = async function(req, res) { // function for textractData POST endpoint
    console.log('start of console');
    file = await req.file;
    var ocrData;

    // do file operations here
    try{
        // perform ocr AND extract the tables and forms; look at utils.js for more info
        ocrData = await utils.performOcr(file.path, tablesDict, formsDict);

    } catch (err) {
        console.error('Error performing OCR on file ' + file.originalname, err);
        res.status(500).json({message: 'Error performing OCR on file ' + file.originalname})
    }

    // delete the file after operations
    unlink(file.path, err => {console.log('file deleted'); if (err) {console.log(err)} })
    console.log('end of console')
    
    // return the data to the front end
    res.json(ocrData)
    // res.json({message:'file uploaded successfully at '})
}


exports.uploadData = async function(req, res) { // function for uploadData POST endpoint
    try{data = req.body;
    await Invoice.create(data);

    console.log()
    res.status(200).json({message:'Successfully uploaded invoice onto MongoDB'})}
    catch (err) {
        console.error('Error uploading Invoice to MongoDB', err);
        res.status(500).json({message:'Error uploading Invoice to MongoDB'})
    }
}


exports.getData = async function(req, res){ // funcitonfor getData GET endpoint

  try {
      const invoiceData = await Invoice.find();
        console.log('retreived invoive data')
        res.status(200).json(invoiceData);
    } catch (error) {
        console.error('Error fetching SOA data:', error);
        res.status(500).json({ error: 'Error fetching SOA data.' });
    }
}
