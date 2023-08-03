const express = require('express');
const router = express.Router();
const generateTaxReport = require('../controllers/taxReportController'); 

router.get('/tax-report', async (req, res, next) => {
  try {
    const taxReport = await generateTaxReport();
    res.status(200).json(taxReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate tax report', error: error.message });
  }
});

module.exports = router;
