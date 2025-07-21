var numKeys = [];
var opns = [];
var isFahrenheit = false;
var isOunce = false;
var isFeet = false;
var isInches = false;
var res = document.querySelector("#resultArea");
var clrBtn = document.querySelector("#clrTxt");
var delBtn = document.querySelector("#del");
var eqBtn = document.querySelector("#eq");
var decPoint = document.querySelector("#decp");
var opac=document.querySelector("#opac");
var fBtn = document.querySelector("#fahrenheit");
var ozBtn = document.querySelector("#ounce");
var ftBtn = document.querySelector("#feet");
var inBtn = document.querySelector("#inches");
var opnSyms = ["+", "-", "*", "/"];
var symList;
var tmpCal;
var j;
var duplicate;
for(var i=0;i<=9;i++){
	(function(i){
    	qs = "#num" + i;
		numKeys.push(document.querySelector(qs));
		numKeys[i].addEventListener("click", function(){
			res.textContent += i;
			if(opnSyms.length>=1){
				opac.innerHTML=eval(res.textContent);
			}
		});
  	}(i));
}

for(var i=0;i<=3;i++){
	(function(i){
    	qs = "#op" + i;
		opns.push(document.querySelector(qs));
		opns[i].addEventListener("click", function(){
			res.textContent += opnSyms[i];
		});
  	}(i));
}

fBtn.addEventListener("click", function(){
	if (res.textContent !== "" && !isNaN(res.textContent)) {
		res.textContent += " °F";
		isFahrenheit = true;
		isOunce = false;
	}
});

ozBtn.addEventListener("click", function(){
	if (res.textContent !== "" && !isNaN(res.textContent)) {
		res.textContent += " oz";
		isOunce = true;
		isFahrenheit = false;
	}
});

ftBtn.addEventListener("click", function(){
	if (res.textContent !== "" && !isNaN(res.textContent)) {
		res.textContent += " ft";
        isFeet = true;
        isInches = false;
	}
});

inBtn.addEventListener("click", function(){
	if (res.textContent !== "" && !isNaN(res.textContent)) {
		res.textContent += " in";
		isInches = true;
		isFeet = false;
	}
});

clrBtn.addEventListener("click", function(){
	res.textContent = "";
	opac.innerHTML="";
});

delBtn.addEventListener("click", function(){
	temp=res.textContent[res.textContent.length-1];
    res.textContent = res.textContent.substring(0, res.textContent.length - 1);
	if((temp!="+") && temp!="-" && temp!="*" && temp!="/"){
	 duplicate=res.textContent.substring(0,res.textContent.length - 1);
	if(res.textContent[res.textContent.length-1]!="+" && res.textContent[res.textContent.length-1]!="-" && res.textContent[res.textContent.length-1]!="*" && res.textContent[res.textContent.length-1]!="/"){
	    opac.innerHTML=eval(res.textContent);
	}
	else{
		duplicate=res.textContent.substring(0,res.textContent.length - 1);
		opac.innerHTML=eval(duplicate);
	}
}
});


decPoint.addEventListener("click", function(){
	res.textContent += ".";
});

eqBtn.addEventListener("click", function(){
	let input = res.textContent.trim();
	
	if (isFahrenheit && input.endsWith("F")) {
		let num = parseFloat(input.slice(0, -3));
		if (!isNaN(num)) {
			let celsius = (num - 32) * 5 / 9;
			res.textContent = celsius.toFixed(2) + " °C";
			opac.innerHTML = "";
		} else {
			res.textContent = "Invalid Input";
		}
		isFahrenheit = false;
		return;
	}

	if (isOunce && input.endsWith("oz")) {
		let num = parseFloat(input.slice(0, -3));
		if (!isNaN(num)) {
			let grams = num * 28.3495;
			res.textContent = grams.toFixed(2) + " g";
			opac.innerHTML = "";
		} else {
			res.textContent = "Invalid Input";
		}
		isOunce = false;
		return;
	}

	// Default behavior (math evaluation)
	(function(i, j){
		symList = [];
		for(var i=0; i<opnSyms.length; i++){
			if(res.textContent.indexOf(opnSyms[i]) > -1){
				symList.push(opnSyms[i]);
			}
		}

		if(symList.length > 0){
			try{
				res.textContent = eval(res.textContent);
			}
			catch(e){
				res.textContent = "Invalid Syntax";
			}
		}
	}(i, j));
});
