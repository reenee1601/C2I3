var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const soaController = require('../controllers/soaController.js');
const uploadDataSOA= soaController.uploadDataSOA;
const getSOAData= soaController.getSOAData;
const exportDataCSV= soaController.exportDataCSV;
const exportDataExcel= soaController.exportDataExcel;
const getSOADataUsingId= soaController.getSOADataUsingId;


router.post('/uploadDataSOA', upload.single('pdfFile'), uploadDataSOA);
  
router.get('/getSOAData', getSOAData);

router.get('/exportToCSV', exportDataCSV);

router.get('/exportToExcel', exportDataExcel);

router.get('/getSOAData/:id', getSOADataUsingId);



module.exports = router;