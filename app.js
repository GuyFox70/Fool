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
    objUsers.user1 = {};
    objUsers.user2 = {};

io.on('connection', (socket) => {

  socket.on('nameRoomAndUser', (msg) => {
    nameRoom = msg.room;

    socket.join(nameRoom);

    let sizeRoom = io.sockets.adapter.rooms[nameRoom].length;

    if (sizeRoom > 2) {
      socket.leave(nameRoom);
      socket.emit('status', true);
    } else if(sizeRoom != 2) {
      objUsers.user1.userName = msg.user;
      objUsers.user1.gamer = 1;
      objUsers.user1._id = socket.id;
      socket.emit('status', false);
    }

    if (sizeRoom == 2) {
      socket.emit('status', false);

      objUsers.user2.userName = msg.user;
      objUsers.user2.gamer = 2;
      objUsers.user2._id = socket.id;
      
      let members = Object.keys(io.sockets.adapter.rooms[nameRoom].sockets);
      let cards = arrayMixCards();
          objUsers.user1.mixCards = cards;
          objUsers.user2.mixCards = cards;

      for (let member of members) {
        if (member == socket.id) {
          socket.to(nameRoom).emit('getRival',  objUsers.user2);
        } else {
          socket.emit('getRival',  objUsers.user1);
        }
      }
    }

    socket.on('send cards rival_1', (msg) => {

      socket.to(objUsers.user1._id).emit('get cards rival_1', msg);

    });

    socket.on('send cards rival_2', (msg) => {

      socket.to(objUsers.user2._id).emit('get cards rival_2', msg);

    });

  });

  socket.on('disconnect', () => {
    socket.leave(nameRoom);
    // sockets = Object.keys(io.sockets.connected);
  });
});