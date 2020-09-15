 // function random(){
	 // document.getElementById("demo").innerHTML = Math.random();
	// }
	
function random(){
	//document.getElementById("demo").innerHTML = Math.random();
	document.getElementById("demo").innerHTML = getRandom();
 }

function getRandom(){

	var array = new Uint32Array(1);
	return window.crypto.getRandomValues(array);

}
