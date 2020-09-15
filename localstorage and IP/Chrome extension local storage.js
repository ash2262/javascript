//Check this - can we use local storage to store IP information  https://developer.chrome.com/extensions/storage


//https://dev.to/milandhar/chrome-local-storage-in-extensions-4k9m


chrome.storage.local.set({ isPaused: false })
chrome.storage.local.set({'public_IP': json.ip})

chrome.storage.local.get(['public_IP', 'isPaused'], function(data) {
    ipInput.value = data.public_IP
if (!data.isPaused) {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 100);
      isNotPausedDisplay();
    } else {
      chrome.storage.local.get('pausedCount', function(data) {
        counterElement.innerHTML = secToMin(data.pausedCount);
      });
      isPausedDisplay();
    }

  });
  
function clearLocalStorage(){
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
   })
 }