var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var routePersona = require('./routes/routePersona');
var routeCurso = require('./routes/routeCurso');
var routeEstado = require('./routes/routeEstadoAcademico');
var routeInscripcion = require('./routes/routeInscripcion');
var routeCarrera = require('./routes/routeCarrera');
var routeProfesor = require('./routes/routeProfesor');

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routePersona);
app.use('/', routeCurso);
app.use('/', routeEstado);
app.use('/', routeInscripcion);
app.use('/', routeCarrera);
app.use('/', routeProfesor);


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
