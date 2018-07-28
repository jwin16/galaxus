

Maps = function( id , imgSrc , grid ){

	var self = {
		id:id,
		image:new Image(),
		width:3000,
		height:3000,
		grid:grid,
	}

	self.image.src = imgSrc;
	
	self.isPositionWall = function( pt ){

		var gridX = Math.floor( pt.x / TILE_SIZE );

		var gridY = Math.floor( pt.y / TILE_SIZE );

		if( gridX < 0 || gridX >= self.grid[0].length )

			return true;

		if( gridY < 0 || gridY >= self.grid.length )

			return true;

		return self.grid[gridY][gridX];

	}
	

	self.draw = function(){

		var x = WIDTH/2 - player.x;

		var y = HEIGHT/2 - player.y;

		ctx.drawImage( self.image , 0 , 0 , self.image.width , self.image.height , x , y , self.image.width * .8 , self.image.height * .8 );

	}

	return self;

}

