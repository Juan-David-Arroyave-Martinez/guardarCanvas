var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
	res.sendfile(__dirname + '/views/home.html');
});

var contador = 0;
io.on('connection', function(socket){
    contador++;
    io.sockets.emit('hola', contador);
    //console.log("contador " + contador);

    socket.on('mover', function( movimientos){
    	io.sockets.emit('update', movimientos);
    	console.log("moviendo.... " +  movimientos);
    })
});

var puerto = 8080;
http.listen(puerto, function(){
	console.log("nuestro server esta por el puerto " + puerto);
});