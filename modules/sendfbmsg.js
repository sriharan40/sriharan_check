function sendTextMessage(sender, options, text, res) { 
 if(options)
  {
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
  }
  else
  {
  messageData = {	   
	"text": text 
     }	
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
