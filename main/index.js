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
  this.dashboardApp = this.env.options.dashboardApp;
  this.dashboardPlugin = this.env.options.dashboardPlugin;
  if (this.name !== 'main') {
    this.appTemplate('app', 'scripts/' + this.name);
  } else if (this.env.options.dashboardApp || !this.env.options.dashboardPlugin) {
    this.appTemplate('app', 'scripts/app');
    if (!this.env.options.dashboardApp) {
      this.testTemplate('mock/client-config', '../mock/client-config');
    }
  }

  if (this.env.options.dashboardApp || this.env.options.dashboardPlugin) {
    this.testTemplate('mock/wix-dashboard', '../mock/wix-dashboard');
  }
};
