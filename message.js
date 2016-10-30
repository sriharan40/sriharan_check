var express = require('express');
var app = express();
var mysql = require('mysql');
var request = require("request");
var util = require("util");
var http = require('http');
	
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

var token = process.env.FB_PAGE_TOKEN;

var sender = req.params.sender;

var options = req.params.options;

if(options)
{
var options1 = options.split(',');
}

var mobile = req.params.mobile;

var token = req.params.token;

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeqrts';

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

if(token)
{
var caller_name = decrypt(token);
}

else{
var caller_name = "";	
}

var payment = req.params.payment;

var success = req.params.success;

var text1 = req.params.message;

var text1 = ("" + text1).replace(/%20/g, ' ');

var text1 = ("" + text1).replace(/%3F/g, '?');
	
var text = text1;
	
if(text = "" || text == undefined)
{
var text = "Welcome to ePayment System";
}

console.log(text);

if(sender)
{
var db_config = {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b213965cc9ad75',
    password: '9c81ac99',
    database: 'heroku_a0067bd7c868fc0'
};


var connection;

    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since
													// the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
	
connection.query('SELECT user_id from t_users where mobile = '+sender+'', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
		
var sender = rows[0].user_id;

if(sender)
{
sendTextMessage(sender, options1, text1, res);
}
		
    });
}	

if(success)
{
var text = "Future payment notification.";

sendNotification1(success,text,res);
}
	
if(payment)
{	
var text = "Future payment notification.";

sendNotification(payment,text,res);	

setTimeout(function() {
sendNotification1(payment,text,res);
}, 3000);

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

if(mobile)
{	
sendMessage(mobile, caller_name, text1, res);
}

function sendNotification(receiver, text, res) {

console.log('Receiver: '+receiver);

messageData = {
"attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Test User",		
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
	  
	 });
	 	 
}


function sendNotification1(receiver, text, res) {

console.log('Receiver: '+receiver);

messageData1 = {
    "text":"Will you get in touch with us for future payments also ?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Yes",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
      },
      {
        "content_type":"text",
        "title":"No",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
      }
    ]
   }
   
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
	    recipient: {id:receiver},
        message: messageData1,
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
	  
  });  
	 	 
}

function sendMessage(mobile, caller_name, text, res) {

var db_config = {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b213965cc9ad75',
    password: '9c81ac99',
    database: 'heroku_a0067bd7c868fc0'
};

var connection;

    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since
													// the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
	
connection.query('SELECT caller_system_name from caller_system where caller_system_name = '+caller_name+'', function(err, rows1, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
		
var caller_system_name = rows1[0].caller_system_name;

console.log(caller_system_name);
	
if(caller_system_name)
{	
	var accountSid = process.env.accountSid;
	var authToken = process.env.authToken;

	var client = require('twilio')(accountSid, authToken);

	client.sms.messages.create({
	    to: mobile,
	    from: '+18312165009',
	    body: text 
//	    body: 'Click Http://m.me/himantmusic to know your outstanding balance and for support type Hi' 
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

else{
   var error = "Authentication Error";
	
   res.statusCode = 200;

   res.setHeader('Content-Type', 'application/json');
	  
	var responseBody = {
        "speech": error,
        "displayText": error,	 
        "source": "apiai-Himant-OTP sample"
    };	

    res.write(JSON.stringify(responseBody));
    res.end();	
}	

});
	
}

function sendTextMessage(sender, options, text, res) {

  messageData = {
    "text": text,
    "quick_replies":[
      {
        "content_type":"text",
        "title": options[0],
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
      },
      {
        "content_type":"text",
        "title": options[1],
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
	else
	{
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

}).listen((process.env.PORT), () => console.log("Server listening"));
