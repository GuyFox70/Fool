const express = require('express');
const config = require('config');
const favicon = require('express-favicon');
const path = require('path');
const cssClean = require('./public/stylesheet/cleanCSS');
const compressImages = require('./public/images/compressImage');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const indexRouter = require('./router/index')
cssClean();
// compressImages('/raw/cards/', '/compress/');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

http.listen(config.get('customer.port'), () => {
  console.log('server works!!!');
});