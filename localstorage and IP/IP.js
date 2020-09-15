var ip = localStorage.getItem("IP");
console.log("localstorageIP: "+ip);
async function fetchIp(){
	try {
		
		ip = await fetch('https://mocktarget.apigee.net/ip')
		.then(res => res.json())
		.then(res => res.ip)
		.then(res => res);
		console.log("ip:"+ip);
	}
	catch(error) {
		console.log(error);
	}
};

(async function () {

if(ip==null)
{
	await fetchIp();
}
	
	if (document.addEventListener) {
	   //console.log("ip_testing1:"+ip);
	  document.addEventListener("onBoomerangLoaded", function(e){
		console.log("ip_testing2:"+ip);
		BOOMR.init({
		  beacon_url: "https://boomerangprod.worldbank.org",
		  beacon_type: "GET",
		  beacon_url_force_https: false,
		  strip_query_string: false,
		  log: null,
		  ResourceTiming: {
			enabled: false,
			clearOnBeacon: true
		  },
		  RT: {
			enabled: false,
			cookie: "WBG-Cookie-Sample"
		  },
		  NavigationTiming: {
			enabled: true
		  }
		});
		console.log("ip_testing:"+ip);
		BOOMR.addVar({
		  "Tag_ip":ip
		});
		BOOMR.t_end = new Date().getTime();
	  });
	}
	console.log("ip1:"+ip);
	//localStorage.setItem("IP",ip);
	console.log("localstorageValue:"+localStorage.getItem("IP"));
})();

