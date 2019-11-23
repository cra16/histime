var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var helmet = require('helmet');

app.use(helmet());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(history());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//내가 추가한 부분
var login = require('./routes/login');
var course_update = require('./routes/course_update');
app.use('/api/login', login);
app.use('/api/course_update', course_update);

//give to frontend information for Show page
var show = require('./routes/show');
app.use('/api/show', show);

//favorite
var make = require('./routes/make');
app.use('/api/make', make);

var aboutus =  require('./routes/aboutus');
app.use('/api/aboutus', aboutus);

var individual =  require('./routes/individual');
app.use('/api/individual', individual);

////////////////////////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
