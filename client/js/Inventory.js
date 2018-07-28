Inventory = function(socket,server){

    var self = {
        items:[], //{id:"itemId",amount:1}
		socket:socket,
		server:server,
    }

    self.addItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount += amount;
				self.refreshRender();
				return;
			}
		}
		self.items.push({id:id,amount:amount});
		self.refreshRender();
    }

    self.removeItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount -= amount;
				if(self.items[i].amount <= 0)
					self.items.splice(i,1);
				self.refreshRender();
				return;
			}
		}    
    }

    self.hasItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				return self.items[i].amount >= amount;
			}
		}  
		return false;
    }

	self.refreshRender = function(){

		//server
		if(self.server){
			self.socket.emit('updateInventory',self.items);
			return;
		}
		
		//client only
		var inventory = document.getElementById("inventory");
		inventory.innerHTML = "";
		
		var addButton = function(data){
			let item = Item.list[data.id];
			let button = document.createElement('button'); 
			button.onclick = function(){
				self.socket.emit("useItem",item.id);
			}
			button.innerText = item.name + " x" + data.amount;
			inventory.appendChild(button);
		}
		for(var i = 0 ; i < self.items.length; i++)
			addButton(self.items[i]);
	}

	if(self.server){

		self.socket.on("useItem",function(itemId){

			if(!self.hasItem(itemId,1)){
				console.log("Cheater");
				return;
			}

			let item = Item.list[itemId];

			item.event(Player.list[self.socket.id]);
		});

	}

	return self;
}


Item = function(id,name,event){

	var self = {
		id:id,
		name:name,
		event:event,
	}

	Item.list[self.id] = self;
	return self;
}

Item.list = {};

Item("potion","Potion",function(player){

	player.hp = 10;

	player.inventory.removeItem("potion",1);

	player.inventory.addItem("superAttack",1);

});


Item("superAttack","Super Attack",function(player){

	for(var i = 0 ; i < 360; i++)
		player.shootBullet(i);

});




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

		self.messages.text = self.textMessages;
		self.messages.color = self.thisColor;

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







