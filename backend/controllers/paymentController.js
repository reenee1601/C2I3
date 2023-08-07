/////// INVOICE CONTROLLER
const { unlink } = require('fs') // use this to delete the file after we're done
const utils = require('../utils/utils.js')
//const Invoice = require('../models/invoiceModel');
const paymentModel = require('../models/paymentModel');
const johnPackage = require('john-package');
const mongoose = require('mongoose');


const tablesDict = { // list of table headers you want to extract
headers: ['PayerName', 'Comment', 'Reference'],
mapping: {
'From': 'PayerName', 'Your Comments' : 'Comment','Reference No.': 'Reference'}
};

////// NON EXPORTED FUNCTIONS
////// EXPORTED FUNCTIONS
exports.scanDataPayment = async function(req, res) { // function for textractData POST endpoint
    console.log('start of console');
    file = await req.file;
    if (!file) {res.status(500).json({message: 'no file sent'})}
    var ocrDataPayment;
    console.log(file);
    console.log(ocrDataPayment);

    // do file operations here
    try{
        // perform ocr AND extract the tables and forms; look at utils.js for more info
        //ocrDataPayment = await utils.performOcrPayment("C:/HuiYi/SUTD/Modules/Term 5/Elements of Software Construction/payment.jpg", tablesDict);
        ocrDataPayment = await utils.performOcrPayment(file.path, tablesDict);
        await paymentModel.create(ocrDataPayment);

    } catch (err) {
        console.error('Error performing OCR Payment on file ' + file.originalname, err);
        res.status(500).json({message: 'Error performing OCR Payment on file ' + file.originalname})
    }

    // delete the file after operations
    unlink(file.path, err => {console.log('file deleted'); if (err) {console.log(err)} })
    console.log('end of console')
    
    // return the data to the front end
    res.json(ocrDataPayment)
    // res.json({message:'file uploaded successfully at '})
}


exports.uploadDataPayment = async function(req, res) { // function for uploadData POST endpoint
    try{data = req.body;
    await paymentModel.create(data);

    console.log()
    res.status(200).json({message:'Successfully uploaded payment onto MongoDB'})}
    catch (err) {
        console.error('Error uploading payment to MongoDB', err);
        res.status(500).json({message:'Error uploading payment to MongoDB'})
    }
}


exports.getDataPayment = async function(req, res){ // funciton for getData GET endpoint

  try {
      const paymentData = await paymentModel.find();
        console.log('retreived invoive data')
        res.status(200).json(paymentData);
    } catch (error) {
        console.error('Error fetching payment data:', error);
        res.status(500).json({ error: 'Error fetching payment data.' });
    }
}
