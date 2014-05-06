'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  this.sourceRoot(path.join(__dirname, '../templates/common/root'));
  this.copy('.bowerrc', '.bowerrc');
  this.copy('.editorconfig', '.editorconfig');
  this.copy('.gitattributes', '.gitattributes');
  this.copy('.jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.directory('../test', 'test', true);
  this.copy('../app/.buildignore', 'app/.buildignore');
  this.copy('../app/.htaccess', 'app/.htaccess');
  this.copy('../app/404.html', 'app/404.html');
  this.copy('../app/favicon.ico', 'app/favicon.ico');
  this.copy('../app/robots.txt', 'app/robots.txt');
  this.copy('../app/views/main.html', 'app/views/main.html');
};
