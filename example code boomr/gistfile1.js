var ip = null;



async function fetchIp(){

try {

ip = await fetch('https://mocktarget.apigee.net/ip')

.then(res => res.json())

.then(res => res.ip)

.then(res => res);


return ip;

}

catch(error) {

console.log(error);

}

};



(async function () {

// wait to http request to finish

await fetchIp();
})


function addVars(e) {

e.detail.BOOMR.init({

      beacon_url: "https://boomerangprod.worldbank.org",

      beacon_type: "GET",

      beacon_url_force_https: false,

      strip_query_string: false,

      log: null,

      //log: function () {},

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

	fetchIp();
e.detail.BOOMR.addVar({

      "Tag_ip":ip

    });


//ip variable currently holds the ip address

console.log("ip1:"+ip);

}

if (document.addEventListener) {
  document.addEventListener("onBoomerangLoaded", addVars);
}
else if (document.attachEvent) {
  document.attachEvent("onpropertychange", function(e) {
    if (!e) e = window.event;
    if (e && e.propertyName === "onBoomerangLoaded") {
      addVars();
    }
  });
}