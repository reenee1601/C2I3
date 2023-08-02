// This will be under the nested route `soa`
const express = require('express');
const router = express.Router();
const soaController = require('../controllers/soaController');

// configure multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'soa' + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

/*
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
*/
router.post('/textractData', upload.single('file'), soaController.textractData); // run textract analysis on given data. 
router.post('/uploadData', soaController.uploadData); // upload edited data

router.get('/getData', soaController.getData); // query data



module.exports = router
