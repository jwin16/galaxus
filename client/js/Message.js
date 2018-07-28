Message = function( socket ){

	var self = {
        textMessages:[],
        thisColor:[], 
        messages:{}, 
		socket:socket,
		fromId:0, 
    }

	self.newMessage = function( text , color = "white" ){

		self.textMessages.unshift( text );
		self.thisColor.unshift( color );

		console.log( "new message" );

		var message = {}; 

		message.color = text; 
		message.thisColor = color; 

		self.socket.emit('newMessage', message );

		//socket.emit('addToChat','The player ' + data.username + ' is not online.');

	} 






	self.updateChat = function( ){

		self.yOffset = 980;



		for (key in self.messages.text){

    		if( self.yOffset > 780 ){

				ctx.globalAlpha = 1; 

				if( self.messages.color[key] == 'white'){
					ctx.fillStyle="#FFF";
				}

				if( self.messages.color[key] == 'red'){
					ctx.fillStyle="#ff7676";
				}

				if( self.messages.color[key] == 'green'){
					ctx.fillStyle="#00FF00";
				}

				if( self.messages.color[key] == 'yellow'){
					ctx.fillStyle="#fdff76";
				}

				ctx.fillStyle="#FFF";
				ctx.font="13px Verdana";
				ctx.textAlign="left";
				ctx.fillText( self.messages.text[key] , 16 , 20 );

				console.log( self.messages.text[key]);
				console.log( self.yOffset );

				self.yOffset = self.yOffset - 20; 

			}

    	}

	}

	return self; 

}


