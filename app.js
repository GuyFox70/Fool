const express = require('express');
const config = require('config');
const favicon = require('express-favicon');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cssClean = require('./public/stylesheet/cleanCSS');
const compressImages = require('./public/images/compressImage');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const indexRouter = require('./router/index');
const roomsRouter = require('./router/routerListRooms');
const game= require('./router/routerGame');
cssClean();
// compressImages('/raw/', '/compress/defaultAvatar');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  }
}))

app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/game', game);

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

http.listen(config.get('customer.port'), () => {
  console.log('server works!!!');
});

let nameRoom;

io.on('connection', (socket) => {

  socket.on('nameRoom', (msg) => {
    nameRoom = msg;

    socket.join(nameRoom);

    if (io.sockets.adapter.rooms[nameRoom].length > 2) {
      socket.leave(nameRoom);
      socket.emit('busy', true);
    } else {
      socket.emit('free', false);
    }
  });

  socket.on('checkNumberOfGamers', (msg) => {
    socket.emit('numberOfGamers', nameRoom);
  })

  socket.on('disconnect', () => {
    // sockets = Object.keys(io.sockets.connected);
    // clearInterval(id);
  });
});