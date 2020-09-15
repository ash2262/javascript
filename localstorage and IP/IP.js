var ip = null;



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

// wait to http request to finish

await fetchIp();

// Add boomerang call here

if (document.addEventListener) {

   console.log("ip_testing1:"+ip);

  document.addEventListener("onBoomerangLoaded", function(e){

    console.log("ip_testing2:"+ip);

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

	console.log("ip_testing:"+ip);

    e.detail.BOOMR.addVar({

      "Tag_ip":ip

    });

    e.detail.BOOMR.t_end = new Date().getTime();

  });

}

//ip variable currently holds the ip address

console.log("ip1:"+ip);

})();