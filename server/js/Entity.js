
var initPack = { player:[] , cell:[] };
var removePack = { player:[] , cell:[] };
var cellCount = 0; 

//zEntity
// 
Entity = function(param){

	var self = {
		x:1000,
		y:1000,
		spdX:0,
		spdY:0,
	}

	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;
	self.id = Math.random * 10000000;

	if(param){
		if(param.x)
			self.x = param.x;
		if(param.y)
			self.y = param.y;
		if(param.id)
			self.id = param.id;		
	}


	self.update = function(){
		self.updatePosition();
	}


	self.updatePosition = function(){
		self.x += self.spdX;
		self.y += self.spdY;
	}


	self.getDistance = function( pt ){

		return Math.sqrt(Math.pow( self.x - pt.x , 2 ) + Math.pow( self.y - pt.y , 2 ));

	}

	return self;

}



Entity.getFrameUpdateData = function(){

	var pack = {

		initPack:{
			player:initPack.player,	
			cell:initPack.cell,
			bullet:initPack.bullet,
		},

		removePack:{
			player:removePack.player,
			cell:removePack.cell,
			bullet:removePack.bullet,
		},

		updatePack:{
			player:Player.update(),	
			cell:Cell.update(),
			bullet:Bullet.update(), 
		}

	};

	initPack.player = [];
	removePack.player = [];
	initPack.cell = []; 
	removePack.cell = [];
	initPack.bullet = []; 
	removePack.bullet = [];

	return pack;

}


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




checkForRobo = function( username ){

	if( username == '0x1F01' || username == 'k1llaZ3D' || username == 'Tanger341' || username == 'JohnnyBravo' || username == 'TimTukCut' ){
		return 1 
	}
	return 0; 

}



//zCell
//
Cell = function( param ){

	var self = Entity(param);

	self.id = "" + Math.floor( 100000 * Math.random() );
	self.curFrame = 0; 
	self.mass = param.mass; 
	self.x = param.x; 
	self.y = param.y; 
	self.color = param.color;  
	self.toRemove = false;
	self.setToRemove = false;
	self.startSetActive = false; 
	self.angleInX = 0;
	self.angleInY = 0;  

	var super_update = self.update;


	self.update = function(){

		if( self.setToRemove && self.startSetActive == false ){
			self.startSet = self.curFrame + 4;
			self.startSetActive = true; 
		}

		if( self.startSetActive ){
			self.x = self.x + self.angleInX; 
			self.y = self.y + self.angleInY; 
		}



		if( self.curFrame > self.startSet ){
			self.toRemove = true; 
		}

		if( self.toRemove ){
			delete Cell.list[self.id];
			removePack.cell.push(self.id);
			self.toRemove = false; 
			cellCount--; 
		} else {
			//pack.push( cell.getUpdatePack() );		
		}

		self.curFrame++; 

		//console.log( self.curFrame );

	}


	self.onDeath = function(){

		self.mass = 0; 

	}


	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			mass:self.mass,	 
			color:self.color,
		};
	}


	self.getUpdatePack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,
		}	
	}

	Cell.list[self.id] = self;
	
	initPack.cell.push( self.getInitPack() );
	return self;
}

Cell.list = {};


Cell.update = function(){

	var pack = [];

	for(var i in Cell.list){
		var cell = Cell.list[i];
		cell.update();
		pack.push(cell.getUpdatePack());
	}

	return pack;

}


Cell.removeCell = function(){

	removePack.cell.push(socket.id);

}

Cell.getAllInitPack = function(){

	var cells = [];

	for(var i in Cell.list)
		cells.push( Cell.list[i].getInitPack() );
	return cells;

}




//zBullet 
//
Bullet = function( param ){

	var self = Entity( param ); 

	self.id = Math.random() * 100000000;
	self.fid = param.fid; 
	self.x = param.x;
	self.y = param.y; 
	self.mass = param.mass; 
	self.mouseAngle = param.mouseAngle; 
	self.type = param.type; 
	self.spdX = param.spdX; 
	self.spdY = param.spdY; 
	self.curFrame = 0; 
	self.toRemove = false; 
	self.distance = param.distance; 
	self.activated = false; 

	var super_update = self.update; 

	self.update = function(){

		super_update();

		self.curFrame++; 

		if( self.curFrame > self.removeFrame ){
			delete Bullet.list[self.id];
			removePack.bullet.push(self.id);
		}
 
		if( self.distance > 400 ){
			self.toRemove = true; 
		}

		if( self.toRemove == true ){
			self.spdX = 0; 
			self.spdY = 0; 
			self.maxSpd = 0; 
			self.removeFrame = self.curFrame + 15; 
			self.setToFinish = true; 
			self.toRemove = false; 
		}


	}


	self.getInitPack = function(){

		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			mass:self.mass, 
			type:self.type,
		};

	}


	self.getUpdatePack = function(){

		return {
			id:self.id,
			x:self.x,
			y:self.y,
		}	

	}

	Bullet.list[self.id] = self;
	
	initPack.bullet.push( self.getInitPack() );


	return self;

}

Bullet.list = {}; 



Bullet.update = function(){

	var pack = [];

	for(var i in Bullet.list){
		var bullet = Bullet.list[i];
		bullet.update();
		pack.push(bullet.getUpdatePack());
	}

	return pack;

}



Bullet.getAllInitPack = function(){

	var bullets = [];

	for(var i in Bullet.list)
		bullets.push( Bullet.list[i].getInitPack() );
	return bullets;

}




//zPlayer
//
Player = function( param ){

	var self = Entity(param);

	self.number = "" + Math.floor( 10 * Math.random() );
	self.username = param.username;


	self.pressing1 = false;
	self.pressing2 = false; 
	self.pressing3 = false; 
	self.pressing4 = false; 

	self.ability1Active = false;
	self.ability2Active = false; 
	self.ability3Active = false; 
	self.ability4Active = false; 

	self.allowMove = true; 

	self.ability1Cooldown = 0; 
	self.ability2Cooldown = 0; 
	self.ability3Cooldown = 0;
	self.ability4Cooldown = 0; 

	self.sprintActive = false; 
	self.pressingMouse = false;
	self.curFrame = 0; 
	self.mouseDist = 0; 

	self.color = param.color; 
	self.socket = param.socket;

	self.mouseAngle = 0;
	self.maxSpd = 10;
	self.mass = 250; 
	self.sprintActiveEnd = 0; 
	self.sprintCooldown = 0; 
	self.direction = 1;
	self.parasiteCooldown = 0;
	self.parasiteActive = false; 
	self.parasitePlusActive = false;  
	self.colorCode = Math.floor( 5 * Math.random() );
	self.mouseX = 0; 
	self.mouseY = 0; 
	self.distance = 0; 
	self.parasiteDeduct = 0; 
	self.parasitePlusAmount = 0; 
	self.initFreeze = false; 

	var super_update = self.update;


	// zUpdate
	//
	self.update = function(){

		self.mouseX = self.x + self.mX; 
		self.mouseY = self.y + self.mY; 

		var a = self.mouseX - self.x;
		var b = self.mouseY - self.y;
		self.distance = Math.sqrt( a*a + b*b );

		self.curFrame++;

		self.relativeMass = self.getRelativeMass( self.mass ); 

		self.updateSpd(); // update the spd base on frame data 

		self.checkForCollision(); // Check for collision between cell, player, or bullet  

		super_update();

		if( self.pressing1 || self.pressing2 || self.pressing3 || self.pressing4 )
			self.initAbilities(); 
		
		if( self.ability1Active )
			self.ability1();

		if( self.ability2Active )
			self.ability2(); 

		if( self.ability3Active )
			self.ability3(); 

		if( self.ability4Active )
			self.ability4();  

		if( self.setDeath )
			self.onDeath();
		
		if( self.toRemove )
			self.setRemove(); 

		if( self.initFreeze )
			self.allowFreeze(); 

		if( self.allowMove == false )
			self.unFreezeCheck(); 

		//if( self.startParasite )
		//	self.initParasite(); 


		if( self.parasiteActive )
			self.parasite();

		if( self.parasitePlusActive )
			self.parasitePlus(); 

		/* 
		//if( self.pressing2 && self.sprintCooldown < self.curFrame )
		//	self.initSprint();
		*/ 


	}



	self.allowFreeze = function(){ 

		self.allowMove = false; 
		self.initFreeze = false; 
		self.freezeDuration = self.curFrame + 50; 

	}


	self.unFreezeCheck = function(){

		if( self.curFrame > self.freezeDuration ){
			self.allowMove = true; 
		}

	}


	self.ability1 = function(){

		if( self.ability1Duration > self.curFrame ){

		}else{
			self.ability1Active = false; 
		}

	}

	self.ability2 = function(){

		if( self.ability2Duration > self.curFrame ){
			self.maxSpd = 30; 
		}else{
			self.ability2Active = false;
			self.maxSpd = 10;  
		}

	}


	self.ability3 = function(){

		if( self.ability3Duration > self.curFrame ){

		}else{
			self.ability3Active = false; 
		}

	}


	self.ability4 = function(){

		if( self.ability4Duration > self.curFrame ){

		}else{
			self.ability4Active = false; 
			self.mass = self.origMass; 
		}

	}


	self.setRemove = function(){

		self.mass = 0; 
		self.setDeath = true;
		self.socket.emit("death", self.username ); 	

	}


	self.parasite = function(){

		/* 
		if( self.parasiteDuration > self.curFrame ){
			if( self.mass > 1 ){
				self.mass = self.mass - 1; 
			}
		}else{
			self.parasiteActive = false; 
		}
		*/ 


		if( self.parasiteActive ){
			console.log("PARA MINUS");
			self.mass = self.mass - self.parasiteDeduct; 
			self.parasiteActive = false; 
			self.startParasite = false; 
		}


	}


	self.parasitePlus = function(){

		console.log("PARA PLUS");
		self.mass = self.mass + self.parasitePlusAmount; 
		self.parasitePlusActive = false; 
		
	}


	self.newBullet = function( bulletType ){

		startX = self.x; 
		startY = self.y; 

		spd = getSpdFromAngle( self.mouseAngle ); 
		spd.x = ( spd.x + ( self.spdX / 2 ) ) * 2.5; 
		spd.y = ( spd.y + ( self.spdY / 2 ) ) * 2.5; 

		Bullet({
			angle:self.mouseAngle,
			fid:self.id, 
			mass:5, 
			type:bulletType,
			x:startX,
			y:startY,   
			spdX:spd.x, 
			spdY:spd.y, 
			distance:self.distance, 
		}); 


	}



	self.initAbilities = function(){

		//console.log( self.pressing1 + " " + self.pressing2 + " " + self.pressing3 + " " + self.pressing4 );

		if( self.pressing1 ){
			self.initAbility1(); 
		}

		if( self.pressing2 ){
			self.initAbility2(); 
		}

		if( self.pressing3 ){
			self.initAbility3(); 
		}

		if( self.pressing4 ){
			self.initAbility4(); 
		}

	}



	self.freeze = function(){

		if( self.freezeCooldown > self.curFrame ){
			console.log( " FREEZE COOL ");
		}

	}

	self.ulti = function(){

	}



	self.initUlti = function(){


	}



	self.initBullet = function(){

		//console.log( "x: " + self.x + " :y: " + self.y );

		if( self.curFrame > self.parasiteCooldown ){

			self.lastParasite = self.curFrame + 10;
			self.parasiteCooldown = self.curFrame + 5;  
			self.allowNewBullet = true;
			self.newBulletFlag = true; 

		}

	}


	self.initAbility1 = function(){

		if( self.ability1Active == false && self.curFrame > self.ability1Cooldown ){
			self.ability1Active = true;
			self.ability1Duration = self.curFrame + 50;  
			self.ability1Cooldown = self.curFrame + 100; 
			self.newBullet( 'parasite' ); 
		}

	}



	self.initAbility2 = function(){

		if( self.ability2Active == false && self.curFrame > self.ability2Cooldown ){
			self.ability2Active = true;
			self.ability2Duration = self.curFrame + 50;  
			self.ability2Cooldown = self.curFrame + 200; 
		}

	}


	self.initAbility3 = function(){

		if( self.ability3Active == false ){
			self.ability3Active = true;
			self.ability3Duration = self.curFrame + 150;  
			self.ability3Cooldown = self.curFrame + 300; 

			self.newBullet( 'freeze' ); 

		}

	}


	self.initAbility4 = function(){

		if( self.ability4Active == false && self.curFrame > self.ability4Cooldown ){
			self.ability4Active = true;
			self.ability4Duration = self.curFrame + 150;  
			self.ability4Cooldown = self.curFrame + 800;
			self.origMass = self.mass;  
			self.mass = self.mass * 3; 
		}

	}



	/* 
	self.initParasitePlus = function(){

		if( self.parasitePlusActive == false ){
			//self.parasitePlusDuration = self.curFrame + 20; 
			self.parasitePlusActive = true; 
			self.startParasitePlus = false;
		}

	}
	*/ 


	self.checkForCollision = function(){


		// Check for cell based collision
		//
		for(var i in Cell.list){
			distance = getDistance( Cell.list[i].x , Cell.list[i].y , self.x , self.y );
			clipRange = ( self.relativeMass ) + 12; 

			if( distance <  clipRange && Cell.list[i].setToRemove == false ){

				slope_y = ( Cell.list[i].y - self.y ); 
				slope_x = ( Cell.list[i].x - self.x );

				if( slope_y > 0 && slope_x < 0 ){
					Cell.list[i].angleInX = 1; 
					Cell.list[i].angleInY = -1; 
				}else if( slope_y > 0 && slope_x > 0 ){
					Cell.list[i].angleInX = -1;
					Cell.list[i].angleInY = -1;
				}else if( slope_y < 0 && slope_x > 0 ){
					Cell.list[i].angleInX = -1; 
					Cell.list[i].angleInY = 1; 
				}else if( slope_y < 0 && slope_x < 0  ){
					Cell.list[i].angleInY = 1; 
					Cell.list[i].angleInX = 1; 
				}

				Cell.list[i].cellAngle = 10; 
				Cell.list[i].setToRemove = true; 
				self.mass = self.mass + Cell.list[i].mass; 
			}
		}


		// Check for player collision
		//Act
		for(var i in Player.list){

			if( Player.list[i].id !== self.id ){ 

				distance = getDistance( Player.list[i].x , Player.list[i].y , self.x , self.y );

				if( distance < ( self.relativeMass + 20 ) ){

					if( Player.list[i].mass > ( self.mass + 20 ) ){
						self.toRemove = true; 
						Player.list[i].mass = Player.list[i].mass + self.mass; 
					}
					if( self.mass > ( Player.list[i].mass + 20 ) ){
						Player.list[i].toRemove = true; 
						self.mass = self.mass + Player.list[i].mass; 
					}
				}
			

				//Check for bullet collision
				//
				for( var z in Bullet.list ){

					if( Bullet.list[z].fid != Player.list[i].id && Bullet.list[z].activated == false ){

						distance = getDistance( Bullet.list[z].x , Bullet.list[z].y , Player.list[i].x , Player.list[i].y );

						if( Bullet.list[z].type == 'parasite'){

							amount = 0; 
							if( distance < 12 ){
								amount = .8; 
								console.log( "10X ");
							}else if( distance < 20 && Player.list[i].relativeMass > 30 ){
								amount = .4; 
								console.log( "5X ");
							}else if( distance < 30 && Player.list[i].relativeMass > 40 ){
								amount = .3; 
								console.log( "4X ");
							}else if( distance < 50 && Player.list[i].relativeMass > 50 ){
								amount = .2;
								console.log( "3X "); 
							}else if( distance < 50 && Player.list[i].relativeMass > 50 ){
								amount = .15; 
								console.log( "2X ");
							}else if( distance < 70 && Player.list[i].relativeMass > 63 ){
								amount = .1; 
								console.log( "1X ");
							}else if( distance < 100 && Player.list[i].relativeMass > 90 ){
								amount = .06; 
								console.log( ".05X ");
							}else if( distance < 140 && Player.list[i].relativeMass > 130 ){
								amount = .04; 
								console.log( ".05X ");
							}else if( distance < 180 && Player.list[i].relativeMass > 157 ){
								amount = .02; 
								console.log( ".05X ");
							}else if( distance < 230 && Player.list[i].relativeMass > 206 ){
								amount = .01; 
								console.log( ".05X ");
							}

							deduct = Math.floor( amount * Player.list[i].mass );
							plus  = Math.floor(( amount * Player.list[i].mass ) * .5);

							if( deduct > 0 ){
							
								Bullet.list[z].toRemove = true;
								Bullet.list[z].activated = true;

								Player.list[i].parasiteDeduct = deduct; 
								Player.list[i].startParasite = true;

								self.parasitePlusActive = true;
								self.parasitePlusAmount = plus; 
							}
						}



						if( Bullet.list[z].type == 'freeze'){
							if( distance < Player.list[i].relativeMass + 30 ){
						 		Player.list[i].initFreeze = true; 
						 	}
						}



					}

				}



			}

		}




	}


	self.onDeath = function(){
		self.mass = 0; 
		delete Player.list[self.id];
		removePack.player.push(self.id);
		self.toRemove = false; 
		self.setDeath = false; 

	}


	self.freezeEffect = function(){

		console.log( " FREEZE HIT ");

	}








	self.updateBot = function(){

		// Bot testing 
		// 
		allowBotMove = checkForRobo( self.username ); 

		if( allowBotMove ){
			if( self.curFrame % 40 == 0 ){
				var pick = Math.random();
				if( pick > .5 ){
					num = 1; 
				}else{
					num = -1 

				}

				angle = Math.random() * 180 * num;
				self.mouseAngle = angle; 

				/* 
				if( pick > .8 ){
					self.pressing1 = true; 
				}
				if( pick < .8 ){
					self.pressing1 = false; 
				}
				*/ 

				direction = Math.floor( Math.random * 32 ); 
				if( pick > .65 ){
					//self.pressingMouse = true; 
					self.direction = direction;
				}


			}
		}
	}



	self.updateSpd = function(){

		self.updateBot(); 

		self.getSpdMod(); 

		spd = getSpdFromAngle( self.mouseAngle );

		//console.log( self.mouseDist );

		if( self.mouseDist == 10 ){
			distMod = 0; 
		}else if( self.mouseDist == 9 ){
			distMod = 0.2; 
		}else if( self.mouseDist == 8 ){
			distMod = 0.4; 
		}else if( self.mouseDist == 7 ){
			distMod = 0.5; 
		}else if( self.mouseDist == 6 ){
			distMod = 0.7; 
		}else if( self.mouseDist == 5 ){
			distMod = .9; 
		}else if( self.mouseDist == 4 ){
			distMod = 1.1; 
		}else if( self.mouseDist == 3 ){
			distMod = 1.3; 
		}else if( self.mouseDist == 2 ){
			distMod = 1.5; 
		}else if( self.mouseDist == 1 ){
			distMod = 1.7; 
		}else{
			distMod = 2; 
		}

		if( self.ability2Active ){
			sprintMod = 3; 
		}else{
			sprintMod = 1; 
		}

		self.spdX = spd.x * self.speedMod * distMod * sprintMod; 
		self.spdY = spd.y * self.speedMod * distMod * sprintMod;

		self.direction = spd.direction; 

		if( self.allowMove == false ){
			self.spdX = 0; 
			self.spdY = 0; 
		}

		self.setMapLimits(); 

	}


	self.getSpdMod = function(){

		self.speedMod = 1; 

		if( self.mass > 3000 ){
			self.speedMod = .2; 
		}else if( self.mass > 2000 ){
			self.speedMod = .3; 
		}else if( self.mass > 1300 ){
			self.speedMod = .4; 
		}else if( self.mass > 800 ){
			self.speedMod = .5; 
		}else if( self.mass > 500 ){
			self.speedMod = .6; 
		}else if( self.mass > 300 ){
			self.speedMod = .65; 
		}else if( self.mass > 130 ){
			self.speedMod = .7; 
		}else if( self.mass > 80 ){
			self.speedMod = .75; 
		}else if( self.mass > 40 ){
			self.speedMod = .8; 
		}else if( self.mass > 20 ){
			self.speedMod = .9; 
		}else{
			self.speedMod = 1; 
		}

	}


	self.setMapLimits = function(){

		if( self.x >= 4862 ){
			self.spdX = 0;
			self.maxSpd = 0; 
			self.x = 4861; 
		}

		if( self.x <= 41 ){
			self.spdX = 0; 
			self.maxSpd = 0;
			self.x = 42; 
		}

		if( self.y <= 41 ){
			self.spdY = 0; 
			self.maxSpd = 0; 
			self.y = 42; 
		}

		if( self.y >= 4862){
			self.spdY = 0; 
			self.maxSpd = 0; 
			self.y = 4861; 
		}	

	}


	self.getRelativeMass = function( thisMass ){

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

		return thisMass; 

	}


	self.getInitPack = function(){

		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			username:self.username, 
			mass:self.mass, 
			color:self.color, 
		};

	}


	self.getUpdatePack = function(){

		return {
			id:self.id,
			x:self.x,
			y:self.y,
			curFrame:self.curFrame,
			ability1Active:self.ability1Active, 
			ability2Active:self.ability2Active,
			ability3Active:self.ability3Active,
			ability4Active:self.ability4Active,  
			mass:self.mass, 
			allowMove:self.allowMove, 
		}	

	}


	Player.list[self.id] = self;
	
	initPack.player.push( self.getInitPack() );
	return self;

}


function getSpawnCoords( ){

	coords = Math.random() * 1500;

	return coords; 
}


Player.list = {};


Player.onConnect = function( socket , username , color ){

	var className = ''; 

	spawnCoords = {};
	spawnCoords.x = getSpawnCoords( ); 
	spawnCoords.y = getSpawnCoords( ); 

	var player = Player({
		username:username,
		color:color, 
		id:socket.id,
		className:className, 
		socket:socket,
		x:spawnCoords.x,
		y:spawnCoords.y, 
	});

	socket.emit( 'res' , username );


	socket.on('keyDown',function(data){

		if( data.inputId == 'x'){
			player.x = data.state; 
		}

		if( data.inputId == 'y'){
			player.y = data.state; 
		}

		if( data.inputId == 'mX'){
			player.mX = data.state; 
		}

		if( data.inputId == 'mY'){
			player.mY = data.state; 
		}


	});


	socket.on('keyPress',function(data){

		if(data.inputId === 'one'){
			player.pressing1 = data.state;
		}
		if(data.inputId === 'two'){
			player.pressing2 = data.state;
		}
		if(data.inputId === 'three'){
			player.pressing3 = data.state;
		}
		if(data.inputId === 'four'){
			player.pressing4 = data.state;
		}
		if(data.inputId === 'mouseAngle'){
			player.mouseAngle = data.state;
		}
		if(data.inputId === 'mouseDist'){
			player.mouseDist = data.state;
		}
		

	});
	
	socket.emit('init',{

		selfId:socket.id,
		player:Player.getAllInitPack(),
		cell:Cell.getAllInitPack(),
		bullet:Bullet.getAllInitPack(),

	});

	socket.on('newCell', function( value ){
	
		if( cellCount < 800 ){  

			cellSize = Math.random() * 100;

			if( cellSize > 99 ){
				cellMass = 12; 
			}else if( cellSize > 98 ){
				cellMass = 9;
			}else if( cellSize > 97 ){
				cellMass = 8;
			}else if( cellSize > 96 ){
				cellMass = 7;
			}else if( cellSize > 95){	
				cellMass = 6; 
			}else if( cellSize > 94 ){
				cellMass = 5; 
			} else if ( cellSize > 93 ){
				cellMass = 4; 
			}else if( cellSize > 82 ){
				cellMass = 3; 
			} else if ( cellSize > 47 ){
				cellMass = 2; 
			} else { 
				cellMass = 1;   
			}

			thisCell = getCellCoords(); 

			var cellColor = getCellColor();

			Cell({
				mass:cellMass,  
				x:thisCell.x,
				y:thisCell.y,
				color:cellColor,
			});

			cellCount++; 

		}

	});
	
}


function getCellCoords(){ 

	// Randomly get location 
	//
	thisCell = {}; 
	thisCell.top =  ( Math.random() * 16 ) + 2 ; 
	thisCell.left =  ( Math.random() * 16 ) + 2 ;

	thisCell.x = thisCell.top * 275;
	thisCell.y = thisCell.left * 275; 
	var cellCollision = false; 

	return thisCell; 

}


Player.getAllInitPack = function(){

	var players = [];

	for(var i in Player.list)
		players.push( Player.list[i].getInitPack() );
	return players;

}


Player.onDisconnect = function(socket){

	delete Player.list[socket.id];
	removePack.player.push(socket.id);

}


Player.update = function(){

	var pack = [];

	for(var i in Player.list){
		var player = Player.list[i];
		player.update();
		pack.push(player.getUpdatePack());
		player.newBulletFlag = false; 
	}

	return pack;

}


