/////// INVOICE CONTROLLER
const { unlink } = require('fs') // use this to delete the file after we're done
const utils = require('../utils/utils.js')
const Invoice = require('../models/invoiceModel');
const mongoose = require('mongoose');

// Establish the MongoDB connection
mongoose.connect('mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Get the connection object
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to the database');
});
const formsDict = { // list of key-value pairs you want to extract
  headers: ['invoiceID', 'issuedDate', 'dueDate', 'supplierID','GST','totalBeforeGST','totalAfterGST' ],
mapping: {'INVOICE NO.':'invoiceID','Tax Invoice':'invoiceID',
  'Invoice Date':'issuedDate' , 'DATE':'issuedDate', 
    'Due Date': 'dueDate',
  'GST 7%' : 'GST',  'Add 7% GST': 'GST', 
  'TOTAL':'totalAfterGST', 'GRAND TOTAL':'totalAfterGST', 'Grand Total':'totalAfterGST', 'Amount Payable':'totalAfterGST',
  'Sub Total':'totalBeforeGST', 'SUB TOTAL':'totalBeforeGST', 'Net Amount':'totalBeforeGST',
  'SUBTOTAL SGD':'totalBeforeGST', 'TOTAL':'totalBeforeGST'
,'Salesman Code':'supplierID',
  }
};

const tablesDict = { // list of table headers you want to extract
headers: ['productCode', 'quantity', 'amount', 'productName' ],
mapping: {
'ITEM ID' :'productCode','Produc Code':'productCode','Product Code':'productCode'
 ,'QTY':'quantity', 'Qty' :'quantity', 'QUANTITY':'quantity', 
 'AMOUNT':'amount',  'Amount':'amount', 
'Description':'productName','Description':'productName','DESCRIPTION OF GOODS':'productName',
'DESCRIPTION':'productName' }
};

async function uploadDataToMongoDB(data) {
  
  try {
    // Save the extracted data to the Invoice collection
    await Invoice.create(data);

    console.log('Data uploaded to MongoDB successfully!');
    console.log(data);
  } catch (error) {
    console.error('Error uploading data to MongoDB:', error);
  }
}

////// NON EXPORTED FUNCTIONS
////// EXPORTED FUNCTIONS
exports.scanData = async function(req, res) { // function for textractData POST endpoint
    console.log('start of console');
    //file = await req.file;
    file = req.file;
    if (!file) {return res.status(500).json({message: 'no file sent'})}
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
    res.status(200).json(ocrData)
    // res.json({message:'file uploaded successfully at '})
}

exports.uploadDataInvoice = async function(req, res) {

  try {
    const data = req.body; // Declare 'data' using 'const'
    if (!data) {
      return res.status(400).json({ message: 'No data provided for upload.' });
    }

    await uploadDataToMongoDB(data);

    console.log('Invoice data uploaded successfully');
    return res.status(200).json({ message: 'Successfully uploaded invoice data.' });
  } catch (err) {
    console.error('Error uploading Invoice to MongoDB', err);
    return res.status(500).json({ message: 'Error uploading invoice data.' });
  }
};


exports.getData = async function(req, res){ // funcitonfor getData GET endpoint

  try {
      const invoiceData = await Invoice.find();
        console.log('retreived invoive data')
        res.status(200).json(invoiceData);
    } catch (error) {
        console.error('Error fetching SOA data:', error);
        res.status(500).json({ error: 'Error fetching Invoice data.' });
    }
}


