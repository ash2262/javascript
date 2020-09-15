
// Below are two examples on how to call fetchIP first one uses promise and second one uses async await

Promise.resolve(fetchIp()).then(function(value) {
    console.log(value); // "Success"
    document.getElementById("demo").innerHTML = value;   //write the value to HTML element
  });

  
(async function () {	
// wait to http request to finish
	await fetchIp();
})();