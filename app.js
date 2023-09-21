var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const dotenv = require('dotenv');
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const leyesRouter = require('./routes/leyesRouter');
const doctrinasRouter = require('./routes/doctrinasRouter');
const escritosRouter = require('./routes/escritosRouter');
const mpApiRouter = require('./routes/mpApiRouter');

var app = express();

dotenv.config();

// Agrega credenciales de Mercado Pago
const mercadoPagoPublicKey = 'TEST-69bd0234-5b8e-45a0-9947-0c78be31c6db';
const mercadoPagoAccessToken = 'TEST-115987069414605-082816-f6542108affd928132b27cdb5c74e7e6-18034905';
mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser());

app.use(userLoggedMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leyes', leyesRouter);
app.use('/doctrinas', doctrinasRouter);
app.use('/escritos', escritosRouter);
app.use('/api', mpApiRouter);


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
