var express = require('express');
var app = express();
var request = require("request");
var http = require('http');
var util = require("util");

var token = "EAAEcEkKVmnIBAChlOhWc1tHveQIHOuutAOQQGAQqL7QbwPXBO5zC0pOG39JmHsOl81UZA6W3C4wZAZBf9z4l88RKEacF7zg65NWyGoBr4b6vmLoTLQuUXlBSI21IohuSU4G0AyJ12F5037LBNndmXotz9xZAq2p3GVZBcNmyIcgZDZD";
// +639178313417  639178483863
var sender = "+918050582590";
//var sender = "himant.gupta";
var text = "Auto message on your number +91 8050582590";

http.createServer(function(req, res) {
  var headers = req.headers;
  var method = req.method;
  var url = req.url;
  var body = [];

app.get('/', function(req, res){

var sender = req.query.mobile;
//var sender = "himant.gupta";
var text = req.query.message;

var speech = 'Message sent successfully to'+sender;	

response.statusCode = 200;
	
response.setHeader('Content-Type', 'application/json');	

// GENERATE THE RESPONSE BODY - HIMANT - And SEND BACK THE RESPONSE TO CLIENT SPEECH Object
     var responseBody = {
        "speech": speech,
        "displayText": speech,	     
        "source": "apiai-Himant-message sample"
    };
	
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
        recipient: {phone_number:sender},
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

    res.write(JSON.stringify(responseBody));
    res.end();

});

}).listen((process.env.PORT), () => console.log("Server listening"));