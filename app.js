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
  '192.168.0.108',
  '192.168.0.111'
];

// Main Page that serves the controls
app.get('/', function(req, res) {
  res.render('index');
});


// Loop through projectors and turn the shutter on
app.get('/shutterOn', function(req, res) {

  var result;

  async.forEach(projectorIPs, function(address, cb) {
    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=shutter_on&lang=e', function (error, response, body) {
      result = response;
      cb(error);
    });
  }, function(err) {
    res.send(result);
  });
});

// Loop through projectors and turn the shutter off
app.get('/shutterOff', function(req, res) {

  var result;

  async.forEach(projectorIPs, function(address, cb) {
    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=shutter_off&lang=e', function (error, response, body) {
      result = response;
      cb(error);
    });
  }, function(err) {
    res.send(result);
  });
});

// Loop through projectors and turn the on screen display off
app.get('/osdOff', function(req, res) {

  var result;
  async.forEach(projectorIPs, function(address, cb) {

    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=osd_off&lang=e', function (error, response, body) {
//      console.log(response);
//      console.log(error);
      result = response;
      cb(error);
    });
  }, function(err) {
    res.send(result);
  });
});

/**
 * Switch Inputs
 *
 * @params:
 *  - input {String}, ex: rgb1, rgb2, svideo
 *  - projectors {Array}, ex: [0,3]
 */
app.get('/switchInputs', function(req, res) {

  var result,
      input = req.query.input,
      projectors = req.query.projectors;

  async.forEach(projectors, function(index, cb) {
    request(urlBase + projectorIPs[index] + '/cgi-bin/proj_ctl.cgi?key=' + input + '&lang=e&osd=on', function (error, response, body) {
      result = response;
      cb(error);
    });
  }, function(err) {
    res.send(result);
  });
});


app.get('/standby', function(req, res) {

  var result;
  async.forEach(projectorIPs, function(address, cb) {

    request(urlBase + address + '/cgi-bin/proj_ctl.cgi?key=pow_off&lang=e', function (error, response, body) {
      console.log(response);
      console.log(error);
      result = response;
      cb(error);
    });
  }, function(err) {
    res.send(result);
  });
});

app.listen(3000);