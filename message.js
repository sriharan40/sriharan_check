var express = require('express');
var app = express();
var request = require("request");
var FBMessenger = require('fb-messenger');


var token = "EAACXZB4I0ilMBAL53eWQ4vhvZCl51ZAS26XsAqilG9fZAZBMlBZAEFQcnbvsskgLF71mGRHEa62u5oyRvxOhSCuEKbDfixGPI17ENgWxXB34siroI1w29RAhpiV6u2gdm3CYwiXGF7SIZAPeeitZC6ae1hz6ZCdZAInZAMCD3tix3lImQZDZD";

var sender = "8050582590";
var text = "Hello";

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