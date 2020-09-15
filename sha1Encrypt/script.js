// Code goes here

$(document).ready(initialize);

function initialize() {
  $('#textInput').val('Enter Some Text Here');
  $('#passwordInput').val('12345678');
}

function SHA1(text) {
  
  var sha1Hash = CryptoJS.SHA1(text);
  
  var sha1HashToString = sha1Hash.toString();

  $('#sha1Hash').html(sha1HashToString);

}

