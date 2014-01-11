'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args) {
  if (args[0].substr(-1*"-widget".length).toLowerCase() !== '-widget') {
    args[0] += '-widget';
  }

  this.args = args;
  ScriptBase.apply(this, arguments);

  this.hookFor('wix-angular:main', {
    args: [this.name],
    options: {options: {
      'override-app-name': this.cameledName,
      'skip-add': true
    }}
  });

  this.hookFor('wix-angular:controller', {
    args: [this.name],
    options: {options: {
      'override-app-name': this.cameledName,
      'skip-add': true
    }}
  });
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  this.angularModules = this.env.options.angularDeps;

  var vm = this.read('../../templates/common/widget.html', 'utf8').replace(/\$\{/g, '(;$};)');
  this.write(path.join('app', (this.env.options.dashboardApp ? 'widget' : this.name) + '.vm'),
             this.engine(vm, this).replace(/\(;\$\};\)/g, '${'));

  this.template('../../templates/common/main.haml', 'app/views/' + this.name + '.haml');
  this.copy('../../app/templates/styles/scss/main.scss', 'app/styles/' + this.name + '.scss');
};
