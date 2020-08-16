const express = require('express');
const config = require('config');
const favicon = require('express-favicon');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const arrayMixCards = require('./utils/getListCards');
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
let objUsers = {};

io.on('connection', (socket) => {

  socket.on('nameRoomAndUser', (msg) => {
    nameRoom = msg.room;

    socket.join(nameRoom);

    let sizeRoom = io.sockets.adapter.rooms[nameRoom].length;

    if (sizeRoom > 2) {
      socket.leave(nameRoom);
      socket.emit('status', true);
    } else if(sizeRoom != 2) {
      objUsers['userName_1'] = msg.user;
      objUsers['id_1'] = socket.id;
      socket.emit('status', false);
    }

    if (sizeRoom == 2) {
      socket.emit('status', false);

      objUsers['userName_2'] = msg.user;
      objUsers['id_2'] = socket.id;
      
      let members = Object.keys(io.sockets.adapter.rooms[nameRoom].sockets);
      let cards = arrayMixCards();

      for (let member of members) {
        if (member != socket.id) {
          socket.to(member).emit('getMixCards', cards);
          socket.to(nameRoom).emit('getNameRival',  objUsers['userName_2']);
        } else {
          socket.emit('getNameRival',  objUsers['userName_1']);
          socket.emit('getMixCards', cards);
        }
      }
    }

  });

  socket.on('disconnect', () => {
    socket.leave(nameRoom);
    // sockets = Object.keys(io.sockets.connected);
  });
});