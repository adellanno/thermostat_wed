function Thermostat() {
  this.temp = 20;
  this.minTemp = 10;
  this.maxTemp = 32;
  this.powerSavingModeMax = 25;
  this.powerSavingMode = true;
  // var therm = new Thermostat();
}

Thermostat.prototype.increaseByOne = function() {

  if (this.powerSavingMode && this.temp === this.powerSavingModeMax) {
    throw new Error('Power Saving Mode on, maximum temperature reached');
  } else if (this.powerSavingMode === false && this.temp === this.maxTemp) {
    throw new Error('Power Saving Mode off, maximum temperature reached');

  } else {
    this.temp += 1;
  }
};

Thermostat.prototype.decreaseByOne = function() {
  if (this.temp <= this.minTemp) {
    throw new Error('Minimum temperature reached');
  } else {
    this.temp -= 1;
  }
};

Thermostat.prototype.turnOffPowerSavingMode = function() {
  this.powerSavingMode = false;
};

Thermostat.prototype.turnOnPowerSavingMode = function() {
  this.powerSavingMode = true;
  if (this.temp > this.powerSavingModeMax) {
    this.temp = this.powerSavingModeMax;
  }
};

Thermostat.prototype.resetButton = function() {
  this.temp = 20;
};

Thermostat.prototype.tempColour = function() {
  if (this.temp < 18) {
    return "green";
  } else if (this.temp >= 18 && this.temp < 25) {
    return "yellow"
  } else {
    return "red"
  }
};
