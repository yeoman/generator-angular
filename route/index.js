'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  var bower = require(path.join(process.cwd(), 'bower.json'));
  var match = require('fs').readFileSync(path.join(
    this.env.options.appPath,
    'scripts/routes.' + (this.env.options.coffee ? 'coffee' : 'js')
  ), 'utf-8').match(/\.when/);

  if (
    bower.dependencies['angular-route'] ||
    bower.devDependencies['angular-route'] ||
    match !== null
  ) {
    this.foundWhenForRoute = true;
  }

  this.hookFor('angular:controller');
  this.hookFor('angular:view');
};

util.inherits(Generator, ScriptBase);

//angularFire
Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;

  if (!this.foundWhenForRoute) {
    this.on('end', function () {
      this.log(chalk.yellow(
        '\nangular-route is not installed. Skipping adding the route to ' +
        'scripts/routes.' + (coffee ? 'coffee' : 'js')
      ));
    });
    return;
  }

  this.uri = this.name;
  if (this.options.uri) {
    this.uri = this.options.uri;
  }

  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/routes.' + (coffee ? 'coffee' : 'js')
    ),
    needle: '.otherwise',
    splicable: [
      "  templateUrl: 'views/" + this.name.toLowerCase() + ".html'" + (coffee ? "" : "," ),
      "  controller: '" + this.classedName + "Ctrl'"
    ]
  };

  var whenMethod = this.env.options.authRequired? 'whenAuthenticated' : 'when';

  if (coffee) {
    config.splicable.unshift("." + whenMethod + " '/" + this.uri + "',");
  }
  else {
    config.splicable.unshift("." + whenMethod + "('/" + this.uri + "', {");
    config.splicable.push("})");
  }

  angularUtils.rewriteFile(config);
};
