var express = require('express');
var router = express.Router();
const multer = require('multer');
const invoiceController = require('../controllers/invoiceController.js');
const upload = multer({ dest: 'uploads/' });
const uploadDataInvoice= invoiceController.uploadDataInvoice;


// Create a route to handle the data upload
router.post('/uploadDataInvoice', upload.single('pdfFile'), uploadDataInvoice);

module.exports = router;