//var mongojs = require("mongojs");

var db = null;//mongojs('localhost:27017/myGame', ['account','progress']);

require('./server/js/Entity');
require('./server/js/util')

var express = require('express');

var app = express();

var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen( process.env.PORT || 2045 );

console.log("Server started.");

SOCKET_LIST = {};

var DEBUG = true;


var isValidPassword = function(data,cb){
	return cb(true);

	/*db.account.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});*/

}


var isUsernameTaken = function(data,cb){
	return cb(false);

	/*db.account.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});*/

}

var addUser = function(data,cb){
	return cb();
	
	/*db.account.insert({username:data.username,password:data.password},function(err){
		cb();
	});*/
}


var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){

	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	
	socket.on('signIn',function( data ){

		isValidPassword( data,function(res){

			if( res ){

				Player.onConnect( socket , data.username , data.color );

				socket.emit('signInResponse',{success:true});

			} else {

				socket.emit('signInResponse',{success:false});

			}

		});

	});


	socket.on('signUp',function(data){

		isUsernameTaken(data,function(res){

			if(res){
				socket.emit('signUpResponse',{success:false});		
			} else {
				addUser(data,function(){
					socket.emit('signUpResponse',{success:true});					
				});
			}

		});	

	});
	
	socket.on('disconnect',function(){

		delete SOCKET_LIST[socket.id];

		Player.onDisconnect(socket);

	});
	
	
});



setInterval(function(){

	var packs = Entity.getFrameUpdateData();

	for(var i in SOCKET_LIST){

		//var thisLoop = new Date;
		
		var socket = SOCKET_LIST[i];

		socket.emit( 'init' , packs.initPack );
		socket.emit( 'update' , packs.updatePack );
		socket.emit( 'remove' , packs.removePack );

		//var fps = 1000 / ( thisLoop - lastLoop );
		//lastLoop = thisLoop;

	}
	
},20);



getSpdFromAngle = function( mouseAngle ){

	spd = {}; 

	if( mouseAngle >= 5 && mouseAngle < 15 ){
		spd.x = 8;
		spd.y = 1;
		spd.direction = 27; 
	}

	if( mouseAngle >= 15 && mouseAngle < 25 ){
		spd.x = 7;
		spd.y = 2;
		spd.direction = 26; 
	}

	if( mouseAngle >= 25 && mouseAngle < 35 ){
		spd.x = 6;
		spd.y = 3;
		spd.direction = 25; 
	}

	if( mouseAngle >= 35 && mouseAngle < 45 ){
		spd.x = 5;
		spd.y = 4;
		spd.direction = 24; 
	}

	if( mouseAngle >= 45 && mouseAngle < 55 ){
		spd.x = 4;
		spd.y = 5;
		spd.direction = 23; 
	}

	if( mouseAngle >= 55 && mouseAngle < 65 ){
		spd.x = 3;
		spd.y = 6;
		spd.direction = 22; 
	}

	if( mouseAngle >= 65 && mouseAngle < 75 ){
		spd.x = 2;
		spd.y = 7;
		spd.direction = 21; 
	}

	if( mouseAngle >= 75 && mouseAngle < 85 ){
		spd.x = 1;
		spd.y = 8;
		spd.direction = 20; 
	}

	if( mouseAngle >= 85 && mouseAngle < 95 ){
		spd.x = 0;
		spd.y = 9;
		spd.direction = 19; 
	}

	if( mouseAngle >= 95 && mouseAngle < 105 ){
		spd.x = -1;
		spd.y = 8;
		spd.direction = 18; 
	}

	if( mouseAngle >= 105 && mouseAngle < 115 ){
		spd.x = -2;
		spd.y = 7;
		spd.direction = 17; 
	}

	if( mouseAngle >= 115 && mouseAngle < 125 ){
		spd.x = -3;
		spd.y = 6;
		spd.direction = 16; 
	}

	if( mouseAngle >= 125 && mouseAngle < 135 ){
		spd.x = -4;
		spd.y = 5;
		spd.direction = 15; 
	}

	if( mouseAngle >= 135 && mouseAngle < 145 ){
		spd.x = -5;
		spd.y = 4;
		spd.direction = 14; 
	}

	if( mouseAngle >= 145 && mouseAngle < 155 ){
		spd.x = -6;
		spd.y = 3;
		spd.direction = 13; 
	}

	if( mouseAngle >= 155 && mouseAngle < 165 ){
		spd.x = -7;
		spd.y = 2;
		spd.direction = 12; 
	}

	if( mouseAngle >= 165 && mouseAngle < 175 ){
		spd.x = -8;
		spd.y = 1;
		spd.direction = 11; 
	}

	if( mouseAngle <= 5 && mouseAngle > -5 ){
		spd.x = 9;
		spd.y = 0;
		spd.direction = 28; 
	}

	if( mouseAngle <= -5 && mouseAngle > -15 ){
		spd.x = 8;
		spd.y = -1;
		spd.direction = 29; 
	}

	if( mouseAngle <= -15 && mouseAngle > -25 ){
		spd.x = 7;
		spd.y = -2;
		spd.direction = 30; 
	}

	if( mouseAngle <= -25 && mouseAngle > -35 ){
		spd.x = 6;
		spd.y = -3;
		spd.direction = 31; 
	}

	if( mouseAngle <= -35 && mouseAngle > -45 ){
		spd.x = 5;
		spd.y = -4;
		spd.direction = 32; 
	}

	if( mouseAngle <= -45 && mouseAngle > -55 ){
		spd.x = 4;
		spd.y = -5;
		spd.direction = 33; 
	}

	if( mouseAngle <= -55 && mouseAngle > -65 ){
		spd.x = 3;
		spd.y = -6;	
		spd.direction = 34; 
	}

	if( mouseAngle <= -65 && mouseAngle > -75 ){
		spd.x = 2;
		spd.y = -7;	
		spd.direction = 35; 
	}

	if( mouseAngle <= -75 && mouseAngle > -85 ){
		spd.y = -8;	
		spd.x = 1;	
		spd.direction = 36; 
	}

	if( mouseAngle <= -85 && mouseAngle > -95 ){
		spd.x = 0;
		spd.y = -9;

		spd.direction = 1; 	
	}

	if( mouseAngle <= -95 && mouseAngle > -105 ){
		spd.x = -1;
		spd.y = -8;

		spd.direction = 2; 
	}

	if( mouseAngle <= -105 && mouseAngle > -115 ){
		spd.x = -2;
		spd.y = -7;

		spd.direction = 3; 
	}

	if( mouseAngle <= -115 && mouseAngle > -125 ){
		spd.x = -3;
		spd.y = -6;
		spd.direction = 4; 
	}

	if( mouseAngle <= -125 && mouseAngle > -135 ){
		spd.x = -4;
		spd.y = -5;
		spd.direction = 5; 
	}

	if( mouseAngle <= -135 && mouseAngle > -145 ){
		spd.x = -5;
		spd.y = -4;
		spd.direction = 6; 
	}

	if( mouseAngle <= -145 && mouseAngle > -155 ){
		spd.x = -6;
		spd.y = -3;
		spd.direction = 7; 
	}

	if( mouseAngle <= -155 && mouseAngle > -165 ){
		spd.x = -7;
		spd.y = -2;
		spd.direction = 8; 
	}

	if( mouseAngle <= -165 && mouseAngle > -175 ){
		spd.x = -8;
		spd.y = -1;
		spd.direction = 9; 
	}

	if( mouseAngle <= -175 ){
		spd.x = -9;
		spd.y = 0; 
		spd.direction = 10; 
	}

	if( mouseAngle >= 175 ){
		spd.x = -9;
		spd.y = 0; 
		spd.direction = 10; 
	}


	return spd; 

}


getDistance = function( selfX , selfY , thisX , thisY ){

	return Math.sqrt(Math.pow( thisX - selfX , 2 ) + Math.pow( thisY - selfY , 2 ));

}


numberWithCommas = function(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}





/*
var profiler = require('v8-profiler');
var fs = require('fs');
var startProfiling = function(duration){
	profiler.startProfiling('1', true);
	setTimeout(function(){
		var profile1 = profiler.stopProfiling('1');
		
		profile1.export(function(error, result) {
			fs.writeFile('./profile.cpuprofile', result);
			profile1.delete();
			console.log("Profile saved.");
		});
	},duration);	
}
startProfiling(10000);
*/
