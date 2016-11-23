'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var fs = require('fs');
var path = require('path');

function buildRelativePath(fileName){
  return path.join('decorators', fileName + "Decorator");
}

var Generator = module.exports = function Generator(args, options) {
  ScriptBase.apply(this, arguments);
  this.fileName = this.name;

  if (typeof this.env.options.appPath === 'undefined') {
    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForOverwrite = function askForOverwrite() {
  var cb = this.async();

  // TODO: Any yeoman.util function to handle this?
  if (fs.existsSync(path.join(
    this.env.cwd, this.env.options.appPath,
    'scripts', buildRelativePath(this.fileName) + ".js"
  ))) {
    var prompts = [{
      type: 'confirm',
      name: 'overwriteDecorator',
      message: 'Would you like to overwrite existing decorator?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.overwriteDecorator = props.overwriteDecorator;

      cb();
    }.bind(this));
  }
  else{
    cb();
    return;
  }
};

Generator.prototype.askForNewName = function askForNewName() {
  var cb = this.async();

  if (this.overwriteDecorator === undefined || this.overwriteDecorator === true) {
    cb();
    return;
  }
  else {
    var prompts = [];
    prompts.push({
      name: 'decoratorName',
      message: 'Alternative name for the decorator'
    });

    this.prompt(prompts, function (props) {
      this.fileName = props.decoratorName;

      cb();
    }.bind(this));
  }
};

Generator.prototype.createDecoratorFiles = function createDecoratorFiles() {
  this.appTemplate(
    'decorator',
    path.join('scripts', buildRelativePath(this.fileName))
  );
  this.addScriptToIndex(buildRelativePath(this.fileName));
};
