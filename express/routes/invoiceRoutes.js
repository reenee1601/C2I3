// This will be under the nested route `invoice`
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// configure multer
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

/*
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
*/
router.post('/textractData', upload.single('file'), invoiceController.textractData); // run textract analysis on given data. 
router.post('/uploadData', invoiceController.uploadData); // upload edited data

router.get('/getData', invoiceController.getData); // query data



module.exports = router
