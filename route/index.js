'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.hookFor('angular:controller');
  this.hookFor('angular:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;  

  this.uri = this.name;  
  if(this.options.uri){
    this.uri = this.options.uri;
  }
      
  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/app.' + (coffee ? 'coffee' : 'js')
    ),
    needle: '.otherwise',
    splicable: [
      "  templateUrl: 'views/" + this.name.toLowerCase() + ".html'" + (coffee ? "" : "," ),
      "  controller: '" + this.classedName + "Ctrl'"
    ]
  };

  if (coffee) {
    config.splicable.unshift(".when '/" + this.uri + "',");
  }
  else {
    config.splicable.unshift(".when('/" + this.uri + "', {");
    config.splicable.push("})");
  }

  angularUtils.rewriteFile(config);
};
