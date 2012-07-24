$(document).ready(function() {

  // Shutter

  $('a#shutterOn').click(function() {
    $.get('/shutterOn', function(response) {
      // Do Something To Display Result
    });
    return false;
  });


  $('a#shutterOff').click(function() {
    $.get('/shutterOff', function(response) {
      // Do Something To Display Result
    });
    return false;
  });

  // OSD

  $('a#osdOff').click(function() {
    $.get('/osdOff', function(response) {
      // Do Something To Display Result
    });
    return false;
  });

  // Macros

  $('a#macro1').click(function() {
    $.get('/switchInputs', { input: 'rgb1', 'projectors[]': [0,1] }, function(response) {
      // Do Something To Display Result
    });
    return false;
  });

  $('a#macro2').click(function() {
    $.get('/switchInputs', { input: 'rgb2', 'projectors[]': [0,1] }, function(response) {
      // Do Something To Display Result
    });
    return false;
  });

});