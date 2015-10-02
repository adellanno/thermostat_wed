describe('Thermostat', function() {
  var temp;
  var minTemp = 10;
  var powerSavingModeMax = 25;
  var maxTemp = 32;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('should start at 20C', function() {
    expect(thermostat.temp).toEqual(20);

  });

  it(
    'should increase the temperature by one when the increase button is pushed',
    function() {
      thermostat.increaseByOne();
      expect(thermostat.temp).toEqual(21);
    });

  it(
    'should decrease the temperature by one when the decrease button is pushed',
    function() {
      thermostat.decreaseByOne();
      expect(thermostat.temp).toEqual(19);
    });

  it('has a minimum temperature of 10C', function() {
    expect(thermostat.minTemp).toEqual(10);
  });

  it('cannot go below minimum temperature', function() {
    for (var i = 20; i >= minTemp + 1; i--) {
      thermostat.decreaseByOne();
    }

    expect(function() {
      thermostat.decreaseByOne();
    }).toThrowError('Minimum temperature reached');
  });

  it('has a maximum temperature of 32C', function() {
    expect(thermostat.maxTemp).toEqual(32);
  });

  it('has a power saving mode which is on by default', function() {
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it('power saving mode can be turned off', function() {
    thermostat.turnOffPowerSavingMode();
    expect(thermostat.powerSavingMode).toBe(false);
  });

  it('power saving mode can be turned on', function() {
    thermostat.turnOnPowerSavingMode();
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it(
    'when power saving mode is turned on and the temperature is greater than the max temp permitted it is lowered',
    function() {
      thermostat.turnOffPowerSavingMode();
      for (var i = 20; i <= powerSavingModeMax + 3; i++) {
        thermostat.increaseByOne();
      }

      thermostat.turnOnPowerSavingMode();
      expect(thermostat.temp).toEqual(powerSavingModeMax);
    });

  it('if power saving mode is on, the maximum temperature is 25 degrees',
    function() {
      for (var i = 20; i <= powerSavingModeMax - 1; i++) {
        thermostat.increaseByOne();
      }

      expect(function() {
        thermostat.increaseByOne();
      }).toThrowError(
        'Power Saving Mode on, maximum temperature reached');
    });

  it('if power saving mode is off, the maximum temperature is 32 degrees',
    function() {
      thermostat.turnOffPowerSavingMode();
      for (var i = 20; i <= maxTemp - 1; i++) {
        thermostat.increaseByOne();
      }

      expect(function() {

        thermostat.increaseByOne();
      }).toThrowError(
        'Power Saving Mode off, maximum temperature reached');
    });

  it('resets to 20 when the reset button is pushed',
    function() {
      thermostat.resetButton();
      expect(thermostat.temp).toEqual(20);
    });

});
