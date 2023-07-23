const { db } = require('./db.js');

class InvoiceItem {
    constructor(productIDCompanyName, InvoiceID, productQuantity, price) {
        this.productIDCompanyName = productIDCompanyName;
        this.InvoiceID = InvoiceID;
        this.productQuantity = productQuantity;
        this.price = price;
    }
}

/**
 * Adds a new invoice item to the "InvoiceItem" collection.
 * @param {InvoiceItem} invoiceItem - The invoice item object to be added.
 */
async function addInvoiceItem(invoiceItem) {
    try {
        const collection = db.collection("InvoiceItem");
        const { productIDCompanyName, InvoiceID, productQuantity, price } = invoiceItem;
        const record = new InvoiceItem(productIDCompanyName, InvoiceID, productQuantity, price);
        const result = await collection.insertOne(record);
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

/**
 * Retrieves all invoice items from the "InvoiceItem" collection that match the given Invoice ID.
 * @param {string} invoiceID - The Invoice ID to filter the invoice items.
 * @returns {Array} - An array of invoice items matching the Invoice ID.
 */
async function getInvoiceItemsByInvoiceID(invoiceID) {
    try {
        const collection = db.collection("InvoiceItem");
        const query = { InvoiceID: invoiceID };
        const cursor = await collection.find(query);
        const result = [];
        while (await cursor.hasNext()) {
            const dbObj = await cursor.next();
            result.push(new InvoiceItem(dbObj.productIDCompanyName, dbObj.InvoiceID, dbObj.productQuantity, dbObj.price));
        }
        return result;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

module.exports = { InvoiceItem, addInvoiceItem, getInvoiceItemsByInvoiceID };
