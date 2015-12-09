/**
 * http://usejsdoc.org/
 */


/**
 * Module dependencies.
 */
var express = require('express');
var config = require('config');

var app = express();
app.use(express.static('public')) ;
app.locals.config = config.get('config') ;


var server = app.listen(app.locals.config.clientPort,function(){
	console.log('easyFMC listening on port :'+app.locals.config.clientPort) ;
});
var io = require('socket.io').listen(server);

/*
 * Socket IO Listen
*/
io.on('connection', function(client) {
	console.log('connection !!') ;
	
	client.on('click',function(data){
		console.log('click : '+data) ;
		io.emit('msg','clicked on :'+data) ;
		/*
		setTimeout(function(){
			io.emit('msg','clicked on :'+data) ;	
		}, 1000);*/
	});
	
	client.on('disconnect',function(data){
		console.log('client disconnected') ;
	}) ;
});






