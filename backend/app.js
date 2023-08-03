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
<<<<<<< Updated upstream
var taxReportRouter = require('./routes/taxReportRouter');

=======
var productRouter = require('./routes/productRouter');
>>>>>>> Stashed changes

var app = express();


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
<<<<<<< Updated upstream
app.use('/tax', taxReportRouter);
=======
app.use('/product', productRouter);
>>>>>>> Stashed changes

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
