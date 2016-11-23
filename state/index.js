'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.option('uri', {
    desc: 'Allow a custom uri for routing',
    type: String,
    required: false
  });

  var coffee = this.env.options.coffee;
  var typescript = this.env.options.typescript;
  var bower = require(path.join(process.cwd(), 'bower.json'));
  var match = require('fs').readFileSync(path.join(
    this.env.options.appPath,
    'scripts/app.' + (coffee ? 'coffee' : typescript ? 'ts': 'js')
  ), 'utf-8').match(/\.state/);

  if (
    bower.dependencies['ui.router'] ||
    bower.devDependencies['ui.router'] ||
    match !== null
  ) {
    this.foundState = true;
  }

  this.hookFor('angular:controller');
  this.hookFor('angular:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;

  if (!this.foundState) {
    this.on('end', function () {
      this.log(chalk.yellow(
        '\nangular-ui-router is not installed. Skipping adding the state to ' +
        'scripts/app.' + (coffee ? 'coffee' : 'js')
      ));
    });
    return;
  }

  this.uri = this.name;
  if (this.options.uri) {
    this.uri = this.options.uri;
  }

  var typescript = this.env.options.typescript;
  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/app.' + (coffee ? 'coffee' : typescript ? 'ts': 'js')
    ),
    needle: '.otherwise',
    splicable: [
      "  url: '/" + this.uri + "',",
      "  templateUrl: 'views/" + this.name.toLowerCase() + ".html'" + (coffee ? "" : "," ),
      "  controller: '" + this.classedName + "Ctrl'" + (coffee ? "" : ","),
      "  controllerAs: '" + this.cameledName + "'"
    ]
  };

  if (coffee) {
    config.splicable.unshift(".state '" + this.uri + "',");
  }
  else {
    config.splicable.unshift(".state('" + this.uri + "', {");
    config.splicable.push("})");
  }

  angularUtils.rewriteFile(config);
};
