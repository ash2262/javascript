// Code goes here

$(document).ready(initialize);

function initialize() {
  $('#textInput').val('Enter Some Text Here');
  $('#passwordInput').val('12345678');
}

function encrypt() {
  var plainText = $('#textInput').val();
  var password = $('#passwordInput').val();
  
  var passwordBytes = CryptoJS.enc.Utf16LE.parse(password);

  var sha1Hash = CryptoJS.SHA1(passwordBytes);
  
  var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);

  // we are getting only the first 8 chars for actual key generation
  sha1HashToBase64Short = sha1HashToBase64.substring(0,8);

  var aesKey = CryptoJS.enc.Utf16.parse(sha1HashToBase64Short);
  var aesIv = aesKey;

 //Note that we are being lazy and the encryption key itself
 //is used as the initialization vector for AES
  var x = CryptoJS.AES.encrypt(plainText, aesKey, {
    iv: aesIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // cryptHex will contain the cipher text in base64
  var cryptHex = x.toString();

  var y = CryptoJS.AES.decrypt(cryptHex, aesKey, {
    iv: aesIv
  });

  ytext = y.toString(CryptoJS.enc.Utf8)

  $('#sha1Hash').html(sha1HashToBase64);
  $('#key').html(aesKey.toString());
  $('#cipherText').html(cryptHex);
  $('#decrypted').html(ytext);

}

