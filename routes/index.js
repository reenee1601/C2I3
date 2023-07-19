var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

module.exports = router;
