var express = require('express');
var app = express();
var request = require("request");
var util = require("util");
//var url  = require('url');
var http = require('http');
//var qs = require('querystring');

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

//var url_query = require('url').parse(request.url).pathname;

var token = process.env.FB_PAGE_TOKEN;
// +639178313417  639178483863
//var sender = "+918050582590";
//var sender = "himant.gupta";
//var text = "Auto message on your number +91 8050582590";

//app.get('/', function(req, res){

//var query = url_query.query;

var sender = req.params.sender;

var mobile = req.params.mobile;

//var text = req.params.message;

var text = "Welcome to ePayment System";

var payment = req.params.payment;

//var speech = 'Message sent successfully to '+sender;			

if(payment)
{
var text = "Congratulations your payment done successfully.";
	
sendNotification(payment,text,res);	
}

if(sender)
{	
sendTextMessage(sender, text, res);
}

if(mobile)
{	
sendMessage(mobile, text, res);
}

function sendNotification(receiver, text, res) {

console.log('Receiver: '+receiver);

messageData = {
"attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Sriharan",		
        "order_number":"12345678902",
        "currency":"USD",
        "payment_method":"PayPal",        
        "timestamp":"1428444852", 
        "elements":[
          {
            "title":"Congratulations for the Payment",
            "subtitle":"Payment Success",
            "quantity":1,
            "price":1,
            "currency":"USD",
          }
		 ],
        "summary":{
          "subtotal":1.00,
          "total_cost":1.00
        }
      }
    }
  }
   
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
	    recipient: {id:receiver},
        message: messageData,
      }
  }, function(error, response, body) {
  console.log('Result: '+receiver);
  if (error) {
      console.log('Error sending message: ', error);

	  res.statusCode = 200;
			
      res.setHeader('Content-Type', 'application/json');	

// GENERATE THE RESPONSE BODY - HIMANT - And SEND BACK THE RESPONSE TO CLIENT SPEECH Object
     var responseBody = {
        "speech": error,
        "displayText": error,	     
        "source": "apiai-Himant-message sample"
    };

    res.write(JSON.stringify(responseBody));
    res.end();

    } else if (response.body.error) {
      console.log('Error: ', response.body.error);

	  res.statusCode = 200;
			
      res.setHeader('Content-Type', 'application/json');	

// GENERATE THE RESPONSE BODY - HIMANT - And SEND BACK THE RESPONSE TO CLIENT SPEECH Object
     var responseBody = {
        "speech": response.body.error,
        "displayText": response.body.error,	     
        "source": "apiai-Himant-message sample"
    };

    res.write(JSON.stringify(responseBody));
    res.end();
	  }
	 else{
		console.log('Result: '+receiver);

   	      res.statusCode = 200;
	
		  res.setHeader('Content-Type', 'application/json');
	  
	var responseBody = {
        "speech": text,
        "displayText": text,	 
        "source": "apiai-Himant-OTP sample"
    };
	
    res.write(JSON.stringify(responseBody));
    res.end();
	
		 }	 
  });	  
	  	  
}


function sendMessage(mobile, text, res) {
	
	var accountSid = process.env.accountSid;
	var authToken = process.env.authToken;

	var client = require('twilio')(accountSid, authToken);

	client.sms.messages.create({
	    to: mobile,
	    from: '+18312165009',
	    body: 'Click Http://m.me/himantmusic to know your outstanding balance and for support type Hi' 
	}, function(error, message) {
	    // The HTTP request to Twilio will run asynchronously. This callback
	    // function will be called when a response is received from Twilio
	    // The "error" variable will contain error information, if any.
	    // If the request was successful, this value will be "falsy"
	    if (!error) {
		// The second argument to the callback will contain the information
		// sent back by Twilio for the request. In this case, it is the
		// information about the text messsage you just sent:
		console.log('Success! The SID for this SMS message is:');
		console.log(message.sid);

		console.log('Message sent on:');
		console.log(message.dateCreated);
	    } else {
		console.log('Oops! There was an error.');
	    }
	});	
}

function sendTextMessage(sender, text, res) {

  messageData = {
    "text":"Select an option:",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"My Outstanding",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
      },
      {
        "content_type":"text",
        "title":"My Bills",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
      }
    ]
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

	  res.statusCode = 200;
			
      res.setHeader('Content-Type', 'application/json');	

// GENERATE THE RESPONSE BODY - HIMANT - And SEND BACK THE RESPONSE TO CLIENT SPEECH Object
     var responseBody = {
        "speech": error,
        "displayText": error,	     
        "source": "apiai-Himant-message sample"
    };

    res.write(JSON.stringify(responseBody));
    res.end();

    } else if (response.body.error) {
      console.log('Error: ', response.body.error);

	  res.statusCode = 200;
			
      res.setHeader('Content-Type', 'application/json');	

// GENERATE THE RESPONSE BODY - HIMANT - And SEND BACK THE RESPONSE TO CLIENT SPEECH Object
     var responseBody = {
        "speech": response.body.error,
        "displayText": response.body.error,	     
        "source": "apiai-Himant-message sample"
    };

    res.write(JSON.stringify(responseBody));
    res.end();
	  }
  
	  });
	  }

}).listen((process.env.PORT), () => console.log("Server listening"));
