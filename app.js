require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');
var viewPostRouter = require('./routes/viewpost');
var newPostRouter = require('./routes/newpost');
var commentRouter = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const cookieTimeout = 60 * 60 * 1000; //One hour

var sess = {
  secret: process.env.COOKIE_SECRET || 'shhhh',
  cookie: {secure: false, maxAge: cookieTimeout},
  resave: true,
  saveUninitialized: false,
}

if (process.env.ENV_TYPE === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

//Attach routes
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/viewpost', viewPostRouter);
app.use('/newpost', newPostRouter);
app.use('/comment', commentRouter);


//Handle 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

//Handle all other errors
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





//Get the DB working
const db = require("./models");

module.exports = app;
