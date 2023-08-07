const invoiceModel = require('../models/invoiceModel'); 

//utility function to calculate the total amount of an array of numbers 
function calculateTotal(arr) {
    return arr.reduce((total, amount) => total + parseFloat(amount), 0);
  }

async function generateTaxReport() {
try {
    // Get all invoices from the database
    const invoices = await invoiceModel.find({});

    // Initialize variables to store the tax report data
    let nonGSTPurchases = [];
    let taxPurchasesBeforeGST = [];
    let totalPurchasesAfterGST = 0;

    // Loop through each invoice to categorize purchases
    for (const invoice of invoices) {
    const { totalBeforeGST, totalAfterGST, GST } = invoice;

    // Check if the GST value is non-zero
    if (parseFloat(GST) === 0) {
        nonGSTPurchases.push(invoice);
    } else {
        taxPurchasesBeforeGST.push(invoice);
    }

    // Calculate the total purchases after GST
    totalPurchasesAfterGST += parseFloat(totalAfterGST);
    }

    // Calculate the total amount for non-GST and tax purchases before GST
    const totalNonGSTPurchases = calculateTotal(
    nonGSTPurchases.map((invoice) => invoice.totalBeforeGST)
    );
    const totalTaxPurchasesBeforeGST = calculateTotal(
    taxPurchasesBeforeGST.map((invoice) => invoice.totalBeforeGST)
    );

    // Build the tax report object
    const taxReport = {
    nonGSTPurchases,
    totalNonGSTPurchases,
    taxPurchasesBeforeGST,
    totalTaxPurchasesBeforeGST,
    totalPurchasesAfterGST,
    };

    return taxReport;
} catch (error) {
    // Handle any errors that might occur during the process
    throw new Error('Error generating tax report: ' + error.message);
}
}

module.exports = generateTaxReport;