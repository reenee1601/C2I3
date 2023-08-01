const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const invoiceRouter = require('./routes/invoiceRoutes');
const soaRouter = require('./routes/soaRoutes');

const app = express();

// Set up MongoDB connection
// const MONGODB_URI = "mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/?retryWrites=true&w=majority"
const MONGODB_URI = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority'
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
app.use('/invoice', invoiceRouter);
app.use('/soa', soaRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {db};

if (process.env['NODE_DEV'] == 'TEST') {

    app.post('/close-mongoose-connection', (req, res) => {
        mongoose.connection.close(() => {
        res.send('mongoose connection closed');
        });
    });
    module.exports = app;
} /*else {
    // execute database connection 
    dbConnect();
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

    module.exports = { app, dbConnect };
}*/

