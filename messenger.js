var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger('EAAEcEkKVmnIBAORKWxp0nQh9ZACPidqF80f4gPnNfHT4CpY5plHnnMCHhll29szbtQynK2wyIND3P2MiPfDX5A267cMD9aWc0mih7fFneknBqvpOUOvjZCgFBsoUrorCgH6ZBxI4eRD6Q1lwSAQD20AMwabphBqMWzATmxHDAZDZD')

messenger.sendTextMessage('sriharan40@gmail.com', 'Hello', function (err, body) {
  if(err) return console.error(err)
  console.log(body)
})
