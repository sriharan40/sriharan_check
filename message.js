var express = require('express');
var FBMessenger = require('fb-messenger');

var app = express();

var token = "EAACXZB4I0ilMBALixoOmi8ZBvJOFedZCREJcZAavo5q91KBwsc19ngPftSdTiTRcZA8R9eGCgQNFx1Xz0AiTF2fUGpAvZA9M0tlzDlQW3KpXoD1Jy5Q0OaI3raYkGktd2mVP7a5wVZBKKb91BevdPc3Qr4GJb5npQbm8Rp1kerecgZDZD";

var sender = "8050582590";
var text = "Hello";

  messageData = {
    text:text
  }
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });