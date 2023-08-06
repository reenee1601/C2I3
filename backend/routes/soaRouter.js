var express = require('express');
var router = express.Router();
const soaController = require('../controllers/soaController.js');
//const uploadDataSOA= soaController.uploadDataSOA;
const getSOAData= soaController.getSOAData;
const exportDataCSV= soaController.exportDataCSV;
const exportDataExcel= soaController.exportDataExcel;
const getSOADataUsingId= soaController.getSOADataUsingId;

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'soa'+ '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

//router.post('/uploadDataSOA', upload.single('pdfFile'), uploadDataSOA);
router.post('/scanData', upload.single('file'), soaController.scanData)
  
router.post('/uploadData', soaController.uploadData); // upload edited data

router.get('/getSOAData', getSOAData);

router.get('/exportToCSV', exportDataCSV);

router.get('/exportToExcel', exportDataExcel);

router.get('/getSOAData/:id', getSOADataUsingId);



module.exports = router;
