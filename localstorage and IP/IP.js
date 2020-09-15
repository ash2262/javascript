var ip = null;
console.log("localstorageIP: "+ip);
async function fetchIp(){
	try {
		ip = localStorage.getItem("IP");    //fetch IP from localstorage
		if(ip==null){ 						// if localstorage value is null, fetch from API
			console.log("TEst iip:"+ip);
			ip = await fetch('https://mocktarget.apigee.net/ip')
			.then(res => res.json())
			.then(res => res.ip)
			.then(res => res.split(",")[0]);
			
			localStorage.setItem("IP",ip); // set IP in localstorage
		}
		console.log("ip-address:"+ip);
	return ip;
	}
	catch(error) {
		console.log(error);
	}
};
