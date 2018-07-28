function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getDistance( selfX , selfY , thisX , thisY ){
	return Math.sqrt(Math.pow( thisX - selfX , 2 ) + Math.pow( thisY - selfY , 2 ));
}
		
$(function() {	

		var twidth = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var theight = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;

	var gameCanvas = document.getElementById('ctx');
	gameCanvas.width = twidth; 
	gameCanvas.height = theight; 

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var redirect = getParameterByName('p');
var username = getParameterByName('u');
$(function() {

	if( username  ){
		$("#signDiv-username").val( username );
	}

	if( redirect == 'r'){
		$( "#signDiv-signIn" ).trigger( "click" );
	}


});


var setEndGame = false;
var selfX = 0; 
var selfY = 0;  
var updateFrame = 0; 



function getColorsFromCode( color ){

	colors = []; 

	if( color == "#fffa47" ){
		colors[0] = "#fffa47"; 
		colors[1] = "#e4f95a"; 
		colors[2] = "#d0ce08";
		colors[3] = "#fffc00"; 
		colors[4] = "#c3d73e"; 
	}	

	if( color == "#69a2f6" ){
		colors[0] = "#69a2f6"; 
		colors[1] = "#1d47b2"; 
		colors[2] = "#072e90";
		colors[3] = "#0f39a1";  
		colors[4] = "#4d3bff"; 
	}	

	if( color == "#57ff45" ){
		colors[0] = "#57ff45"; 
		colors[1] = "#1cb50c"; 
		colors[2] = "#108503";
		colors[3] = "#499241"; 
		colors[4] = "#8ac884"; 
	}

	if( color == "#d545ff" ){
		colors[0] = "#d545ff"; 
		colors[1] = "#9e10c8"; 
		colors[2] = "#6d1188";
		colors[3] = "#571188"; 
		colors[4] = "#633384"; 
	}

	if( color == "#ee0557" ){
		colors[0] = "#ee0557"; 
		colors[1] = "#b4124b"; 
		colors[2] = "#c53165";
		colors[3] = "#e61883"; 
		colors[4] = "#e661a6"; 
	}

	if( color == "#ff9600" ){
		colors[0] = "#ff9600"; 
		colors[1] = "#eda238"; 
		colors[2] = "#f6af15";
		colors[3] = "#ffcf68"; 
		colors[4] = "#cfa03c"; 
	}

	if( color == "#05eeeb" ){
		colors[0] = "#05eeeb"; 
		colors[1] = "#14c3c1"; 
		colors[2] = "#14a4c3";
		colors[3] = "#46d5f4"; 
		colors[4] = "#65b2c2"; 
	}

	return colors; 

}


// zPlayer
// 
Player = function( initPack ){

	var self = {};

	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	self.username = initPack.username; 
	self.pressingMouse = false; 
	self.ability1Active = false;
	self.ability2Active = false;
	self.ability3Active = false; 
	self.ability4Active = false; 
	self.ability1CooldownActive = false; 
	self.ability2CooldownActive = false;
	self.ability3CooldownActive = false; 
	self.ability4CooldownActive = false; 
	self.mass = 250; 
	self.curFrame = 0; 
	self.color = initPack.color; 
	self.allowMove = false; 

	// zupdate
	//
	self.update = function(){

		self.curFrame++; 

		selfX = self.x; 
		selfY = self.y; 

		self.processCooldowns(); 

	}

	self.processCooldowns = function(){


		cooldowns = self.getCooldowns(); 


		// Ability 1
		if( self.ability1Active == true ){
			if( self.ability1CooldownActive == false ){
				self.ability1CooldownDuration = self.curFrame + cooldowns.ability1; 
				self.ability1CooldownActive = true; 
			}
		}
		if( self.ability1CooldownDuration > self.curFrame ){
			self.ability1CooldownSecondsLeft = self.ability1CooldownDuration - self.curFrame;
		}else{
			self.ability1CooldownActive = false; 	
		}


		// Ability 2
		if( self.ability2Active == true ){
			if( self.ability2CooldownActive == false ){
				self.ability2CooldownDuration = self.curFrame + cooldowns.ability2; 
				self.ability2CooldownActive = true; 
			}
		}
		if( self.ability2CooldownDuration > self.curFrame ){
			self.ability2CooldownSecondsLeft = self.ability2CooldownDuration - self.curFrame;
		}else{
			self.ability2CooldownActive = false; 	
		}


		// Ability 3
		if( self.ability3Active == true ){
			if( self.ability3CooldownActive == false ){
				self.ability3CooldownDuration = self.curFrame + cooldowns.ability3; 
				self.ability3CooldownActive = true; 
			}
		}
		if( self.ability3CooldownDuration > self.curFrame ){
			self.ability3CooldownSecondsLeft = self.ability3CooldownDuration - self.curFrame;
		}else{
			self.ability3CooldownActive = false; 	
		}


		// Ability 4
		if( self.ability4Active == true ){
			if( self.ability4CooldownActive == false ){
				self.ability4CooldownDuration = self.curFrame + cooldowns.ability4; 
				self.ability4CooldownActive = true; 
			}
		}
		if( self.ability4CooldownDuration > self.curFrame ){
			self.ability4CooldownSecondsLeft = self.ability4CooldownDuration - self.curFrame;
		}else{
			self.ability4CooldownActive = false; 	
		}


	}


	self.getCooldowns = function(){

		cooldowns = {}; 
		cooldowns.ability1 = 100; 
		cooldowns.ability2 = 200;
		cooldowns.ability3 = 300; 
		cooldowns.ability4 = 800; 

		return cooldowns; 

	}


	//zdraw
	//
	self.draw = function(){	

		var player = Player.list[selfId];

		var x = (( self.x - Player.list[selfId].x ) ) + WIDTH / 2;
		var y = (( self.y - Player.list[selfId].y ) ) + HEIGHT / 2; 

		// Handle draw scaling down to prevent overload 
		// 
		thisMass = self.getRelativeMass( self.mass ); 
		if( thisMass < 20 ){
			thisMass = 15; 
		}


		if( self.allowMove == false ){

			colors = []; 
			colors[0] = "#0558f2"; 
			colors[1] = "#0b2f71"; 
			colors[2] = "#3669c5";
			colors[3] = "#1d5d89"; 
			colors[4] = "#3ca6f1"; 

		}else{

			colors = getColorsFromCode( self.color ); 

		}


		if( thisMass >= 320 ){
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.globalAlpha = 0.1; 
			ctx.fillStyle = colors[4];
			ctx.fill(); 
			ctx.restore();
		}

		if( thisMass >= 190 && thisMass <= 320 ){
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.globalAlpha = 0.4; 
			ctx.fillStyle = colors[4];
			ctx.fill(); 
			ctx.restore();
		}else if( thisMass > 320 ){
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.globalAlpha = 0.4; 
			ctx.fillStyle = colors[4];
			ctx.fill(); 
			ctx.restore();
		}

		if( thisMass >= 106 && thisMass <= 190 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[3];
			ctx.fill(); 
			ctx.restore();
		}else if( thisMass > 190 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , 190 , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[3];
			ctx.globalAlpha = 1; 
			ctx.fill(); 
			ctx.restore();
		}

		if( thisMass > 45  && thisMass < 105 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[2];
			ctx.fill(); 
			ctx.restore();
		}else if( thisMass >= 105){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , 105 , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[2];
			ctx.fill(); 
			ctx.restore();

		}

		if( thisMass > 25 && thisMass < 45 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[1];
			ctx.fill(); 
			ctx.restore();
		}else if( thisMass >= 45 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , 45 , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[1];
			ctx.fill(); 
			ctx.restore();	
		}

		// Draw core 
		//
		if( thisMass < 25 ){
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , thisMass , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[0];
			ctx.fill(); 
			ctx.restore();
		}else{
			ctx.globalAlpha = 1; 
			ctx.beginPath();
			ctx.arc( x , y , 15 , 0 , 2 * Math.PI );
			ctx.fillStyle = colors[0];
			ctx.fill(); 
			ctx.restore();
		}


		self.drawCellSkin( x , y ); 


		drawVars = self.getDrawVars( ); 
		drawVars.userOffset = 5; 

 		ctx.fillStyle = 'white';
		ctx.textAlign="center";
   		ctx.strokeStyle = 'black';
   		ctx.lineWidth = 4;

		ctx.font = drawVars.fontUser; 
    	ctx.strokeText( self.username , x , y + drawVars.userOffset );
    	ctx.fillText( self.username , x , y + drawVars.userOffset );

    	/* 
    	// Show score on cell 
		if( self.id == Player.list[self.id].id ){
			ctx.font = drawVars.fontScore; 
			ctx.strokeText( self.mass , x , y + drawVars.scoreOffset );
			ctx.fillText( self.mass , x , y + drawVars.scoreOffset );
			ctx.restore();
		}
		*/ 

		ctx.restore();


	}


	self.drawCellSkin = function( x , y ){

		if( self.mass > 0 && self.mass <= 40 ){
			ctx.drawImage( Img.face0 , x - 7 , y - 14 ); 
		}else if( self.mass > 40 && self.mass <= 55 ){
			ctx.drawImage( Img.face0 , x - 7 , y - 20 ); 
		}else if( self.mass > 55 && self.mass <= 80 ){
			ctx.drawImage( Img.face0 , x - 7 , y - 24 ); 
		}else if( self.mass > 80 && self.mass <= 120 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 39 ); 
		}else if( self.mass > 120 && self.mass <= 150){
			ctx.drawImage( Img.face1 , x - 19 , y - 46 ); 
		}else if( self.mass > 150 && self.mass <= 190 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 58 );
		}else if( self.mass > 190 && self.mass <= 250 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 64 );
		}else if( self.mass > 250 && self.mass <= 320 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 70 );
		}else if( self.mass > 320 && self.mass <= 400 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 80 );
		}else if( self.mass > 400 && self.mass <= 500 ){
			ctx.drawImage( Img.face1 , x - 19 , y - 90 );
		}else if( self.mass > 500 && self.mass <= 620 ){
			ctx.drawImage( Img.face2 , x - 28 , y - 100 );
		}else if( self.mass > 620 && self.mass <= 740 ){
			ctx.drawImage( Img.face2 , x - 28 , y - 95 );
		}else if( self.mass > 740 && self.mass <= 900 ){
			ctx.drawImage( Img.face2 , x - 28 , y - 105 );
		}else if( self.mass > 900 && self.mass <= 1120 ){
			ctx.drawImage( Img.face2 , x - 28 , y - 110 );
		}else if( self.mass > 1120 ){
			ctx.drawImage( Img.face2 , x - 28 , y - 115 );
		}

	}



	self.getDrawVars = function( drawVars ){

		drawVars = {}; 

		if( self.mass < 20 ){
			drawVars.fontUser ="900 14px Arial ";
			drawVars.fontScore = "900 14px Arial";
			drawVars.userOffset = 0; 
			drawVars.scoreOffset = 22;
		}else if( self.mass < 40 ){
			drawVars.fontUser ="900 15px Arial";
			drawVars.fontScore = "900 15px Arial";
			drawVars.userOffset = -2; 
			drawVars.scoreOffset = 20;
		}else if( self.mass < 60 ){
			drawVars.fontUser ="900 16px Arial";
			drawVars.fontScore = "900 16px Arial";
			drawVars.userOffset = -5; 
			drawVars.scoreOffset = 22;
		}else if( self.mass < 80 ){
			drawVars.fontUser ="900 18px Arial";
			drawVars.fontScore = "900 18px Arial";
			drawVars.userOffset = -10; 
			drawVars.scoreOffset = 25;
		}else if( self.mass < 100 ){
			drawVars.fontUser ="900 20px Arial";
			drawVars.fontScore = "900 20px Arial";
			drawVars.userOffset = -16; 
			drawVars.scoreOffset = 32;
		}else if( self.mass < 120 ){
			drawVars.fontUser ="900 22px Arial";
			drawVars.fontScore = "900 22px Arial";
			drawVars.userOffset = -18; 
			drawVars.scoreOffset = 35;
		}else if( self.mass < 140 ){
			drawVars.fontUser ="900 24px Arial";
			drawVars.fontScore = "900 24px Arial";
			drawVars.userOffset = -21; 
			drawVars.scoreOffset = 39; 
		}else if( self.mass < 160 ){
			drawVars.fontUser ="900 26px Arial";
			drawVars.fontScore = "900 26px Arial";
			drawVars.userOffset = -24; 
			drawVars.scoreOffset = 41;
		}else if( self.mass < 200 ){
			drawVars.fontUser ="900 28px Arial";
			drawVars.fontScore = "900 28px Arial";
			drawVars.userOffset = -24; 
			drawVars.scoreOffset = 44;
		}else if( self.mass < 240 ){
			drawVars.fontUser ="900 34px Arial";
			drawVars.fontScore = "900 34px Arial";
			drawVars.userOffset = -26; 
			drawVars.scoreOffset = 54;
		}else if( self.mass < 280 ){
			drawVars.fontUser ="900 34px Arial";
			drawVars.fontScore = "900 34px Arial";
			drawVars.userOffset = -28; 
			drawVars.scoreOffset = 56;
		}else if( self.mass < 320 ){
			drawVars.fontUser ="900 34px Arial";
			drawVars.fontScore = "900 34px Arial";
			drawVars.userOffset = -31; 
			drawVars.scoreOffset = 56;
		}else if( self.mass < 360 ){
			drawVars.fontUser ="900 36px Arial";
			drawVars.fontScore = "900 36px Arial" ;
			drawVars.userOffset = -33; 
			drawVars.scoreOffset = 58;	
		}else if( self.mass < 440 ){
			drawVars.fontUser ="900 38px Arial";
			drawVars.fontScore = "900 38px Arial";
			drawVars.userOffset = -33; 
			drawVars.scoreOffset = 60; 	
		}else if( self.mass < 540 ){
			drawVars.fontUser ="900 46px Arial";
			drawVars.fontScore = "900 44px Arial";
			drawVars.userOffset = -33; 
			drawVars.scoreOffset = 64;	
		}else if( self.mass < 700 ){
			drawVars.fontUser ="900 52px Arial";
			drawVars.fontScore = "900 44px Arial";
			drawVars.userOffset = -33; 
			drawVars.scoreOffset = 74;	
		}else if( self.mass < 880 ){
			drawVars.fontUser ="900 76px Arial";
			drawVars.fontScore = "900 66px Arial";
			drawVars.userOffset = -44; 
			drawVars.scoreOffset = 85;
		}else if( self.mass < 1080 ){
			drawVars.fontUser ="900 88px Arial";
			drawVars.fontScore = "900 86px Arial";
			drawVars.userOffset = -48; 
			drawVars.scoreOffset = 97;
		}else{
			drawVars.fontUser ="900 100px Arial";
			drawVars.fontScore = "900 90px Arial";
			drawVars.userOffset = -55; 
			drawVars.scoreOffset = 110;
		}

		return drawVars; 

	}



	self.getRelativeMass = function( thisMass ){

		// Mass between 1-100k ( hit max around 10k )
		// Divis = 1-0 

		/* 
		maxMass = 10000;
		minMass = 1;  
		count = 0; 

		for( i = 0; i <= 20; i++){
			var deg = Math.log( i ); 
			thisMass = thisMass * deg;  
			count++; 
		}
		*/ 
		
		if( thisMass > 10000 ){
			thisMass = thisMass * .01;
		}else if( thisMass > 7500 ){
			thisMass = thisMass * .02;
		}else if( thisMass > 6000 ){
		thisMass = thisMass * .04;
		}else if( thisMass > 5000 ){
			thisMass = thisMass * .04;
		}else if( thisMass > 4000 ){
			thisMass = thisMass * .05;
		}else if( thisMass > 2500 ){
			thisMass = thisMass * .06;
		}else if( thisMass > 1800 ){
			thisMass = thisMass * .07;
		}else if( thisMass > 1300 ){
			thisMass = thisMass * .08;
		}else if( thisMass > 850 ){
			thisMass = thisMass * .10;
		}else if( thisMass > 600 ){
			thisMass = thisMass * .12;
		}else if( thisMass > 400 ){
			thisMass = thisMass * .14;
		}else if( thisMass > 300 ){
			thisMass = thisMass * .16;
		}else if( thisMass > 200 ){
			thisMass = thisMass * .18;
		}else if( thisMass > 120 ){
			thisMass = thisMass * .21;
		}else if( thisMass > 100 ){
			thisMass = thisMass * .24;
		}else if( thisMass > 80 ){
			thisMass = thisMass * .27;
		}else if( thisMass > 58 ){
			thisMass = thisMass * .32;
		}else if( thisMass > 45 ){
			thisMass = thisMass * .35;
		}else if( thisMass > 25 ){
			thisMass = thisMass * .40;
		}else if( thisMass > 25 ){
			thisMass = thisMass * .45;
		}else if( thisMass > 15 ){
			thisMass = thisMass * .52;
		}else if( thisMass > 10 ){
			thisMass = thisMass * .6;
		}
		

		thisMass = thisMass; 
		

		return thisMass; 

	}
	

	Player.list[self.id] = self;
	
	
	return self;



}

Player.list = {};

	

// zBullet
// 
Bullet = function( initPack ){

	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	self.mass = initPack.mass; 
	self.type = initPack.type; 
	self.curFrame = 0; 

	// zupdate
	//
	self.update = function(){



	}


	self.draw = function(){	

		var player = Player.list[selfId];
		var x = self.x - Player.list[selfId].x + WIDTH / 2;
		var y = self.y - Player.list[selfId].y + HEIGHT / 2; 

		if( self.type == 'parasite' ){
			cellColor = "#dad706";
			borderColor = "#beac11"; 
		}else if( self.type == 'freeze'){
			cellColor = "#327aff";
			borderColor = "#0b2a64"; 
		}

		ctx.beginPath();
		ctx.fillStyle = borderColor; 
		ctx.arc( x , y , 12 , 0 , 12 * Math.PI );
		ctx.fill();
		ctx.restore();

		ctx.beginPath();
		ctx.fillStyle = cellColor; 
		ctx.arc( x , y , 6 , 0 , 12 * Math.PI );
		ctx.fill();
		ctx.restore();

		self.curFrame++;

	}


	Bullet.list[self.id] = self;
	
	return self;

}


Bullet.list = {}; 




// zCell
// 
Cell = function( initPack ){

	var self = {};
	self.id = initPack.id;
	self.number = initPack.number;
	self.x = initPack.x;
	self.y = initPack.y;
	self.color = initPack.color;
	self.mass = initPack.mass; 
	self.angleIn = "0";


	// zupdate
	//
	self.update = function(){

		self.curFrame++;



	}


	self.draw = function(){	

		var player = Player.list[selfId];
		var x = self.x - Player.list[selfId].x + WIDTH / 2;
		var y = self.y - Player.list[selfId].y + HEIGHT / 2; 

		drawMass = ( self.mass + 3 ); 
		ctx.beginPath();
		ctx.fillStyle = self.color; 
		ctx.arc( x , y , drawMass , 0 , 12 * Math.PI );
		ctx.fill();
		ctx.restore();

	}
	
	Cell.list[self.id] = self;
	
	return self;

}

Cell.list = {};



var selfId = null;
var thisUserName = null; 



checkForRobo = function( username ){

	if( username == '0x1F01' || username == 'k1llaZ3D' || username == 'Tanger341' || username == 'JohnnyBravo' || username == 'TimTukCut' ){
		return 1 
	}
	return 0; 

}


socket.on('death',function(data){

	clearInterval( gameUpdate );

	document.getElementById("gameEndScreen").style.display = "block";

	// Auto respawn testing bots 
	robo = checkForRobo( data ); 
	if( robo ){ window.location = "/?p=r&u=" + data; } 


});


socket.on('res',function(username){
	thisUserName = username;
});

function res(){
	window.location = "/?p=r&u=" + thisUserName;
}



// 
socket.on('init',function(data){

	if(data.selfId)
		selfId = data.selfId;

	for(var i = 0 ; i < data.player.length; i++ ){
		new Player( data.player[i] );
	}

	for(var i = 0 ; i < data.cell.length; i++){
		new Cell( data.cell[i] );
	}

	for( var i = 0 ; i < data.bullet.length; i++ ){
		new Bullet( data.bullet[i] );
	}

});



socket.on('update',function(data){

	for(var i = 0 ; i < data.player.length; i++){

		var pack = data.player[i];

		var p = Player.list[pack.id];

		if(p){

			if( pack.x !== undefined )
				p.x = pack.x;

			if( pack.y !== undefined )
				p.y = pack.y;

			if( pack.mass !== undefined )
				p.mass = pack.mass;

			if( pack.ability1Active !== undefined )
				p.ability1Active = pack.ability1Active;

			if( pack.ability2Active !== undefined )
				p.ability2Active = pack.ability2Active;

			if( pack.ability3Active !== undefined )
				p.ability3Active = pack.ability3Active;

			if( pack.ability4Active !== undefined )
				p.ability4Active = pack.ability4Active;

			if( pack.allowMove !== undefined )
				p.allowMove = pack.allowMove;


		}
	}


	for(var i = 0 ; i < data.cell.length; i++){

		var pack = data.cell[i];
		var e = Cell.list[data.cell[i].id];

		if(e){
			if( pack.id !== undefined )
				e.id = pack.id;

			if( pack.x !== undefined )
				e.x = pack.x;

			if( pack.y !== undefined )
				e.y = pack.y;

			if( pack.mass !== undefined )
				e.mass = pack.mass;
		}

	}



	for( var i = 0 ; i < data.bullet.length; i++ ){

		var pack = data.bullet[i];
		var b = Bullet.list[data.bullet[i].id];


		if( b ){
			if( pack.id !== undefined )
				b.id = pack.id; 
			if( pack.x !== undefined )
				b.x = pack.x;
			if( pack.y !== undefined )
				b.y = pack.y; 
		}

	}


});


socket.on('remove',function(data){

	for(var i = 0 ; i < data.player.length; i++){
		delete Player.list[data.player[i]];
	}

	for(var i = 0 ; i < data.cell.length; i++){
		delete Cell.list[data.cell[i]];
	}

	for(var i = 0 ; i < data.bullet.length; i++){
		delete Bullet.list[data.bullet[i]];
	}
	
});


var gameUpdate; 


startGame = function(){
	if(!selfId)
		return;
	document.getElementById("ctx").style.display = "block";
	gameUpdate = setInterval( update , 20 );
}


	// zUpdate
var lastLoop = new Date;


// zUpdate // MAIN loop 
update = function(){

	var thisLoop = new Date;

	ctx.clearRect( 0 , 0 , 1400 , 1400 );

	drawMap(); 

	drawInOrder();

	updateFrame++; 

	cellBirth(); 

	if( updateFrame % 20 === 0 ){
		updateLeaderboard(); 	
	}

	//if( updateFrame % 4 === 0 ){
		updateMenu(); 
	//}

	var fps = 1000 / ( thisLoop - lastLoop );

	lastLoop = thisLoop;

	fps = Math.round( fps );

}





if( typeof helper == 'undefined' ) {
  var helper = { } ;
}

helper.arr = {
         /**
     * Function to sort multidimensional array
     * 
     * param {array} [arr] Source array
     * param {array} [columns] List of columns to sort
     * param {array} [order_by] List of directions (ASC, DESC)
     * returns {array}
     */
    multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
            columns = []
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof order_by == 'undefined') {
            order_by = []
            for(x=0;x<arr[0].length;x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a,b,columns,order_by,index) {  
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();


            if(x < y) {
                    return direction == 0 ? -1 : 1;
            }

            if(x == y)  {
                return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisort_recursive(a,b,columns,order_by,0);
        });
    }
}


ability1YLeft = 0; 

updateMenu = function(){

	player = Player.list[selfId];

	ctxMenu.globalAlpha = 1;
	ctxMenu.clearRect( 0 , 0 , 500 , 500 ); 
	ctxMenu.drawImage( Img.abilities , 15 , 10 ); 

	if( player.ability1CooldownActive ){
		ability1YLeft = Math.floor(( player.ability1CooldownSecondsLeft / 114 ) * 100); 
	}else{
		ability1YLeft = 0; 
	}

	ctxMenu.fillStyle = "#000"
 	ctxMenu.globalAlpha = 0.5;
 	ctxMenu.beginPath();
	ctxMenu.rect( 18 , 13 , 88 , ability1YLeft );
	ctxMenu.fill();  
	ctxMenu.restore();



	if( player.ability2CooldownActive ){
		ability2YLeft = Math.floor(( player.ability2CooldownSecondsLeft / 228 ) * 100); 
	}else{
		ability2YLeft = 0; 
	}
	ctxMenu.fillStyle = "#000"
 	ctxMenu.globalAlpha = 0.5;
 	ctxMenu.beginPath();
	ctxMenu.rect( 122 , 13 , 87 , ability2YLeft );
	ctxMenu.fill();  
	ctxMenu.restore();



	if( player.ability3CooldownActive ){
		ability3YLeft = Math.floor(( player.ability3CooldownSecondsLeft / 328 ) * 100); 
	}else{
		ability3YLeft = 0; 
	}
	ctxMenu.fillStyle = "#000"
 	ctxMenu.globalAlpha = 0.5;
 	ctxMenu.beginPath();
	ctxMenu.rect( 227 , 13 , 87 , ability3YLeft );
	ctxMenu.fill();  
	ctxMenu.restore();


	if( player.ability4CooldownActive ){
		ability4YLeft = Math.floor(( player.ability4CooldownSecondsLeft / 828 ) * 100); 
	}else{
		ability4YLeft = 0; 
	}
	ctxMenu.fillStyle = "#000"
 	ctxMenu.globalAlpha = 0.5;
 	ctxMenu.beginPath();
	ctxMenu.rect( 331 , 13 , 87 , ability4YLeft );
	ctxMenu.fill();  
	ctxMenu.restore();



	ctxScore.clearRect( 0 , 0 , 500 , 500 ); 

	ctxScore.font="600 25px Arial";
	ctxScore.fillStyle = "#FFF"
	ctxScore.strokeStyle = 'black';
	ctxScore.lineWidth = 3	;
    ctxScore.strokeText( "Score : " + player.mass , 10 , 25 );
    	ctxScore.fillText( "Score : " + player.mass , 10 , 25 );


	

}



updateLeaderboard = function(){

	ctxLeader.clearRect( 0 , 0 , 300 , 400 );
	ctxLeader.font="600 20px Arial";
	ctxLeader.fillStyle = "#fff"
	ctxLeader.fillText( "Leaderboard" , 21 , 28 );

	leaderBot = 0; 
	leaderArray = [];
	for( var i in Player.list ){
		leaderArray.push( Player.list[i] );
	}
	
	// sort this list by points, if points is equal, sort by name.
	var ranking = helper.arr.multisort( leaderArray, ['mass', 'username'], ['DESC','ASC']);

	rank = 1; 
	for( var i in ranking ){
		if( rank <= 8 ){
			displayMass = ranking[i].mass.toLocaleString(); 
			ctxLeader.font="600 14px Arial";
			ctxLeader.fillStyle = "#fff"
			ctxLeader.fillText( rank + ". " + ranking[i].username + " " , 12 , 65 + leaderBot );
			ctxLeader.textAlign="right";
			ctxLeader.fillText( displayMass , 180 , 65 + leaderBot );
			ctxLeader.textAlign="left";
			ctxLeader.restore();
			leaderBot = leaderBot + 20; 
			rank++; 
		}
	}
	
}


cellBirth = function(){ 
	if( updateFrame % 1 === 0 ){
		socket.emit( "newCell" );  
	} 
}


drawInOrder = function(){


	for( var i in Cell.list ){
		Cell.list[i].draw();
	}

	for( var i in Player.list ){
		Player.list[i].update();
		Player.list[i].draw();
	}

	for( var i in Bullet.list ){
		Bullet.list[i].draw();
	}



	/* 
	var arr = [];

	for(var i in Player.list){
		arr.push( [ Player.list[i].y , i , 1 , 0 , 0 ] );
		Player.list[i].update();
	}

	for(var i in Cell.list){
		arr.push( [ Cell.list[i].y , i , 0 , 1 , 0 ] );
	}

	for(var i in Bullet.list){
		arr.push( [ Bullet.list[i].y , i , 0 , 0 , 1 ] );
	}


    arr.sort(function(a,b) {
        return a[0] - b[0];
    });

	for( var i in arr ){

		thisId = arr[i][1];
	 

		//if( arr[i][4] == 1 ){ // draw enemy 

		//}

		//if( arr[i][2] == 1 ){ // draw player



		//}

		//if( arr[i][3] == 1 ){ // draw enemy 

		//}

	 
	
	}
	*/

}



var drawMap = function(){

	var player = Player.list[selfId];

	if (typeof player.x != "undefined") {

		var offset_x = WIDTH / 2 - player.x;
		var offset_y = HEIGHT / 2 - player.y;

		/* 
		if( player.scale == 64 ){
			clip_x = 4800; 
			clip_y = 4800; 
		}else if( player.scale == 16 ){
			clip_x = 2400; 
			clip_y = 2400; 
		}else if( player.scale == 4 ){
			clip_x = 1200; 
			clip_y = 1200; 
		}else{
			clip_x = 600; 
			clip_y = 600; 
		}
		*/ 


		var width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		var height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;


		clip_x = 4800;
		clip_y = 4800; 

        var fill_x = width; // could be canvas.width
        var fill_y = height; // could be canvas.height
		var pattern = ctx.createPattern( Img.map['grid'] , 'repeat' );
		ctx.save();
		ctx.fillStyle = pattern;
		ctx.translate(offset_x, offset_y);
		ctx.fillRect(-offset_x, -offset_y, fill_x, fill_y);
		ctx.restore();
		
		


	}

}


window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
};

document.onkeydown = function(event){

	if(event.keyCode === 49)	//1
	socket.emit('keyPress',{inputId:'one',state:true});

	if(event.keyCode === 50)	//2
	socket.emit('keyPress',{inputId:'two',state:true});

	if(event.keyCode === 51)	//3
	socket.emit('keyPress',{inputId:'three',state:true});

	if(event.keyCode === 52)	//4
	socket.emit('keyPress',{inputId:'four',state:true});
			
}

document.onkeyup = function(event){

	if(event.keyCode === 49)	//1
	socket.emit('keyPress',{inputId:'one',state:false});

	if(event.keyCode === 50)	//2
	socket.emit('keyPress',{inputId:'two',state:false});

	if(event.keyCode === 51)	//3
	socket.emit('keyPress',{inputId:'three',state:false});

	if(event.keyCode === 52)	//4
	socket.emit('keyPress',{inputId:'four',state:false});

}

document.onmousedown = function(event){

	if ( event.which === 1 ) {
       	socket.emit('keyDown',{inputId:'x',state:Player.list[selfId].x});
       	socket.emit('keyDown',{inputId:'y',state:Player.list[selfId].y});
    }

}


document.onmouseup = function(event){

    socket.emit('keyPress',{inputId:'mousePress',state:false});

}


document.onmousemove = function(event){

	clientX = event.clientX; 

	clientY = event.clientY; 


	var width = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var height = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;


	var x = - ( width / 2 ) + clientX;
	var y = - ( height / 2 ) + clientY;

	absX = Math.abs( x  );
	absY = Math.abs( y  );

	if( absX < 10 && absY < 10 ){
		distMod = 10;
	}else if( absX < 25 && absY < 25 ){
		distMod = 9;
	}else if( absX < 45 && absY < 45 ){
		distMod = 8; 
	}else if( absX < 80 && absY < 80 ){
		distMod = 7; 
	}else if( absX < 110 && absY < 110 ){
		distMod = 6; 
	}else if( absX < 145 && absY < 145 ){
		distMod = 5;
	}else if( absX < 195 && absY < 195 ){
		distMod = 4;
	}else if( absX < 240 && absY < 240 ){
		distMod = 3; 
	}else if( absX < 280 && absY < 280 ){
		distMod = 2; 
	}else if( absX < 330 && absY < 330 ){
		distMod = 1; 
	}else{
		distMod = 0; 
	}



	var angle = Math.atan2( y , x ) / Math.PI * 180;
	socket.emit( 'keyPress' , { inputId:'mouseAngle', state:angle } );
	socket.emit( 'keyPress' , { inputId:'mouseDist', state:distMod } );

	/* 
	socket.emit( 'keyDown' , { inputId:'mX', state:x } );
	socket.emit( 'keyDown' , { inputId:'mY', state:y } );
	*/ 

}


document.oncontextmenu = function(event){

	event.preventDefault();

}


updateIntroMenu = function(){

	starOneY = starOneY - 2; 
	starTwoY = starTwoY - 2; 

	ctxIntro.canvas.width  = window.innerWidth;
 	ctxIntro.canvas.height = window.innerHeight;

	ctxIntro.clearRect(0, 0, WIDTH, HEIGHT);
  	ctxIntro.drawImage( Img.starFall , 0 , starOneY );
  	ctxIntro.drawImage( Img.starFall2 , 0 , starTwoY );

  	if( starOneY < -2000 ){
    	starOneY = 1200; 
  	}

  	if( starTwoY < -2000 ){
   	    starTwoY = 1200;
  	}
  	
}



initiateGame = function(){

	document.body.style.backgroundSize = "auto";
	document.body.style.backgroundRepeat = "repeat";
	document.getElementById("glogo").style.display = 'none';
	document.getElementById("sign_div").style.display = 'none';
	document.getElementById("ctx-intro").style.display = "none";
	document.getElementById("ctx-leader").style.display = "block";
	document.getElementById("ctx-leader").style.backgroundColor = 'rgba( 0, 0, 0, 0.4 )';
	document.getElementById("ctx-menu").style.display = "block";
	document.getElementById("ctx-menu").style.backgroundColor = 'rgba(0,0,0,0.3)';

	document.getElementById("ctx-score").style.display = "block";
	document.getElementById("ctx-score").style.backgroundColor = 'rgba(0,0,0,0.3)';

	startGame();
}


var gameActive = false; 


renderMenu = function( fps ){

	player = player.list[selfId];

}


var defUser = [];
defUser[0] = "Bobby";
defUser[1] = "Timmy"; 	
defUser[2] = "Xavier";
defUser[3] = "Hugh";
defUser[4] = "Alexa";
defUser[5] = "Zapper";
defUser[6] = "Tiffy"; 
defUser[7] = "Fuzz"
defUser[8] = "Hubert";

randNum = Math.random() * 9; 
var rid = parseInt( randNum ); 
thisName = defUser[rid];

document.getElementById("signDiv-username").value = thisName;

var menuRun = setInterval( function( ){

  updateIntroMenu();  

},20);


