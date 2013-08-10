'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');


module.exports = Generator;

function Generator(args, options) {
  ScriptBase.apply(this, arguments);
  this._.extend(this, options.userChoices);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }

  if (this.typescript || this.options.typescript) {
    var tsBaseName = this._.classify(this.name);
    this.typescriptAppName    = this.typescriptAppName || this.options.typescriptAppName;
    this.tsAngularName        = tsBaseName + "Ctrl";
    this.tsClassName          = tsBaseName + "Ctrl";
    this.tsScopeInterfaceName = tsBaseName + "CtrlScope";
  }
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  if (!(this.typescript || this.options.typescript)) {
    this.appTemplate('controller');
    this.testTemplate('spec/controller');
  }
  else {
    this.appTemplate('controller', {addScriptToIndex: false});
    this.testTemplate('spec/controller', {scriptSuffix: '.js'});
  }
};
