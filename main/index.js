'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator(args, options) {
  ScriptBase.apply(this, arguments);
  this._.extend(this, options.userChoices);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  if (this.typescript) return;

  this.appTemplate('app', 'scripts/app');
};

Generator.prototype.createTypescriptFiles = function createTypescriptFiles() {
  if (!this.typescript) return;

  var files = [
    { name: 'app.ts',        dir: 'app' },
    { name: 'references.ts', dir: 'app' },
  ];

  if (this.typescriptConfig) {
    files = files.concat([
      { name: 'config.ts',           dir: 'app' },
      { name: 'config.js',           dir: 'resource' },
      { name: 'config_overrides.js', dir: 'resource' },
    ]);
  }

  if (this.typescriptPartialsCache) {
    files.push(
      { name: 'templates.js', dir: 'resource' }
    );
  }

  this._.each(files, function(file) {
    this.template(file.name, path.join(this.env.options.appPath, file.dir, file.name));
  }, this);
};
