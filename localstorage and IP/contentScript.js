var ip = null;
async function fetchIp(){
try {
	console.log("TEst iip:"+ip);
ip = await fetch('https://mocktarget.apigee.net/ip')
.then(res => res.json())
.then(res => res.ip)
.then(res => res.split(",")[0]);
//console.log("ip-address-content:"+ip);
}
catch(error) {
console.log(error);
}
};
(async function() {
	await fetchIp();
    function injectScript(src, where) {
        var scripts = [
		  chrome.extension.getURL("js\/boomerang.js"),
		  chrome.extension.getURL("js\/navtiming.js"),
		  chrome.extension.getURL("js\/wbgrt.js"),
		  chrome.extension.getURL("js\/guid.js"),
		   chrome.extension.getURL("js\/IP.js"
        ];
        for (i = 0; i < scripts.length; i++) {
            var b = document.createElement("script");
            b.src = scripts[i];
            document[where || 'head'].appendChild(b);
        }
        var elm = document.createElement('script');
        elm.src = src;
        document[where || 'head'].appendChild(elm);
    }
 
    var customjs3 = setTimeout(function() {
      //  boomerang call here
        BOOMR.init({
            beacon_url: "https://boomerangprod.worldbank.org/",
			beacon_type: "GET",
			log: null,
            RT: {
                cookie: 'EH-RUM-RT'
            }
        });
    }, 3000);

    if (customjs3) {
        setTimeout(function() {
            injectScript('data:text/javascript;base64,' + window.btoa(customjs3), 'body');
        }, 250);
    }
})();

// Capture performanceTiming metrics 

window.addEventListener ("load", perftiming, false);
function perftiming (evt) {
	console.log("My IP"+ip);
   setTimeout(function() {
      const l = performance.getEntriesByType('navigation')[0].toJSON();
	  //console.log(l);
      if (l.duration > 0) {
        // we have only 4 chars in our disposal including decimal point
        var t = (l.duration / 1000).toFixed(2);
		//console.log(t);
        chrome.runtime.sendMessage({time: t, timing: l});
		}
   }, 0); 	

   
    var pt = window.performance.getEntries();
    url="https://boomerangprod.worldbank.org"

    //console.log("Performance metric count: "+pt.length);
    for (jj=0; jj<pt.length; jj++){
        var pt_obj = JSON.parse(JSON.stringify(pt[jj]))
        pt_msg = Object.keys(pt_obj).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(pt_obj[k])
        }).join('&')
        
        pt_msg = "metricType=performanceTiming&"+pt_msg;
        var qparams=url+"?"+pt_msg;
        //navigator.sendBeacon(url+pt_msg);
        chrome.runtime.sendMessage({pt_chrome_message: pt_msg, count: jj}, function(response) {
            //console.log(response.pt_chrome_response);
        });

    }

}