'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args) {
  this.args = args;
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  this.angularModules = this.env.options.angularDeps;
  this.appTemplate('app', 'scripts/app');

  this.testTemplate('mock/client-config', '../mock/client-config');
  if (this.args.indexOf('dashboardApp') !== -1) {
    this.testTemplate('mock/wix-dashboard', '../mock/wix-dashboard');
  }
};
