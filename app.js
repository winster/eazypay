var express = require('express'),
    https = require('https'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var gcmKey = 'AAAAK6sM0jc:APA91bGoSkp1vgdV6_8SmV5XoysjZV93mQrq-24BKJwog9cLUGS5vpdwQiIGXXxva4vOgMWW4yd2uckOn52jglv7U2YVZA5dAvD1JhDwsJOLE7AutWq8mNG5v6ipq_tOLCckGB1mlBte';

app.post('/message', function(request, response) {
  var input = JSON.stringify(request.body);
  console.log(input);
  
  var https = require('https');

  var options = {
    host: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "key="+gcmKey
    }
  };

  var fcm_req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      response.json({'result':'success'});
    });
  });

  fcm_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    response.json({'result':'failed'});
  });

  // write data to request body
  fcm_req.write(input);
  fcm_req.end();

});

app.listen(port, function () {
  console.log('Example app listening on port 5000!')
})