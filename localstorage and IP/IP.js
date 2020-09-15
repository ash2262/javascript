var ip = null;

async function fetchIp(){
	try {
		ip = localStorage.getItem("IP"); //fetch IP from localstorage
		//console.log("localstorageIP: "+ip);
		IPStoreDate=localStorage.getItem("IPStoreDate");
		IPStoreDate=new Date(IPStoreDate); 
		var TodayDate=new Date(Date.now()); 		
		//console.log("IPStoreDate: "+IPStoreDate);
	
		var DateDiff=diff_hours(TodayDate,IPStoreDate);
		if(ip==null||DateDiff>24){ 						// if localstorage value is null or older than 24 hrs, fetch from API
			console.log("TEst iip:"+ip);
			ip = await fetch('https://mocktarget.apigee.net/ip')
			.then(res => res.json())
			.then(res => res.ip)
			.then(res => res.split(",")[0]);
			
			localStorage.setItem("IP",ip); // set IP in localstorage
			localStorage.setItem("IPStoreDate",TodayDate);
		}
		//console.log("ip-address:"+ip);
	return ip;
	}
	catch(error) {
		console.log(error);
	}
};

function diff_hours(dt2, dt1) 
 {
  var dt2time=new Date(Date.parse(dt2));
  var dt1time=new Date(Date.parse(dt1));
  
  var diff =(dt2time.getTime() - dt1time.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));  
 }
