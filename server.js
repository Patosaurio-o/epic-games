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
  res.render('index');
});

app.get('/boton',(req, res) => {
  res.render('boton');
});

app.get('/colores',(req, res) => {
  res.render('colores');
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

  socket.on('changeColor', function(data){
    io.emit('color', data)
  });
  /*socket.on('rojo', function() {
    io.emit('color', {color: 'red'});
  });
  socket.on('verde', function() {
    io.emit('color', {color: 'green'});
  });
  socket.on('azul', function() {
    io.emit('color', {color: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(7,72,139,1) 49%, rgba(8,25,131,1) 100%, rgba(0,212,255,1) 100%);'});
  });
  socket.on('amarillo', function() {
    io.emit('color', {color: 'yellow'});
  });*/

});