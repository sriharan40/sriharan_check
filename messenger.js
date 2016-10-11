var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger('EAACXZB4I0ilMBALixoOmi8ZBvJOFedZCREJcZAavo5q91KBwsc19ngPftSdTiTRcZA8R9eGCgQNFx1Xz0AiTF2fUGpAvZA9M0tlzDlQW3KpXoD1Jy5Q0OaI3raYkGktd2mVP7a5wVZBKKb91BevdPc3Qr4GJb5npQbm8Rp1kerecgZDZD');

messenger.sendTextMessage('+918050582590', 'Hello', function (err, body) {
  if(err) return console.error(err);
  console.log(body);
})
