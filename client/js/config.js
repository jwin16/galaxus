var socket = io();


//var WIDTH = 1200;
//var HEIGHT = 1000;

var WIDTH = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var HEIGHT = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


var TILE_SIZE = 32;


var ctx = document.getElementById("ctx").getContext("2d");
var ctxIntro = document.getElementById("ctx-intro").getContext("2d");
var ctxLeader = document.getElementById("ctx-leader").getContext("2d");
var ctxMenu = document.getElementById("ctx-menu").getContext("2d");
var ctxScore = document.getElementById("ctx-score").getContext("2d");


// Menu & intro vars 
//
var starOneY = 1500; 
var starTwoY = 0; 


// Main config settings 
//
var DEBUG = true; 
var allowAudio = false; 


var Img = {};
Img.map = {};

Img.map['grid'] = new Image();
Img.map['grid'].src = "/client/img/zig.png";

Img.starFall  = new Image();
Img.starFall.src = '/client/img/stars_o2.png';

Img.starFall2  = new Image();
Img.starFall2.src = '/client/img/stars_o2.png';

Img.face0  = new Image();
Img.face0.src = '/client/img/face_happy0.png';

Img.face1  = new Image();
Img.face1.src = '/client/img/face_happy1.png';

Img.face2  = new Image();
Img.face2.src = '/client/img/face_happy2.png';

Img.abilities = new Image(); 
Img.abilities.src = '/client/img/interf.png';


getCellColor = function(){

	var randColor = 0; 

	randColor = parseInt( Math.random() * 7 );

	if( randColor == 1 ){
		return "#0d3ab9"; 
	} else if (randColor == 2 ){	
		return "#5a0db9"; 
	}else if( randColor == 3 ){
		return "#0db93a"; 
	}else if( randColor == 4){
		return "#d29217"; 
	}else if( randColor == 5 ){
		return "#d23117"; 
	}else if( randColor == 6){
		return "#d217c7"; 
	}else if( randColor == 7){
		return "#17d2d0"; 
	}

}
