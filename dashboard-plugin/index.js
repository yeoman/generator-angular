'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args) {
  this.args = args;
  ScriptBase.apply(this, arguments);

  if (this.env.options.dashboardPlugin) {
    this.hookFor('wix-angular:main', {
      args: [this.env.options.dashboardPlugin],
      options: {options: {
        'app-suffix': 'Plugin',
        'skip-add': true
      }}
    });

    this.hookFor('wix-angular:controller', {
      args: [this.env.options.dashboardPlugin],
      options: {options: {
        'app-suffix': 'Plugin',
        'skip-add': true
      }}
    });
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  if (this.env.options.dashboardPlugin) {
    this.angularModules = this.env.options.angularDeps;
    this.pluginName = this.env.options.dashboardPlugin;

    var pom = this.read('../../templates/common/plugin.html', 'utf8').replace(/\$\{/g, '(;$};)');
    this.write(path.join('app', 'plugin.vm'), this.engine(pom, this).replace(/\(;\$\};\)/g, '${'));

    //this.appTemplate('app', 'scripts/app');
    //this.template('common/view.haml', path.join(this.env.options.appPath, 'views', this.name + '.haml'));
  }
};
