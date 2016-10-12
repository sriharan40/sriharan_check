var express = require('express');
var app = express();
var request = require("request");
var FBMessenger = require('fb-messenger');


var token = "EAAEcEkKVmnIBAChlOhWc1tHveQIHOuutAOQQGAQqL7QbwPXBO5zC0pOG39JmHsOl81UZA6W3C4wZAZBf9z4l88RKEacF7zg65NWyGoBr4b6vmLoTLQuUXlBSI21IohuSU4G0AyJ12F5037LBNndmXotz9xZAq2p3GVZBcNmyIcgZDZD";

//var sender = "+918050582590";
var sender = "himant.gupta";
var text = "Please pay your Due amount Rs.500/-";

sendTextMessage(sender, text);

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
       // recipient: {phone_number:sender},
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
}
