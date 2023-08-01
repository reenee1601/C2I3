// This will be under the nested route `invoice`

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const upload = multer({ storage });

router.post('/textractData', upload.single('file'), invoiceController.textractData); // run textract analysis on given data. 
router.post('/uploadData', invoiceController.uploadData); // upload edited data

router.get('/getData/:params', invoiceController.getData); // query data

