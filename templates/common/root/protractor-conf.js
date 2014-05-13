'use strict';

var config = require('./node_modules/wix-gruntfile/protractor-conf').config;

config.capabilities = {
  browserName: 'chrome'
};

module.exports.config = config;
