const db = require('./db.js').db;

class Test{
    constructor(id, amount, customer) {
        this.id = id;
        this.amount = amount;
        this.customer = customer;
    }
}

/**
 * 
 * @returns a list of all entries in invoiceData database
 */
async function all() {
    try {

        const collection = db.collection("invoiceData");
        const cursor = collection.find();
        var result = [];
        while(await cursor.hasNext()){
            const dbObj = await cursor.next();
            result.push(new Test(dbObj.id, dbObj.amount, dbObj.customer));
        }
        return result;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

module.exports =  { Test, all}