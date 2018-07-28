
//sign
var signDiv = document.getElementById('signDiv');
var signDivUsername = document.getElementById('signDiv-username');
var signDivColor = document.getElementById('signDiv-color');
var signDivSignIn = document.getElementById('signDiv-signIn');
var signDivSignUp = document.getElementById('signDiv-signUp');
var signDivPassword = document.getElementById('signDiv-password');
var thisColor = ""; 


$( function(){
	
	randColorCode = (Math.floor( Math.random() * 7)); 
	if( randColorCode == 1 ){
		$(".sOne").click(); 
	}else if( randColorCode == 2){
		$(".sTwo").click(); 
	}else if( randColorCode == 3){
		$(".sThree").click();
	}else if( randColorCode == 4){
		$(".sFour").click();
	}else if( randColorCode == 5){
		$(".sFive").click(); 
	}else if( randColorCode == 6){
		$(".sSix").click();
	}else if( randColorCode == 7 ){
		$(".sSeven").click();
	}else{
		$(".sOne").click(); 
	}

}); 

function selColor( color ){

	$(".cSel td").css("border","2px #ccc solid"); 
	$(".cSel td").css("background-color","#eee"); 

	if( color == '#fffa47'){
		$(".cSelOne").css("border","2px #000 solid"); 
		$(".cSelOne").css("background-color","#999"); 
	}

	if( color == '#69a2f6'){
		$(".cSelTwo").css("border","2px #000 solid"); 
		$(".cSelTwo").css("background-color","#999"); 
	}

	if( color == '#57ff45'){
		$(".cSelThree").css("border","2px #000 solid"); 
		$(".cSelThree").css("background-color","#999"); 
	}

	if( color == '#d545ff'){
		$(".cSelFour").css("border","2px #000 solid"); 
		$(".cSelFour").css("background-color","#999"); 
	}

	if( color == '#ee0557'){
		$(".cSelFive").css("border","2px #000 solid"); 
		$(".cSelFive").css("background-color","#999"); 
	}

	if( color == '#ff9600'){
		$(".cSelSix").css("border","2px #000 solid"); 
		$(".cSelSix").css("background-color","#999"); 
	}

	if( color == '#05eeeb'){
		$(".cSelSeven").css("border","2px #000 solid"); 
		$(".cSelSeven").css("background-color","#999"); 
	}

	$("#signDiv-color").val( color ); 

}

signDivSignIn.onclick = function(){

	socket.emit('signIn',{ username:signDivUsername.value , color:signDivColor.value });

}

signDivSignUp.onclick = function(){

	socket.emit('signUp',{ username:signDivUsername.value,password:signDivPassword.value});

}

socket.on('signInResponse',function(data){
	if(data.success){

		// Stop menu from running 
		clearInterval( menuRun );

		ctx.clearRect(0,0,1200,1000);

 		initiateGame(); 

	} else
		alert("Sign in unsuccessul.");
});

socket.on('signUpResponse',function(data){
	if(data.success){
		alert("Sign up successul.");
	} else
		alert("Sign up unsuccessul.");
});
