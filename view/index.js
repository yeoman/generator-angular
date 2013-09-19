'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');


module.exports = Generator;

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var data,
      appPath = this.env.options.appPath,
      fullPathJade = path.join(appPath, 'jade/index.jade');

  if (fs.existsSync(fullPathJade)) {
    data = createJadeViewFiles(this.name, this.env);
  }else {
    data = createHtmlViewFiles(this.name, this.env);
  }
  this.template(data.template, data.targetPath);
};

function createHtmlViewFiles(name, env) {
  var targetPath = path.join(env.options.appPath, 'views', name + '.html');
  return {
    targetPath: targetPath,
    template: 'common/view.html',
  }
};

function createJadeViewFiles(name, env) {
  var targetPath = path.join(env.options.appPath, 'views', name + '.jade');
  return {
    targetPath: targetPath,
    template: 'common/view.jade',
  }
};