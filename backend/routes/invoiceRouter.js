var express = require('express');
var router = express.Router();
const invoiceController = require('../controllers/invoiceController.js');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'invoice'+ '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// Create a route to handle the data upload
router.post('/scanData', upload.single('file'), invoiceController.scanData); // run textract analysis on given data. 
router.post('/uploadData', invoiceController.uploadData); // upload edited data

router.get('/getData', invoiceController.getData); // query data

module.exports = router;
