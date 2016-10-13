var express = require('express');
var app = express();
var request = require("request");
var util = require("util");
var url  = require('url');
var http = require('http');
var qs = require('querystring');

var params=function(req){
  var q=req.url.split('?'),result={};
  if(q.length>=2){
      q[1].split('&').forEach((item)=>{
           try {
             result[item.split('=')[0]]=item.split('=')[1];
           } catch (e) {
             result[item.split('=')[0]]='';
           }
      })
  }
  return result;
}

http.createServer(function(req, res) {
  var headers = req.headers;
  var method = req.method;
  var url = req.url;
  var body = [];

req.params=params(req);

var url_query = require('url').parse(request.url).pathname;

var token = "EAAEcEkKVmnIBAChlOhWc1tHveQIHOuutAOQQGAQqL7QbwPXBO5zC0pOG39JmHsOl81UZA6W3C4wZAZBf9z4l88RKEacF7zg65NWyGoBr4b6vmLoTLQuUXlBSI21IohuSU4G0AyJ12F5037LBNndmXotz9xZAq2p3GVZBcNmyIcgZDZD";
// +639178313417  639178483863
var sender = "+918050582590";
//var sender = "himant.gupta";
var text = "Auto message on your number +91 8050582590";

//app.get('/', function(req, res){

//var query = url_query.query;

var sender = req.params.mobile;
//var sender = "himant.gupta";
var text = req.params.message;

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
  }, function(error, res, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (res.body.error) {
      console.log('Error: ', res.body.error);
    }
  });
}

    res.write(JSON.stringify(responseBody));
    res.end();


}).listen((process.env.PORT), () => console.log("Server listening"));