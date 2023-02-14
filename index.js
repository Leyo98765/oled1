'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

module.exports = oled;
function oled(context) {
	var self = this;

	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;

}
oled.prototype.onVolumioStart = function()
{
	
// importe la bibliothèque onoff
const Gpio = require('onoff').Gpio; 

// définit la broche GPIO 17 comme sortie
const led = new Gpio(17, 'out');
	
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

    return libQ.resolve();
}

oled.prototype.onStart = function() {
    var self = this;
	var defer=libQ.defer();
	led.writeSync(1);

	// Once the Plugin has successfull started resolve the promise
	defer.resolve();

    return defer.promise;
};

oled.prototype.onStop = function() {
    var self = this;
    var defer=libQ.defer();
	led.writeSync(0);

    // Once the Plugin has successfull stopped resolve the promise
    defer.resolve();

    return libQ.resolve();
};