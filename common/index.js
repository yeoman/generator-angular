'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this._.extend(this, options.userChoices);
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.directory('root', '.', true);
  this.template('gitignore', '.gitignore');
};
