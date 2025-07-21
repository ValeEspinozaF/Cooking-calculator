var numKeys = [];
var opns = [];
var isFeey = false;
var isInches = false;
var res = document.querySelector("#resultArea");
var clrBtn = document.querySelector("#clrTxt");
var delBtn = document.querySelector("#del");
var eqBtn = document.querySelector("#eq");
var decPoint = document.querySelector("#decp");
var opac=document.querySelector("#opac");
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
	
	if (isFeet && input.endsWith("ft")) {
		let num = parseFloat(input.slice(0, -3));
		if (!isNaN(num)) {
			let centimeters = num * 30.48;
			res.textContent = centimeters.toFixed(2) + " cm";
			opac.innerHTML = "";
		} else {
			res.textContent = "Invalid Input";
		}
		isFeet = false;
		return;
	}

	if (isInches && input.endsWith("in")) {
		let num = parseFloat(input.slice(0, -3));
		if (!isNaN(num)) {
			let centimeters = num * 2.54;
			res.textContent = centimeters.toFixed(2) + " cm";
			opac.innerHTML = "";
		} else {
			res.textContent = "Invalid Input";
		}
		isInches = false;
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
