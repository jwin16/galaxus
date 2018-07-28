
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