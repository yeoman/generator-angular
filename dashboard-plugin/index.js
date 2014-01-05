'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args) {
  if (args[0].substr(-1*"-plugin".length).toLowerCase() !== '-plugin') {
    args[0] += '-plugin';
  }

  this.args = args;
  ScriptBase.apply(this, arguments);

  this.hookFor('wix-angular:main', {
    args: [this.name],
    options: {options: {
      'app-suffix': 'Plugin',
      'skip-add': true
    }}
  });

  this.hookFor('wix-angular:controller', {
    args: [this.name],
    options: {options: {
      'app-suffix': 'Plugin',
      'skip-add': true
    }}
  });
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  this.angularModules = this.env.options.angularDeps;

  var vm = this.read('../../templates/common/plugin.html', 'utf8').replace(/\$\{/g, '(;$};)');
  this.write(path.join('app', (this.env.options.dashboardApp ? 'plugin' : this.name) + '.vm'),
             this.engine(vm, this).replace(/\(;\$\};\)/g, '${'));

  this.template('../../templates/common/main.haml', 'app/views/' + this.name + '.haml');
  this.copy('../../app/templates/styles/scss/main.scss', 'app/styles/' + this.name + '.scss');
};
