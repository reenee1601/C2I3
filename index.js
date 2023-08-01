const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//const invoiceRouter = require('./routes/invoice');

const app = express();

// Set up MongoDB connection
const MONGODB_URI = "mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});

// Set up view engine and static file middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
//app.use('/invoice', invoiceRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {db};