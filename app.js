var express = require("express"),
    request = require('request'),
    async = require('async'),
    app = express.createServer();

app.configure(function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.set('view options', { layout: false });
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

var username = 'user1',
    password = 'startup123',
    urlBase = "http://" + username + ":" + password + "@";

var projectorIPs = [
  '192.168.0.105',
  '192.168.0.111',
  '192.168.0.108'
];

// Main Page that serves the controls
app.get('/', function(req, res) {
  res.render('index');
});


// Loop through projectors and turn the shutter on
app.get('/shutterOn', function(req, res) {

  var result;

  async.forEach(projectorIPs, function(address) {
    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=shutter_on&lang=e', function (error, response, body) {
      result = response;
    });
  }, function(err) {
    res.send(result);
  });

});


// Loop through projectors and turn the shutter off
app.get('/shutterOff', function(req, res) {

  var result;

  async.forEach(projectorIPs, function(address) {
    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=shutter_off&lang=e', function (error, response, body) {
      result = response;
    });
  }, function(err) {
    res.send(result);
  });

});


app.listen(3000);