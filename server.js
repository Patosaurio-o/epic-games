const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({secret: 'mipropiaclave'}));  

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/'));

app.get('/',(req, res) => {
  res.render('index.ejs');
});

const server = app.listen(8000, () =>
console.log(`el server esta usando el puerto: ${server.address().port}!`)
);

const io = require('socket.io')(server);
io.on('connection', function(socket) {
  let number = 0;
  socket.on('reset', function() {
    number = 0;
    io.emit('num', {num: number});
  });
  socket.on('up', function() {
    number += 1;
    io.emit('num', {num: number});
  });
});