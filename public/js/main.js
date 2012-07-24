$(document).ready(function() {

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


  $('a#osdOff').click(function() {
    $.get('/osdOff', function(response) {
      // Do Something To Display Result
    });
    return false;
  });

});