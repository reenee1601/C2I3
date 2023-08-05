var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var invoiceRouter = require('./routes/invoiceRouter');
var soaRouter = require('./routes/soaRouter');
var creditNoteRouter = require('./routes/creditNoteRouter');
var taxReportRouter = require('./routes/taxReportRouter');
var productRouter = require('./routes/productRouter');

var app = express();

const db = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const crypto = require('crypto');

// Generate a secure random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);
 
// Define options for MongoStore
const options = {
  mongooseConnection: db.connection,
  collection: 'sessions',
};

// Create a new instance of MongoStore
const mongoStore = new MongoStore(options);

// Configure session
app.use(
  session({
    secret: secretKey,
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON data
app.use(bodyParser.json());

// Router setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/invoice', invoiceRouter);
app.use('/soa', soaRouter);
app.use('/cd', creditNoteRouter);
app.use('/tax', taxReportRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
