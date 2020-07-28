const express = require('express');
const config = require('config');
const favicon = require('express-favicon');
const path = require('path');
const cssClean = require('./public/stylesheet/cleanCSS');
const compressImages = require('./public/images/compressImage');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const indexRouter = require('./router/index');
const roomsRouter = require('./router/listRooms')
cssClean();
// compressImages('/raw/', '/compress/defaultAvatar');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);
app.use('/rooms', roomsRouter);

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

let users;
let user = {};
let rival = {};

io.on('connection', (socket) => {
  const original = socket.id;

  socket.on('login', (msg) => {
  
    socket.join('room 237', () => {
      let rooms = Object.keys(socket.rooms);
      // console.log(rooms); // [ <socket.id>, 'room 237' ]
  
      if ((io.nsps['/'].adapter.rooms["room 237"].length > 2)) {
        socket.emit('have not place', 'sorry you need create new room!!!');
        socket.join('room 238', () => {
          console.log('You create a new room!');
        });
      }
    });
    
  });

  sockets = Object.keys(io.sockets.connected);

  socket.emit('get id of socket', original);

  socket.on('send name', (msg) => {
    // user = msg;
    console.log(msg);
  });

  socket.on('getRival', (msg) => {
    if (msg) rival = getRandomMember(sockets, original);

    setTimeout(function() {
      if (rival) {
        socket.emit('your rival', rival);
      } else {
        socket.emit('your rival', "There isn't free connections!");
      }

    }, 0);

  });

  socket.on('disconnect', () => {
    sockets = Object.keys(io.sockets.connected);
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