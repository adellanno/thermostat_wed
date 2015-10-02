$(document).ready(function()

  {
  therm = new Thermostat();

  var display = function() {
  $('#output').html(therm.temp + '°C');
  $('#output').css('color', therm.tempColour());
};

  display();

  $('#temp_up').click(function() {
    try {
      therm.increaseByOne();
      display();
    } catch (x) {
      alert('Power Saving Mode on, maximum temperature reached');

    } finally { }

  });

  $('#temp_down').click(function() {
      therm.decreaseByOne();
      display();
    });

  $('input[type="checkbox"]').click(function() {
  if ($('#powerSave').is(':checked')) {
    therm.turnOnPowerSavingMode();
  } else if ($('#powerSave').is(':not(:checked)')) {
    therm.turnOffPowerSavingMode();
  }

  display();
  });

  $('#reset').click(function() {
    therm.resetButton();
    display();
  });

  $('#btnGetWeather').click(function() {
      var requestData = $('#txtCity').val() + ',' + $('#txtCountry').val() + '&units=metric';
      var resultElement = $('#resultDiv');

      var link = 'http://api.openweathermap.org/data/2.5/weather?q=' + requestData;

      $.ajax({
        url: link,
        success: function(data) {
          resultElement.html('Temperature: ' + data.main.temp + '°C');
         }
      });
    });




// GET ERRORS PRINTED ON BROWSER! //


  });

  // $.ajax({
  //   url: 'http://api.wunderground.com/api/de4830905b55f18e/geolookup/conditions/q/UK/london.json',
  //   dataType: 'jsonp',
  //   success: function(parsed_json) {
  //     var location = parsed_json['location']['city'];
  //     var temp_f = parsed_json['current_observation']['temp_c'];
  //     $('#weather').html('Current temperature in ' + location + ' is: ' + temp_f + '°C');
  //   }
  //   });
