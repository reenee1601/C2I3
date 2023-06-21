require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

db.on("error", (err) => {
    console.log(err)
})

db.once("connected", () => {
    console.log("Database Connected")
})

const app = express();
app.use(express.json());

const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})
