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

io.on('connection', (socket) => {

  socket.on('nameRoom', (msg) => {
    socket.join(msg);
    console.log(io.sockets.adapter.rooms[msg].length);
    if (io.sockets.adapter.rooms[msg].length > 2) {
      socket.leave(msg);
      console.log('jkdfs');
      socket.emit('busy', true);
    }
  });

  socket.on('disconnect', () => {
    // sockets = Object.keys(io.sockets.connected);
    // clearInterval(id);
  });
});

function getRandomMember(arr, user) {
  if (arr.length > 1) {

    let num = (getRandomInt(0, arr.length - 1));
    let member = arr.splice(num, 1);

    if (user != member[0]) {
      return member[0];
    } else {

      arr.push(member[0]);

      if (num == arr.length - 1) {
        return arr[num--];
      } else if (num == 0) {
        return arr[num++];
      } else {
        return arr[num++];
      }
    }
  } else {
    return undefined;
  }
  
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}