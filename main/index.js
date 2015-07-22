'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  this.angularModules = this.env.options.angularDeps;
  this.ngCookies = this.env.options.ngCookies;
  this.ngResource = this.env.options.ngResource;
  this.ngSanitize = this.env.options.ngSanitize;
  this.ngRoute = this.env.options.ngRoute;
  this.appTemplate('app', 'scripts/app');
};
